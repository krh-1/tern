#!/usr/bin/env node
/**
 * Generate Tern illustrations via the Gemini API (Imagen) and save to public/illustrations/.
 * Requires GEMINI_API_KEY. Run from repo root:
 *   node scripts/illustrations/generate.js
 *   npm run generate:illustrations
 *
 * Options:
 *   --dry-run     Log prompts and paths only; do not call API or write files.
 *   --core-only   Generate only core set (skip depth).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '../..');
const MANIFEST_PATH = path.join(__dirname, 'manifest.json');
const OUT_DIR = path.join(REPO_ROOT, 'public', 'illustrations');
const DEPTH_DIR = path.join(OUT_DIR, 'depth');

const API_HOST = 'generativelanguage.googleapis.com';

/** Load .env from repo root so GEMINI_API_KEY can be set there for build/agent use. */
function loadEnv() {
  const envPath = path.join(REPO_ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  raw.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) return;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key) process.env[key] = val;
  });
}

function loadManifest() {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  return JSON.parse(raw);
}

function buildPrompt(entry, stylePrefix, styleSuffix) {
  return stylePrefix + entry.scene + styleSuffix;
}

async function generateImage(apiKey, prompt, model, imageSize) {
  const apiPath = `/v1beta/models/${model}:predict?key=${apiKey}`;
  const body = JSON.stringify({
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: imageSize || '9:16',
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: API_HOST,
        path: apiPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              reject(new Error(json.error.message || `API error ${json.error.code}`));
              return;
            }
            const prediction = json.predictions && json.predictions[0];
            if (!prediction || !prediction.bytesBase64Encoded) {
              reject(new Error('No image data in response'));
              return;
            }
            resolve(Buffer.from(prediction.bytesBase64Encoded, 'base64'));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/** Treat auth/quota errors as skip conditions: exit 0 so build does not fail. */
function isSkipCondition(err) {
  const msg = (err && err.message || '').toLowerCase();
  return /insufficient|quota|invalid.*key|unauthorized|forbidden|api_key_invalid|permission/i.test(msg)
    || msg.includes('401') || msg.includes('403') || msg.includes('429');
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const coreOnly = args.includes('--core-only');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!dryRun && !apiKey) {
    console.log('GEMINI_API_KEY not set; skipping illustration generation.');
    process.exit(0);
  }

  const manifest = loadManifest();
  const { stylePrefix, styleSuffix, model, imageSize, core, depth } = manifest;
  const entries = coreOnly ? core : [...core, ...(depth || [])];
  if (!dryRun && !fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Manifest: ${entries.length} illustration(s). Dry-run: ${dryRun}`);

  for (const entry of entries) {
    const prompt = buildPrompt(entry, stylePrefix, styleSuffix);
    const isDepth = entry.file.startsWith('depth/');
    const outPath = isDepth
      ? path.join(DEPTH_DIR, path.basename(entry.file))
      : path.join(OUT_DIR, entry.file);

    if (dryRun) {
      console.log(`[dry-run] ${entry.id} -> ${outPath}`);
      console.log(`  prompt: ${prompt.slice(0, 80)}...`);
      continue;
    }

    try {
      const imageBuffer = await generateImage(apiKey, prompt, model, imageSize);
      const dir = path.dirname(outPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(outPath, imageBuffer);
      console.log(`OK ${entry.id} -> ${outPath}`);
    } catch (err) {
      if (isSkipCondition(err)) {
        console.log('Gemini API: quota exceeded or invalid key; skipping illustration generation.');
        process.exit(0);
      }
      console.error(`FAIL ${entry.id}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

main();
