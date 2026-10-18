// Rebuild the published release archive from local, immutable source tags.
// Usage: node scripts/sync-release-notes.cjs D:/Projects/pu-erh_lab
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
if (!process.argv[2]) throw new Error('Usage: node scripts/sync-release-notes.cjs <source-repository>');
const source = path.resolve(process.argv[2]);
const root = path.resolve(__dirname, '..');
const tag = 'v0.3.3';
function git(...args) {
  return execFileSync('git', ['-C', source, ...args], {maxBuffer: 32 * 1024 * 1024});
}
function read(ref, file) { return git('show', `${ref}:${file}`).toString('utf8').replace(/\r\n/g, '\n'); }
function write(file, value) {
  const out = path.join(root, file);
  fs.mkdirSync(path.dirname(out), {recursive: true});
  fs.writeFileSync(out, value);
}
const versions = [...Array.from({length: 10}, (_, i) => `0.2.${i}`), ...Array.from({length: 4}, (_, i) => `0.3.${i}`)];
const guides = {
  '0.2.0': ['getting-started/installation', 'editing/raw-and-geometry', 'editing/tone-and-color'],
  '0.2.1': ['editing/raw-and-geometry'],
  '0.2.2': ['editing/raw-and-geometry', 'editing/lut-library', 'export/workflow'],
  '0.2.3': ['getting-started/interface-overview', 'editing/tone-and-color'],
  '0.2.4': ['library/import-and-organize', 'ai/search', 'settings/preferences'],
  '0.2.5': ['editing/tone-and-color', 'getting-started/edit-history-and-versions', 'export/workflow'],
  '0.2.6': ['ai/model-management', 'ai/label-generation', 'editing/display-and-effects'],
  '0.2.7': ['ai/provider-configuration', 'ai/search', 'settings/preferences'],
  '0.2.8': ['getting-started/interface-overview', 'getting-started/edit-history-and-versions', 'library/import-and-organize'],
  '0.2.9': ['export/workflow', 'settings/preferences'],
  '0.3.0': ['editing/nodes-and-masks', 'editing/raw-and-geometry', 'releases/upgrade-guide'],
  '0.3.1': ['editing/lut-library', 'editing/comparison', 'library/import-and-organize'],
  '0.3.2': ['editing/raw-and-geometry', 'editing/lut-library', 'library/import-and-organize'],
  '0.3.3': ['export/workflow', 'automation/cli', 'releases/upgrade-guide'],
};
const changelog = read('v0.2.8', 'CHANGELOG.md');
const languageSplit = changelog.indexOf('# 更新日志');
if (languageSplit < 0) throw new Error('The historical bilingual changelog is missing.');
for (const lang of ['zh', 'en']) {
  const base = lang === 'zh' ? 'docs' : 'i18n/en/docusaurus-plugin-content-docs/current';
  const old = lang === 'zh' ? changelog.slice(languageSplit) : changelog.slice(0, languageSplit);
  for (const [index, version] of versions.entries()) {
    let body, sourceFile, sourceRef;
    if (index < 9) {
      sourceFile = 'CHANGELOG.md'; sourceRef = 'v0.2.8';
      const heading = `## [${version}]`;
      const start = old.indexOf(heading);
      if (start < 0) throw new Error(`Missing ${lang} release ${version}`);
      const next = old.indexOf('\n## [', start + heading.length);
      body = old.slice(start, next < 0 ? undefined : next).trim();
      body = body.replace(/^## .*\n/, '').replace(/^### /gm, '### ');
    } else {
      sourceRef = tag;
      sourceFile = `docs/changelog/${version}.${lang === 'zh' ? 'zh-CN' : 'en'}.txt`;
      body = read(sourceRef, sourceFile).trim().split('\n').slice(1).join('\n').trim();
      body = body.replace(/^([^\n]+)\n-{3,}\s*$/gm, '### $1');
      if (version === '0.2.9') {
        for (const build of ['2014', '2015']) {
          const extra = read(tag, `docs/changelog/${build}.${lang === 'zh' ? 'zh-CN' : 'en'}.txt`)
            .trim().replace(/^([^\n]+)\n-{3,}\s*$/gm, '### $1');
          body += `\n\n### ${lang === 'zh' ? '补充构建记录' : 'Additional build notes'}: ${build}\n\n${extra}\n`;
        }
      }
    }
    body = body.trimEnd();
    const url = `https://github.com/zidage/AlcedoStudio/blob/${sourceRef}/${sourceFile}`;
    const links = guides[version].map(id => `- [${id}](../${id}.md)`).join('\n');
    const intro = lang === 'zh'
      ? `本页保留主仓库的完整版本说明，包括功能、改进、性能与修复。[原始记录](${url})。历史说明中的旧入口或限制仅适用于当时版本；当前操作以 v0.3.3 教程为准。`
      : `This page retains the complete upstream release notes, including features, improvements, performance changes and fixes. [Original record](${url}). Historical controls and restrictions describe that release; follow the v0.3.3 tutorials for current operation.`;
    write(`${base}/releases/v${version}.md`, `---\nsidebar_position: ${index + 1}\ntitle: v${version}\n---\n\n# v${version}\n\n${intro}\n\n## ${lang === 'zh' ? '对应教程' : 'Related tutorials'}\n\n${links}\n\n## ${lang === 'zh' ? '完整更新说明' : 'Complete release notes'}\n\n${body}\n`);
  }
}
// Inventory only the QML files actually packaged in the production module.
const qmlRoot = 'alcedo_studio/src/ui/alcedo_main/qml/';
const cmakeFile = 'alcedo_studio/src/ui/alcedo_main/CMakeLists.txt';
const cmake = read(tag, cmakeFile);
const names = [...new Set([...cmake.matchAll(/\/qml\/([^"\n]+\.qml)"/g)].map(m => m[1]))].sort();
const qml = Object.fromEntries(names.map(name => [name, read(tag, qmlRoot + name)]));
const edges = Object.fromEntries(names.map(name => [name, names.filter(other => {
  const type = path.basename(other, '.qml');
  return new RegExp(`\\b${type}\\s*\\{`).test(qml[name]);
})]));
const reached = new Set();
function visit(name) { if (reached.has(name)) return; reached.add(name); for (const next of edges[name] || []) visit(next); }
visit('Main.qml');
const audit = {sourceTag: tag, sourceCommit: git('rev-parse', `${tag}^{commit}`).toString().trim(), entry: 'alcedo_studio/src/ui/alcedo_main/main.cpp', module: 'Alcedo.Main', cmakeFile, packagedQmlCount: names.length, lexicalReachableFromMain: [...reached].sort(), files: names.map(name => ({path: qmlRoot + name, children: edges[name]}))};
write('static/reference/v0.3.3-qml-inventory.json', JSON.stringify(audit, null, 2) + '\n');
console.log(`Generated ${versions.length * 2} release pages and ${names.length} packaged QML records.`);
