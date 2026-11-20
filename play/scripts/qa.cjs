// Headless play-test of every item. Usage: node scripts/qa.cjs [--thumbs] [--only slug]
// Requires the built site in dist/ (npm run qa builds it first).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const args = process.argv.slice(2);
const THUMBS = args.includes('--thumbs');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(DIST, p);
  if (!f.startsWith(DIST) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});

const items = fs.readdirSync(path.join(ROOT, 'items'))
  .filter((d) => fs.existsSync(path.join(ROOT, 'items', d, 'meta.json')))
  .map((d) => JSON.parse(fs.readFileSync(path.join(ROOT, 'items', d, 'meta.json'), 'utf8')))
  .filter((m) => !only || m.slug === only);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

server.listen(0, async () => {
  const origin = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch();
  const problems = [];
  const warnings = [];

  async function open(viewport, url, label, { touch = false } = {}) {
    const ctx = await browser.newContext({ viewport, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(`${label} uncaught: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error' && !(m.location().url || '').includes('/api/')) errs.push(`${label} console: ${m.text()}`); }); // the vote API only exists on Cloudflare
    page.on('request', (r) => { if (!r.url().startsWith(origin) && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) errs.push(`${label} external request: ${r.url()}`); });
    page.on('dialog', (d) => { errs.push(`${label} dialog: ${d.message()}`); d.dismiss().catch(() => {}); });
    await page.goto(origin + url, { waitUntil: 'load' });
    return { ctx, page, errs };
  }

  async function poke(page, w, h, touch) {
    const spots = [[0.5, 0.5], [0.5, 0.75], [0.3, 0.6], [0.7, 0.6], [0.5, 0.9], [0.5, 0.3], [0.2, 0.2], [0.8, 0.8]];
    for (let round = 0; round < 3; round++) {
      for (const [x, y] of spots) {
        if (touch) await page.touchscreen.tap(w * x, h * y).catch(() => {});
        else await page.mouse.click(w * x, h * y).catch(() => {});
        await sleep(60);
      }
      for (const k of ['Space', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) { await page.keyboard.press(k).catch(() => {}); await sleep(40); }
      await page.mouse.move(w * 0.2, h * 0.5); await page.mouse.move(w * 0.8, h * 0.5, { steps: 8 });
      await sleep(500);
    }
  }

  for (const m of items) {
    const [aw, ah] = m.aspect.split('/').map(Number);
    const ar = aw / ah;
    // 1. Raw item, phone and desktop, both languages.
    for (const [vp, touch] of [[{ width: 360, height: 640 }, true], [{ width: 1024, height: 700 }, false]]) {
      for (const lang of ['ko', 'en']) {
        const label = `${m.slug} [${lang} ${vp.width}x${vp.height}]`;
        const { ctx, page, errs } = await open(vp, `/items/${m.slug}/?lang=${lang}`, label, { touch });
        await sleep(400);
        const info = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          sw: document.scrollingElement.scrollWidth, sh: document.scrollingElement.scrollHeight,
          w: innerWidth, h: innerHeight, text: document.body.innerText,
        }));
        if (!info.lang.startsWith(lang)) errs.push(`${label} <html lang> is "${info.lang}"`);
        if (info.sw > info.w + 1 || info.sh > info.h + 1) errs.push(`${label} page scrolls (${info.sw}x${info.sh} in ${info.w}x${info.h})`);
        if (lang === 'en' && /[가-힣]/.test(info.text)) warnings.push(`${label} Korean text visible in English mode`);
        if (lang === 'ko' && info.text.trim() && !/[가-힣]/.test(info.text)) warnings.push(`${label} no Korean text in Korean mode`);
        await poke(page, vp.width, vp.height, touch);
        await page.evaluate(() => window.dispatchEvent(new Event('resize')));
        await page.setViewportSize({ width: vp.height > vp.width ? 400 : 800, height: vp.height > vp.width ? 700 : 600 });
        await sleep(300);
        await poke(page, vp.height > vp.width ? 400 : 800, vp.height > vp.width ? 700 : 600, touch);
        problems.push(...errs);
        await ctx.close();
      }
    }
    // 2. Wrapper page on a phone: loads, no overflow.
    for (const lang of ['ko', 'en']) {
      const label = `${m.slug} page [${lang}]`;
      const { ctx, page, errs } = await open({ width: 390, height: 844 }, `/${lang}/${m.slug}/`, label, { touch: true });
      await sleep(500);
      const over = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      if (over) errs.push(`${label} horizontal overflow`);
      problems.push(...errs);
      await ctx.close();
    }
    // 3. Thumbnail.
    const thumbFile = path.join(ROOT, 'items', m.slug, 'thumb.png');
    if (THUMBS || !fs.existsSync(thumbFile)) {
      const w = 480;
      const h = Math.round(Math.min(860, Math.max(360, w / ar)));
      const { ctx, page } = await open({ width: w, height: h }, `/items/${m.slug}/?lang=ko&thumb=1`, `${m.slug} thumb`);
      await sleep(700);
      if (m.kind === 'game') { await page.mouse.click(w / 2, h * 0.6).catch(() => {}); await sleep(1300); }
      await page.screenshot({ path: thumbFile });
      await ctx.close();
      console.log(`thumb: items/${m.slug}/thumb.png (${w}x${h})`);
    }
    console.log(`checked ${m.slug}`);
  }
  await browser.close();
  server.close();
  for (const w of [...new Set(warnings)]) console.log('WARN', w);
  const uniq = [...new Set(problems)];
  if (uniq.length) { for (const p of uniq) console.log('FAIL', p); process.exit(1); }
  console.log(`QA passed for ${items.length} item(s).`);
});
