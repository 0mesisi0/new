// Static site generator. Usage: node build.mjs
// Env: SITE_URL (default https://play.mesisi.net), ADSENSE_CLIENT (ca-pub-...)
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, copyFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, categories, ui, pages } from './src/site.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');
const ITEMS = join(ROOT, 'items');
const SITE_URL = (process.env.SITE_URL || 'https://play.mesisi.net').replace(/\/+$/, '');
const BASE = new URL(SITE_URL).pathname.replace(/\/+$/, '');
const ADS = /^ca-pub-\d{10,20}$/.test(process.env.ADSENSE_CLIENT || '') ? process.env.ADSENSE_CLIENT : '';
const LANGS = ['ko', 'en'];
let activeCats = categories; // categories with at least one item, set at build time

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const path = (lang, slug = '') => `${BASE}/${lang}/${slug ? slug + '/' : ''}`;
const abs = (p) => new URL(SITE_URL).origin + p;
const catPath = (lang, id) => path(lang, `c/${id}`);
const itemSrc = (it, lang) => `${BASE}/items/${it.slug}/?lang=${lang}`;
// A hand-made cover (owner-generated in ChatGPT/Gemini, see docs/PLATFORM.md) wins over the QA screenshot.
const thumb = (it) => (it.hasCover ? `${BASE}/items/${it.slug}/cover.png` : it.hasThumb ? `${BASE}/items/${it.slug}/thumb.png` : '');
const ratio = (a) => { const [w, h] = String(a).split('/').map(Number); return w > 0 && h > 0 ? w / h : 1; };

export function loadItems() {
  if (!existsSync(ITEMS)) return [];
  return readdirSync(ITEMS)
    .filter((d) => existsSync(join(ITEMS, d, 'meta.json')))
    .map((d) => ({ ...JSON.parse(readFileSync(join(ITEMS, d, 'meta.json'), 'utf8')), hasThumb: existsSync(join(ITEMS, d, 'thumb.png')), hasCover: existsSync(join(ITEMS, d, 'cover.png')) }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const adSlot = () => (ADS ? `<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${ADS}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>` : '');

function layout({ lang, slug, title, desc, content, schema = [], image = '', script = false }) {
  const u = ui[lang];
  const other = lang === 'ko' ? 'en' : 'ko';
  const self = path(lang, slug);
  const cats = activeCats.map((c) => `<a href="${catPath(lang, c.id)}"${slug === `c/${c.id}` ? ' aria-current="page"' : ''}>${esc(c[lang])}</a>`).join('');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(self)}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(path(l, slug))}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${abs(path('en', slug))}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(self)}">
<meta property="og:site_name" content="${esc(site.name[lang])}">
<meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}">
${image ? `<meta property="og:image" content="${abs(image)}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#ffcf33">
<link rel="icon" href="${BASE}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
${schema.map((s) => `<script type="application/ld+json">${json(s)}</script>`).join('\n')}
${ADS ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS}" crossorigin="anonymous"></script>` : ''}
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="${path(lang)}"><span class="logo" aria-hidden="true">한판</span>${esc(site.name[lang])}</a>
<a class="lang" href="${path(other, slug)}" hreflang="${other}" lang="${other}">${esc(u.other)}</a>
</div>
<nav class="cats" aria-label="${esc(u.categories)}"><div class="wrap">${cats}</div></nav>
</header>
<main class="wrap">
${content}
</main>
<footer class="site"><div class="wrap">
<p><a href="${path(lang)}">${esc(u.home)}</a><a href="${path(lang, 'about')}">${esc(u.about)}</a><a href="${path(lang, 'privacy')}">${esc(u.privacy)}</a></p>
<p>${esc(site.name[lang])} · ${esc(site.tagline[lang])}</p>
</div></footer>
${script ? `<script src="${BASE}/assets/site.js" defer></script>` : ''}
</body>
</html>
`;
}

function card(lang, it, big = false) {
  const t = it[lang];
  const cat = categories.find((c) => c.id === it.category);
  const img = thumb(it)
    ? `<img src="${thumb(it)}" alt="" loading="${big ? 'eager' : 'lazy'}" width="400" height="300">`
    : `<span class="ph" aria-hidden="true">${esc(t.title.slice(0, 2))}</span>`;
  const tags = (t.tags || []).slice(0, 2).map((x) => `<span class="tag soft">${esc(x)}</span>`).join('');
  return `<li class="card${big ? ' big' : ''}"><a href="${path(lang, it.slug)}"><span class="thumb">${img}</span><span class="meta"><span class="tags"><span class="tag">${esc(cat[lang])}</span>${tags}</span><strong>${esc(t.title)}</strong><span class="desc">${esc(t.desc)}</span></span></a></li>`;
}

function renderHome(lang, items) {
  const u = ui[lang];
  const [first, ...rest] = items;
  const cutoff = new Date(Date.parse(first ? first.date : '1970-01-01') - 3 * 864e5).toISOString().slice(0, 10);
  const fresh = rest.slice(2).filter((i) => i.date >= cutoff).slice(0, 30);
  const sections = categories.map((c) => {
    const list = items.filter((i) => i.category === c.id);
    if (!list.length) return '';
    return `<section><div class="sec-head"><h2>${esc(c[lang])}</h2><a href="${catPath(lang, c.id)}">${esc(u.more)} (${list.length}${u.items}) →</a></div><ul class="grid">${list.slice(0, 6).map((i) => card(lang, i)).join('')}</ul></section>`;
  }).join('\n');
  const content = `<h1 class="visually-hidden">${esc(site.name[lang])}</h1>
<p class="lead">${esc(site.desc[lang])}</p>
${first ? `<h2>${esc(u.newest)}</h2><ul class="grid hero">${card(lang, first, true)}${rest.slice(0, 2).map((i) => card(lang, i)).join('')}</ul>` : ''}
${fresh.length ? `<section><h2>${esc(u.fresh)}</h2><ul class="grid">${fresh.map((i) => card(lang, i)).join('')}</ul></section>` : ''}
<section id="popular" hidden data-lang="${lang}" data-base="${BASE}"><h2>${esc(u.popular)}</h2><ul class="grid"></ul></section>
${adSlot()}
${sections}`;
  const schema = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name[lang], url: abs(path(lang)), inLanguage: lang, description: site.desc[lang] }];
  return layout({ lang, slug: '', title: `${site.name[lang]} – ${site.tagline[lang]}`, desc: site.desc[lang], content, schema, image: first ? thumb(first) : '', script: true });
}

function renderCategory(lang, cat, items) {
  const u = ui[lang];
  const list = items.filter((i) => i.category === cat.id);
  const content = `<p class="crumbs"><a href="${path(lang)}">${esc(u.home)}</a> › ${esc(cat[lang])}</p>
<h1>${esc(cat[lang])}</h1>
<p class="lead">${esc(cat.desc[lang])}</p>
<ul class="grid">${list.map((i) => card(lang, i)).join('')}</ul>`;
  const desc = `${cat.desc[lang]} – ${site.name[lang]}`;
  return layout({ lang, slug: `c/${cat.id}`, title: `${cat[lang]} – ${site.name[lang]}`, desc, content });
}

function renderItem(lang, it, items) {
  const u = ui[lang];
  const t = it[lang];
  const cat = categories.find((c) => c.id === it.category);
  const ar = ratio(it.aspect);
  const related = items.filter((i) => i.slug !== it.slug && i.category === it.category).slice(0, 6);
  const others = related.length < 3 ? items.filter((i) => i.slug !== it.slug && i.category !== it.category).slice(0, 6 - related.length) : [];
  const content = `<p class="crumbs"><a href="${path(lang)}">${esc(u.home)}</a> › <a href="${catPath(lang, cat.id)}">${esc(cat[lang])}</a></p>
<h1>${esc(t.title)}</h1>
<p class="lead">${esc(t.desc)}</p>
<div class="stage" style="--ar:${ar.toFixed(4)}"><iframe id="game" src="${itemSrc(it, lang)}" title="${esc(t.title)}" allow="fullscreen; autoplay; clipboard-write" allowfullscreen></iframe></div>
<noscript><p class="note">${esc(u.noscript)}</p></noscript>
<div class="actions"><button type="button" data-fullscreen>${esc(u.fullscreen)}</button><button type="button" data-share data-copied="${esc(u.copied)}">${esc(u.share)}</button></div>
<div class="vote" hidden data-item="${it.slug}" data-base="${BASE}" data-thanks="${esc(u.voteThanks)}" data-fail="${esc(u.voteFail)}"><button type="button" data-v="1" aria-pressed="false">👍 ${esc(u.like)} <b data-up>0</b></button><button type="button" data-v="-1" aria-pressed="false">👎 ${esc(u.dislike)} <b data-down>0</b></button><span class="vote-msg" aria-live="polite"></span></div>
<h2>${esc(u.play)}</h2>
<p>${esc(t.howto)}</p>
${t.about ? `<p>${esc(t.about)}</p>` : ''}
<p class="small">${esc(u.added)}: <time datetime="${it.date}">${it.date}</time></p>
${adSlot()}
${related.length + others.length ? `<h2>${esc(u.related)}</h2><ul class="grid">${[...related, ...others].map((i) => card(lang, i)).join('')}</ul>` : ''}`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name[lang], item: abs(path(lang)) },
      { '@type': 'ListItem', position: 2, name: cat[lang], item: abs(catPath(lang, cat.id)) },
      { '@type': 'ListItem', position: 3, name: t.title, item: abs(path(lang, it.slug)) },
    ] },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: t.title, description: t.desc, url: abs(path(lang, it.slug)), applicationCategory: it.kind === 'tool' ? 'UtilitiesApplication' : 'GameApplication', operatingSystem: 'Any (web browser)', inLanguage: lang, datePublished: it.date, ...(thumb(it) ? { image: abs(thumb(it)) } : {}), offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' } },
  ];
  return layout({ lang, slug: it.slug, title: `${t.title} – ${site.name[lang]}`, desc: t.desc, content, schema, image: thumb(it), script: true });
}

function renderPage(lang, id) {
  const p = pages[id][lang];
  return layout({ lang, slug: id, title: `${p.title} – ${site.name[lang]}`, desc: site.desc[lang], content: `<h1>${esc(p.title)}</h1>\n${p.body}` });
}

// ---- build ----
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const items = loadItems();
  rmSync(OUT, { recursive: true, force: true });
  activeCats = categories.filter((c) => items.some((i) => i.category === c.id));
  const entries = [];
  const newest = items[0]?.date || new Date().toISOString().slice(0, 10);
  for (const lang of LANGS) {
    write(`${lang}/index.html`, renderHome(lang, items));
    for (const c of activeCats) write(`${lang}/c/${c.id}/index.html`, renderCategory(lang, c, items));
    for (const it of items) write(`${lang}/${it.slug}/index.html`, renderItem(lang, it, items));
    for (const id of Object.keys(pages)) write(`${lang}/${id}/index.html`, renderPage(lang, id));
  }
  entries.push({ slug: '', date: newest });
  for (const c of activeCats) entries.push({ slug: `c/${c.id}`, date: items.find((i) => i.category === c.id)?.date || newest });
  for (const it of items) entries.push({ slug: it.slug, date: it.date });
  for (const id of Object.keys(pages)) entries.push({ slug: id, date: newest });

  // Raw items: copied as-is, marked noindex (the wrapper page is the canonical one).
  for (const it of items) {
    const src = join(ITEMS, it.slug);
    for (const f of readdirSync(src)) {
      if (f === 'meta.json' || !statSync(join(src, f)).isFile()) continue;
      const dest = join(OUT, 'items', it.slug, f);
      mkdirSync(dirname(dest), { recursive: true });
      if (f === 'index.html') {
        const html = readFileSync(join(src, f), 'utf8').replace(/<head>/i, `<head>\n<meta name="robots" content="noindex">\n<link rel="canonical" href="${abs(path('ko', it.slug))}">`);
        writeFileSync(dest, html);
      } else copyFileSync(join(src, f), dest);
    }
  }

  write('index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.name.ko)} · ${esc(site.name.en)}</title>
<meta name="description" content="${esc(site.desc.en)}">
<link rel="canonical" href="${abs(path('en'))}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(path(l))}">`).join('')}
<link rel="alternate" hreflang="x-default" href="${abs(path('en'))}">
<link rel="icon" href="${BASE}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
<script>location.replace(${json(BASE)} + ((navigator.language || '').toLowerCase().startsWith('ko') ? '/ko/' : '/en/'));</script>
</head><body><main class="wrap"><h1>${esc(site.name.ko)} · ${esc(site.name.en)}</h1>
<ul class="grid"><li class="card"><a href="${path('ko')}" lang="ko"><span class="meta"><strong>한국어</strong><span class="desc">${esc(site.tagline.ko)}</span></span></a></li><li class="card"><a href="${path('en')}"><span class="meta"><strong>English</strong><span class="desc">${esc(site.tagline.en)}</span></span></a></li></ul>
</main></body></html>
`);
  write('404.html', layout({ lang: 'ko', slug: '', title: `404 – ${site.name.ko}`, desc: ui.ko.notFound, content: `<h1>${ui.ko.notFound}</h1><p class="lead">${ui.en.notFound}</p><ul class="grid">${items.slice(0, 6).map((i) => card('ko', i)).join('')}</ul>` }).replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"'));

  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.flatMap(({ slug, date }) => LANGS.map((lang) => `<url><loc>${abs(path(lang, slug))}</loc><lastmod>${date}</lastmod>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(path(l, slug))}"/>`).join('')}</url>`)).join('\n')}
</urlset>
`);
  write('items.json', JSON.stringify(items.map((i) => ({ slug: i.slug, category: i.category, date: i.date, thumb: thumb(i), ko: { title: i.ko.title, desc: i.ko.desc }, en: { title: i.en.title, desc: i.en.desc } }))));
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  write('.nojekyll', '');
  const host = new URL(SITE_URL).hostname;
  if (!host.endsWith('.github.io')) write('CNAME', host + '\n');
  if (ADS) write('ads.txt', `google.com, ${ADS.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
  write('assets/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#ffcf33"/><circle cx="22" cy="26" r="6" fill="#1d1a14"/><circle cx="42" cy="26" r="6" fill="#1d1a14"/><path d="M18 40 Q32 54 46 40" stroke="#1d1a14" stroke-width="5" fill="none" stroke-linecap="round"/></svg>\n`);
  for (const f of ['style.css', 'site.js']) copyFileSync(join(ROOT, 'src', f), join(OUT, 'assets', f));
  console.log(`Built ${items.length} items, ${entries.length * LANGS.length} pages -> dist/ (${SITE_URL})${ADS ? ' with AdSense' : ''}`);
}
