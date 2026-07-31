# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Default locale is **简体中文** (`zh-Hans`). English (`en`) is available for selected pages (edit history / Mini-Git first).

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
