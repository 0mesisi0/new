import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from './node_modules/esbuild/lib/main.js';

const here = path => new URL(path, import.meta.url);
const [template, area, license] = await Promise.all([
  readFile(here('./item.html'), 'utf8'),
  readFile(here('./data/area.json'), 'utf8'),
  readFile(here('./node_modules/three/LICENSE'), 'utf8'),
]);

const { outputFiles } = await build({
  entryPoints: [fileURLToPath(here('./twin.js'))],
  bundle: true,
  minify: true,
  treeShaking: true,
  format: 'esm',
  target: 'es2022',
  charset: 'utf8',
  legalComments: 'inline',
  define: { ITEM: 'true', ITEM_AREA: JSON.stringify(JSON.parse(area)) },
  write: false,
});

const marker = '<!-- TWIN_BUNDLE -->';
assert.ok(template.includes(marker), 'Missing twin bundle placeholder');
const script = outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = template.replace(marker, () => `<!--\n${license.trim()}\n-->\n  <script type="module">\n${script}  </script>`);
assert.doesNotMatch(html, /\bfetch\b|XMLHttpRequest|WebSocket|sendBeacon|EventSource/, 'The item must be self-contained');
const destination = here('../play/items/twin-daewon/');
await mkdir(destination, { recursive: true });
await writeFile(new URL('index.html', destination), html);
