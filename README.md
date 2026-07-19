# Bryan Perez — professional portfolio

A recruiter-focused Astro portfolio presenting production AI workflows, full-stack platforms, applied ML research, and a small browser lab.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:4321` by default.

## Quality commands

```bash
npm run check
npm run build
```

`npm run build` performs Astro and TypeScript diagnostics before producing the static site in `dist/`.

## Architecture

```text
src/
├── components/
│   ├── layout/          shared header, footer, and ambient background
│   └── ProjectCard.astro
├── data/                typed profile, experience, and project content
├── layouts/             metadata and document shell
├── pages/               route composition and project case studies
└── styles/              design tokens and shared interaction primitives
```

Important boundaries:

- `src/data/` is the single source of truth for résumé-aligned facts and case-study copy.
- Layout components own navigation and site chrome; pages own route-specific composition.
- Project routes are generated from typed project data at `/projects/[slug]`.
- JavaScript enhances navigation, motion controls, and reveals; content remains visible when JavaScript is unavailable.
- Project media placeholders are intentionally explicit until sanitized evidence packages are captured.

## Project evidence capture

Use [PROJECT_MEDIA_CAPTURE_PROMPT.md](./PROJECT_MEDIA_CAPTURE_PROMPT.md) from inside each target project repository. It defines the Docker-safe workflow, filenames, redaction rules, manifest, and case-study fact contract.

The product and research rationale is documented in [docs/PORTFOLIO_STRATEGY.md](./docs/PORTFOLIO_STRATEGY.md).

## Contact

- [GitHub](https://github.com/BryanPMX)
- [LinkedIn](https://linkedin.com/in/brpmx)
- [Email](mailto:perez.bryan24@outlook.com)

