// Static site generator. Usage: node build.mjs
// Env: SITE_URL (default https://0mesisi0.github.io/new), ADSENSE_CLIENT (e.g. ca-pub-1234567890123456)
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, ui, home, pages } from './src/content.mjs';
import { salary } from './src/calc.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');
const SITE_URL = (process.env.SITE_URL || 'https://0mesisi0.github.io/new').replace(/\/+$/, '');
const BASE = new URL(SITE_URL).pathname.replace(/\/+$/, '');
const ADS = /^ca-pub-\d{10,20}$/.test(process.env.ADSENSE_CLIENT || '') ? process.env.ADSENSE_CLIENT : '';
const LANGS = ['ko', 'en'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const path = (lang, slug = '') => `${BASE}/${lang}/${slug ? slug + '/' : ''}`;
const abs = (p) => new URL(SITE_URL).origin + p;
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const byId = Object.fromEntries(pages.map((p) => [p.id, p]));
const calcs = pages.filter((p) => p.type === 'calc');
const guides = pages.filter((p) => p.type === 'guide');

function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const adSlot = () => (ADS ? `<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${ADS}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>` : '');

function layout({ lang, slug, title, desc, content, schema = [], script = false }) {
  const u = ui[lang];
  const other = lang === 'ko' ? 'en' : 'ko';
  const self = path(lang, slug);
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(path(l, slug))}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${abs(path('en', slug))}">`;
  const nav = [...calcs.slice(0, 3), byId.table].map((p) => `<a href="${path(lang, p.slug)}"${p.slug === slug ? ' aria-current="page"' : ''}>${esc(p[lang].nav)}</a>`).join('');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(self)}">
${alternates}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(self)}">
<meta property="og:site_name" content="${esc(site.name[lang])}">
<meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="${BASE}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
${schema.map((s) => `<script type="application/ld+json">${json(s)}</script>`).join('\n')}
${ADS ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS}" crossorigin="anonymous"></script>` : ''}
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="${path(lang)}"><b>₩</b> ${esc(site.name[lang])}</a>
<nav class="top" aria-label="${esc(u.calculators)}">${nav}<a class="lang" href="${path(other, slug)}" hreflang="${other}" lang="${other}">${esc(u.other)}</a></nav>
</div></header>
<main class="wrap">
${content}
</main>
<footer class="site"><div class="wrap">
<p><a href="${path(lang)}">${esc(u.home)}</a><a href="${path(lang, 'about')}">${esc(u.about)}</a><a href="${path(lang, 'privacy')}">${esc(u.privacy)}</a></p>
<p>© ${site.updated.slice(0, 4)} ${esc(site.name[lang])} · ${esc(site.tagline[lang])}</p>
</div></footer>
${script ? `<script type="module" src="${BASE}/assets/app.js"></script>` : ''}
</body>
</html>
`;
}

const fmt = (lang, v) => (lang === 'ko' ? `${Math.round(v).toLocaleString('ko-KR')}원` : `₩${Math.round(v).toLocaleString('en-US')}`);

function salaryTable(lang, cols) {
  const amounts = [];
  for (let a = 2400; a <= 10000; a += 200) amounts.push(a);
  for (let a = 11000; a <= 20000; a += 1000) amounts.push(a);
  const rows = amounts.map((a) => {
    const annual = a * 10000;
    const y26 = salary({ annual, year: 2026 });
    const y27 = salary({ annual, year: 2027 });
    const label = lang === 'ko' ? `${a.toLocaleString('ko-KR')}만 원` : `₩${(a / 100).toLocaleString('en-US')}M`;
    return `<tr><td>${label}</td><td>${fmt(lang, y26.net)}</td><td>${fmt(lang, y27.net)}</td><td>${fmt(lang, y27.deductions)}</td></tr>`;
  });
  return `<div class="table-scroll"><table><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

function fill(html, lang) {
  const minNet = salary({ annual: 10700 * 209 * 12, nontax: 0, year: 2027 }).net;
  return html
    .replace(/\{\{minNet2027\}\}/g, Math.round(minNet).toLocaleString('en-US'))
    .replace(/\{\{(\w+)\}\}/g, (m, id) => (byId[id] ? path(lang, byId[id].slug) : m));
}

function faqHtml(lang, faq) {
  if (!faq?.length) return '';
  return `<h2>${esc(ui[lang].faq)}</h2>\n` + faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n');
}

function relatedHtml(lang, currentId) {
  const items = calcs.filter((p) => p.id !== currentId).map((p) => `<li><a href="${path(lang, p.slug)}"><strong>${esc(p[lang].nav)}</strong><span>${esc(p[lang].card)}</span></a></li>`).join('');
  return `<h2>${esc(ui[lang].related)}</h2><ul class="grid">${items}</ul>`;
}

function breadcrumb(lang, page) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name[lang], item: abs(path(lang)) },
      { '@type': 'ListItem', position: 2, name: page[lang].h1, item: abs(path(lang, page.slug)) },
    ],
  };
}

function renderPage(lang, page) {
  const t = page[lang];
  const u = ui[lang];
  const schema = [breadcrumb(lang, page)];
  if (t.faq?.length) {
    schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  if (page.type === 'calc') {
    schema.push({ '@context': 'https://schema.org', '@type': 'WebApplication', name: t.h1, url: abs(path(lang, page.slug)), description: t.desc, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', inLanguage: lang, offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' } });
  } else if (page.type === 'guide') {
    schema.push({ '@context': 'https://schema.org', '@type': 'Article', headline: t.h1, description: t.desc, inLanguage: lang, dateModified: site.updated, datePublished: site.updated, mainEntityOfPage: abs(path(lang, page.slug)), author: { '@type': 'Organization', name: site.name[lang] }, publisher: { '@type': 'Organization', name: site.name[lang] } });
  }
  const parts = [
    `<p class="crumbs"><a href="${path(lang)}">${esc(u.home)}</a> › ${esc(t.nav)}</p>`,
    `<h1>${esc(t.h1)}</h1>`,
    `<p class="lead">${esc(t.lead)}</p>`,
  ];
  if (page.type === 'calc') {
    parts.push(`<div id="calc" data-calc="${page.id}"><noscript>${esc(u.noscript)}</noscript></div>`);
    parts.push(adSlot());
  }
  parts.push(fill(t.body, lang));
  if (page.table) parts.push(salaryTable(lang, t.cols), fill(t.after, lang));
  if (page.type !== 'calc' && page.type !== 'info') parts.push(adSlot());
  parts.push(faqHtml(lang, t.faq));
  if (page.type !== 'info') {
    parts.push(relatedHtml(lang, page.id));
    parts.push(`<p class="disclaimer">${esc(u.disclaimer)}<br><span class="updated">${esc(u.updated)}: <time datetime="${site.updated}">${site.updated}</time></span></p>`);
  }
  return layout({ lang, slug: page.slug, title: t.title, desc: t.desc, content: parts.filter(Boolean).join('\n'), schema, script: page.type === 'calc' });
}

function renderHome(lang) {
  const t = home[lang];
  const u = ui[lang];
  const card = (p) => `<li><a href="${path(lang, p.slug)}"><strong>${esc(p[lang].nav)}</strong><span>${esc(p[lang].card || p[lang].desc)}</span></a></li>`;
  const content = `<h1>${esc(t.h1)}</h1>
<p class="lead">${esc(t.lead)}</p>
<h2>${esc(u.calculators)}</h2>
<ul class="grid">${calcs.map(card).join('')}</ul>
${adSlot()}
<h2>${esc(u.guides)}</h2>
<ul class="grid">${guides.map(card).join('')}</ul>
<p class="disclaimer">${esc(u.disclaimer)}</p>`;
  const schema = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name[lang], url: abs(path(lang)), inLanguage: lang, description: t.desc }];
  return layout({ lang, slug: '', title: t.title, desc: t.desc, content, schema });
}

// ---- build ----
rmSync(OUT, { recursive: true, force: true });
for (const lang of LANGS) {
  write(`${lang}/index.html`, renderHome(lang));
  for (const page of pages) write(`${lang}/${page.slug}/index.html`, renderPage(lang, page));
}
const slugs = ['', ...pages.map((p) => p.slug)];

write('index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WonCalc · 원캘크</title>
<meta name="description" content="${esc(home.en.desc)}">
<link rel="canonical" href="${abs(path('en'))}">
<link rel="alternate" hreflang="ko" href="${abs(path('ko'))}">
<link rel="alternate" hreflang="en" href="${abs(path('en'))}">
<link rel="alternate" hreflang="x-default" href="${abs(path('en'))}">
<link rel="icon" href="${BASE}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
<script>location.replace(${json(BASE)} + ((navigator.language || '').toLowerCase().startsWith('ko') ? '/ko/' : '/en/'));</script>
</head>
<body><main class="wrap">
<h1>WonCalc · 원캘크</h1>
<ul class="grid">
<li><a href="${path('ko')}" lang="ko"><strong>한국어</strong><span>${esc(site.tagline.ko)}</span></a></li>
<li><a href="${path('en')}"><strong>English</strong><span>${esc(site.tagline.en)}</span></a></li>
</ul>
</main></body>
</html>
`);

write('404.html', layout({ lang: 'en', slug: '', title: 'Page not found – WonCalc', desc: ui.en.notFound, content: `<h1>${ui.en.notFound}</h1><p class="lead">${ui.ko.notFound}</p><ul class="grid"><li><a href="${path('ko')}"><strong>한국어</strong><span>${esc(site.tagline.ko)}</span></a></li><li><a href="${path('en')}"><strong>English</strong><span>${esc(site.tagline.en)}</span></a></li></ul>` }).replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${slugs.flatMap((slug) => LANGS.map((lang) => `<url><loc>${abs(path(lang, slug))}</loc><lastmod>${site.updated}</lastmod>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(path(l, slug))}"/>`).join('')}</url>`)).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write('.nojekyll', '');
if (ADS) write('ads.txt', `google.com, ${ADS.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
write('assets/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b6e4f"/><text x="32" y="45" font-size="38" font-family="Arial,sans-serif" font-weight="700" text-anchor="middle" fill="#fff">₩</text></svg>\n`);
for (const f of ['style.css', 'app.js', 'calc.mjs']) copyFileSync(join(ROOT, 'src', f), join(OUT, 'assets', f));

console.log(`Built ${slugs.length * LANGS.length} pages -> dist/ (${SITE_URL})${ADS ? ' with AdSense' : ''}`);
