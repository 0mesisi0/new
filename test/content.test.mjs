import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/content.mjs';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'guides');
const files = readdirSync(DIR).filter((f) => f.endsWith('.json'));
const PLACEHOLDERS = new Set(pages.map((p) => p.id));
const ALLOWED_TAGS = new Set(['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'br']);

test('guide files are valid', () => {
  const slugs = new Set(pages.map((p) => p.slug).concat('guides'));
  const ids = new Set(pages.map((p) => p.id));
  for (const f of files) {
    const g = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
    const where = `${f}:`;
    assert.match(g.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${where} slug`);
    assert.match(g.date, /^\d{4}-\d{2}-\d{2}$/, `${where} date`);
    assert.ok(f.startsWith(g.date), `${where} file name should start with the date`);
    assert.ok(!slugs.has(g.slug), `${where} duplicate slug ${g.slug}`);
    assert.ok(!ids.has(g.id), `${where} duplicate id ${g.id}`);
    slugs.add(g.slug);
    ids.add(g.id);
    assert.ok(Array.isArray(g.sources) && g.sources.length > 0, `${where} needs sources`);
    for (const [label, url] of g.sources) {
      assert.ok(label, `${where} source label`);
      assert.match(url, /^https:\/\//, `${where} source url`);
    }
    for (const lang of ['ko', 'en']) {
      const t = g[lang];
      for (const k of ['nav', 'title', 'desc', 'h1', 'lead', 'body']) assert.ok(t?.[k], `${where} ${lang}.${k} missing`);
      assert.ok(t.title.length <= 90, `${where} ${lang}.title too long`);
      assert.ok(t.desc.length >= 50 && t.desc.length <= 200, `${where} ${lang}.desc length ${t.desc.length}`);
      for (const [, tag] of t.body.matchAll(/<\/?([a-z0-9]+)/gi)) assert.ok(ALLOWED_TAGS.has(tag.toLowerCase()), `${where} ${lang} tag <${tag}>`);
      assert.doesNotMatch(t.body, /\son\w+=|javascript:/i, `${where} ${lang} unsafe attribute`);
      for (const [, id] of t.body.matchAll(/\{\{(\w+)\}\}/g)) assert.ok(PLACEHOLDERS.has(id) || id === 'minNet2027', `${where} unknown placeholder {{${id}}}`);
      for (const [q, a] of t.faq || []) assert.ok(q && a, `${where} ${lang} faq`);
    }
  }
});
