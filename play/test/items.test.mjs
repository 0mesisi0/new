import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories } from '../src/site.mjs';

const ITEMS = join(dirname(fileURLToPath(import.meta.url)), '..', 'items');
const dirs = existsSync(ITEMS) ? readdirSync(ITEMS).filter((d) => statSync(join(ITEMS, d)).isDirectory()) : [];
const CATS = new Set(categories.map((c) => c.id));
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
    assert.ok(Buffer.byteLength(html) <= 150 * 1024, 'index.html over 150 KB');
    assert.match(html, /<head>/i, 'needs a plain <head> tag');
    assert.match(html, /<meta[^>]+viewport/i, 'viewport meta');
    assert.doesNotMatch(html, /\b(src|href)\s*=\s*["']?(https?:)?\/\//i, 'no external src/href');
    assert.doesNotMatch(html, /@import|url\(\s*["']?(https?:)?\/\//i, 'no external CSS');
    assert.doesNotMatch(html, /\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|EventSource/, 'no network calls');
    assert.doesNotMatch(html, /\b(alert|confirm|prompt)\s*\(|window\.open\s*\(/, 'no dialogs or popups');
    assert.match(html, /lang/, 'must read the lang parameter');
  });
}
