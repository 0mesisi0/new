import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from './node_modules/esbuild/lib/main.js';

const here = path => new URL(path, import.meta.url);
const args = process.argv.slice(2);
const selected = args.length === 0 ? 'daewon' : args[1];
assert.ok(args.length === 0 || (args.length === 2 && args[0] === '--area' && ['daewon', 'anmin'].includes(selected)),
  'Usage: node build-item.mjs --area daewon|anmin');
const anmin = selected === 'anmin';
const [template, area, license] = await Promise.all([
  readFile(here(anmin ? './anmin.html' : './item.html'), 'utf8'),
  readFile(here(anmin ? './data/anmin.json' : './data/area.json'), 'utf8'),
  readFile(here('./node_modules/three/LICENSE'), 'utf8'),
]);

const data = JSON.parse(area);
if (anmin) {
  assert.ok(data.terrain.columns === 48 && data.terrain.rows === 48
    && data.terrain.elevation.length === 48 ** 2 && data.terrain.elevation.every(Number.isFinite),
  'Anmin requires a valid 48 × 48 elevation grid');
}
const { outputFiles } = await build({
  entryPoints: [fileURLToPath(here(anmin ? './anmin.js' : './twin.js'))],
  bundle: true,
  minify: true,
  treeShaking: true,
  format: anmin ? 'iife' : 'esm',
  target: anmin ? ['safari13', 'chrome80'] : 'es2022',
  // The scene uses ordinary ES2015 destructuring, available in these browsers.
  supported: anmin ? { destructuring: true } : undefined,
  charset: 'utf8',
  legalComments: 'inline',
  define: { ITEM: 'true', ITEM_AREA: JSON.stringify(data) },
  write: false,
});

const marker = '<!-- TWIN_BUNDLE -->';
assert.ok(template.includes(marker), 'Missing twin bundle placeholder');
const script = outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = template.replace(marker, () => `<!--\n${license.trim()}\n-->\n  <script${anmin ? '' : ' type="module"'}>\n${script}  </script>`);
assert.doesNotMatch(html, /\bfetch\b|XMLHttpRequest|WebSocket|sendBeacon|EventSource/, 'The item must be self-contained');
const destination = here(`../play/items/twin-${selected}/`);
await mkdir(destination, { recursive: true });
await writeFile(new URL('index.html', destination), html);
