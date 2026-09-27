# Illustration Generation — Tern

> **[ON HOLD — 2026-09]** Ken chose code-drawn, ink-on-paper scenes (`docs/DESIGN.md` §0). Nothing in Tern currently uses generated images. This pipeline is kept in case raster art ever returns; don't extend it or add manifest entries without Ken's ruling.

Tern can generate all required illustrations **via the Gemini API (Imagen)** as part of an agentic or build-time workflow. No manual art pipeline is required for V1.

---

## Overview

- **Source of truth:** `scripts/illustrations/manifest.json` — lists every illustration (core + depth) with a **scene** description. Prompts are built from DESIGN.md style prefix/suffix + scene.
- **Script:** `scripts/illustrations/generate.js` — reads the manifest, calls the Gemini Imagen API, decodes the base64 response, and writes images to `public/illustrations/` (and `public/illustrations/depth/` for depth nodes).
- **API:** [Gemini API](https://ai.google.dev/gemini-api/docs) — text-to-image via Imagen model, aspect ratio `9:16`, model configurable in manifest (default `imagen-3.0-generate-002`). Auth: API key as query parameter.

---

## Fully agentic workflow

1. **Agent (or human) adds or edits questions** in `src/data/questions.js` or `docs/QUESTIONS.md`.
2. **Agent updates the manifest** — for each new or changed illustration, add or edit an entry in `scripts/illustrations/manifest.json` with `id`, `file`, and `scene`. Keep `stylePrefix` / `styleSuffix` aligned with `docs/DESIGN.md` §6 (editorial, ink sketch, sepia, no color).
3. **Run generation:** `npm run generate:illustrations` calls the Gemini API for each manifest entry and writes images to `public/illustrations/`. The script loads `GEMINI_API_KEY` from the environment or from a `.env` file in the repo root. If the key is **not set**, the script skips generation and exits 0.
4. **Agent can** run `npm run generate:illustrations -- --dry-run` to verify prompts and paths without calling the API.

---

## Running the generator

**Requirements:** Node (no extra deps). Set `GEMINI_API_KEY` in the environment or in a `.env` file at repo root (the script loads `.env` automatically; `.env` is gitignored). If the key is missing, or the API returns a quota/auth error, the script skips generation and exits 0 so the build does not fail.

```bash
# From repo root — option 1: env file
echo 'GEMINI_API_KEY=your_key' >> .env
node scripts/illustrations/generate.js

# Option 2: inline
GEMINI_API_KEY=your_key node scripts/illustrations/generate.js
```

**Flags:**

- `--dry-run` — Print each prompt and output path; no API calls, no file writes.
- `--core-only` — Generate only core set (skip depth entries).

---

## Manifest format

- **stylePrefix / styleSuffix** — Prepended and appended to every scene to match DESIGN.md. Do not change unless the design system changes.
- **model / imageSize** — Gemini Imagen model and aspect ratio. `9:16` matches portrait full-bleed.
- **core** — Array of `{ id, file, scene }`. `file` is the filename under `public/illustrations/` (e.g. `Q1.jpg`, `Q1-followup-a.jpg`).
- **depth** — Same shape; `file` uses `depth/D1.jpg` etc. Populate when depth nodes are added to `src/data/depthGraph.js`.

When adding a new question or follow-up, add the corresponding entry to `core` or `depth` so the generator produces the file the app expects.

---

## Cost and idempotency

- Gemini API usage is subject to quota and billing; cost depends on model. Core + depth ≈ 34 images.
- The script does not skip existing files; it overwrites. To avoid re-spending, run once (or when manifest changes) and commit `public/illustrations/`, or add a "skip if file exists" flag to the script if you prefer.

---

## What the agent can do

- **Maintain the manifest** — Add/update entries when questions or depth nodes change; keep scene descriptions aligned with `docs/QUESTIONS.md` illustration lines.
- **Run `generate.js --dry-run`** — Validate prompts and paths.
- **Extend the script** — e.g. skip-if-exists, depth-only, or reading scene from `depthGraph.js` when available.

The script skips and exits 0 when the API key is missing or when the API indicates quota/auth errors, so the build never fails for those cases.
