import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories } from '../src/site.mjs';

const ITEMS = join(dirname(fileURLToPath(import.meta.url)), '..', 'items');
const dirs = existsSync(ITEMS) ? readdirSync(ITEMS).filter((d) => statSync(join(ITEMS, d)).isDirectory()) : [];
const CATS = new Set(categories.map((c) => c.id));
const MEDIA_EXT = /\.(png|jpe?g|webp|gif|svg|mp4|webm)$/i;
const RESERVED = new Set(['c', 'items', 'assets', 'about', 'privacy', 'ko', 'en']);

for (const d of dirs) {
  test(`item ${d}`, () => {
    const metaFile = join(ITEMS, d, 'meta.json');
    const htmlFile = join(ITEMS, d, 'index.html');
    assert.ok(existsSync(metaFile), 'meta.json missing');
    assert.ok(existsSync(htmlFile), 'index.html missing');
    const m = JSON.parse(readFileSync(metaFile, 'utf8'));
    assert.equal(m.slug, d, 'slug must equal folder name');
    assert.match(m.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug format');
    assert.ok(!RESERVED.has(m.slug), 'reserved slug');
    assert.match(m.date, /^\d{4}-\d{2}-\d{2}$/, 'date format');
    assert.ok(CATS.has(m.category), `unknown category ${m.category}`);
    assert.ok(['game', 'tool'].includes(m.kind), 'kind');
    assert.match(m.aspect, /^\d+\/\d+$/, 'aspect like 9/16');
    for (const lang of ['ko', 'en']) {
      const t = m[lang];
      assert.ok(t, `${lang} missing`);
      for (const k of ['title', 'desc', 'howto']) assert.ok(typeof t[k] === 'string' && t[k].trim(), `${lang}.${k} missing`);
      assert.ok(t.title.length <= 40, `${lang}.title too long`);
      assert.ok(t.desc.length >= 20 && t.desc.length <= 180, `${lang}.desc length ${t.desc.length}`);
    }
    const html = readFileSync(htmlFile, 'utf8');
    // Media files live flat next to index.html (the build copies top-level files only). There is no size limit.
    const dir = join(ITEMS, d);
    for (const f of readdirSync(dir)) {
      assert.ok(statSync(join(dir, f)).isFile(), `${f}: subfolders are not copied by the build`);
      if (['index.html', 'meta.json', 'thumb.png', 'cover.png'].includes(f)) continue; // site assets, not item art
      assert.match(f, MEDIA_EXT, `${f}: allowed media types are png, jpg, webp, gif, svg, mp4, webm`);
      if (m.kind === 'game') assert.match(f, /\.svg$/i, `${f}: games draw with SVG, canvas or CSS; raster images and video are for tools`);
    }
    if (m.kind === 'game') assert.doesNotMatch(html, /data:(image\/(png|jpe?g|webp|gif)|video\/)/i, 'games may not inline raster images or video');
    // Every relative asset reference must be ./file in this folder and must exist.
    for (const m of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']|(?<![\w$.])url\(\s*["']?([^"')]+?)["']?\s*\)/gi)) {
      const ref = m[1] || m[2];
      if (/^(data:|blob:|#)/i.test(ref)) continue;
      assert.match(ref, /^\.\/[A-Za-z0-9._-]+$/, `asset reference "${ref}" must be ./file in the item folder`);
      assert.ok(existsSync(join(dir, ref)), `referenced file ${ref} is missing`);
    }
    assert.match(html, /<head>/i, 'needs a plain <head> tag');
    assert.match(html, /<meta[^>]+viewport/i, 'viewport meta');
    assert.doesNotMatch(html, /\b(src|href)\s*=\s*["']?(https?:)?\/\//i, 'no external src/href');
    assert.doesNotMatch(html, /@import|url\(\s*["']?(https?:)?\/\//i, 'no external CSS');
    assert.doesNotMatch(html, /\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|EventSource/, 'no network calls');
    assert.doesNotMatch(html, /\b(alert|confirm|prompt)\s*\(|window\.open\s*\(/, 'no dialogs or popups');
    assert.match(html, /lang/, 'must read the lang parameter');
  });
}
