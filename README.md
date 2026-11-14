# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Default locale is **简体中文** (`zh-Hans`). The v0.3.3 tutorials and complete v0.2.0–v0.3.3 release archive are available in Chinese and English (`en`).

The tutorials began from the production QML entry points at source tag v0.3.3. The Film Simulation guide follows v0.3.5. The input, color wheels, LUTs, scopes, adjustment transfer, mask groups, and library sections were checked against local application commit `2c3bf87b0`. Tutorials use responsive HTML/CSS interface schematics instead of screenshots, with labels that follow the documentation locale. See `docs/developer/tutorial-source-map.md` for the corresponding application components and implementation references.

## Interface schematics

`src/components/InterfaceMock/` contains the shared React component, bilingual labels, and CSS. Import it in a tutorial with `import InterfaceMock from '@site/src/components/InterfaceMock';`, then insert a named example such as `<InterfaceMock kind="tone" />`. Select a kind that shows the controls discussed in that section. Most schematics are static teaching examples. Source-based layouts and interactive Mask Groups, Adjustment Transfer, and Album Inspector examples live in `src/components/SourceMocks/`. Mask Groups calculates exposure and coverage mixing only; it does not render a photograph. Verified application files and the local source revision are recorded in the bilingual tutorial source map.

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
npm run preview
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
