# Illustration generation

Generates Tern illustrations via the [Gemini API](https://ai.google.dev/gemini-api/docs) (Imagen) and writes them to `public/illustrations/`.

- **manifest.json** — Scene list and style; single source of truth for prompts.
- **generate.js** — Calls Gemini Imagen API, decodes base64 response, saves by filename.

Usage and build integration: `docs/ILLUSTRATION-GENERATION.md`.
