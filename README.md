# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Default locale is **简体中文** (`zh-Hans`). The v0.3.3 tutorials and complete v0.2.0–v0.3.3 release archive are available in Chinese and English (`en`).

Tutorials follow the production QML entry points at source tag v0.3.3. Real Windows Release screenshots are shared between locales; their UI is Chinese. See `docs/developer/tutorial-source-map.md` for source/runtime boundaries and regeneration commands. Raw screenshots and the independent demonstration project remain in ignored `.work/`; published crops live in `static/img/tutorial-v0.3.3/`.

## Installation

```bash
npm install
```

## Local Development

`docusaurus start` only serves **one** locale at a time. Visiting `/en/` while the Chinese dev server is running returns 404.

```bash
# Chinese (default) — http://localhost:3000/AlcedoStudio_docs/
npm start

# English — http://localhost:3000/AlcedoStudio_docs/en/
npm run start:en
```

To preview **both** locales together (as on GitHub Pages):

```bash
npm run build
npm run serve
```

Then open:

- Chinese: `http://localhost:3000/AlcedoStudio_docs/`
- English: `http://localhost:3000/AlcedoStudio_docs/en/`

## Build

```bash
npm run build
```

This command generates static content into the `build` directory (including `build/en/` for English).

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
