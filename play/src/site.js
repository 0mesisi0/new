(() => {
  const frame = document.getElementById('game');
  const fs = document.querySelector('[data-fullscreen]');
  const share = document.querySelector('[data-share]');
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
  };
  const getJSON = async (url) => {
    const r = await fetch(url, { headers: { accept: 'application/json' } });
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  };

  if (fs && frame) {
    const target = frame.parentElement;
    if (!target.requestFullscreen && !target.webkitRequestFullscreen) fs.hidden = true;
    fs.addEventListener('click', () => {
      const req = target.requestFullscreen || target.webkitRequestFullscreen;
      if (req) Promise.resolve(req.call(target)).catch(() => {});
      frame.focus();
    });
  }
  if (share) {
    share.addEventListener('click', async () => {
      const data = { title: document.title, url: location.href.split('#')[0] };
      try {
        if (navigator.share) { await navigator.share(data); return; }
      } catch (e) { if (e && e.name === 'AbortError') return; }
      try {
        await navigator.clipboard.writeText(data.url);
        const old = share.textContent;
        share.textContent = share.dataset.copied;
        setTimeout(() => { share.textContent = old; }, 1600);
      } catch { /* clipboard unavailable */ }
    });
  }
  if (frame) frame.addEventListener('load', () => { try { frame.contentWindow.focus(); } catch { /* cross-origin */ } });

  // Like / dislike. Hidden unless the vote API answers (it does not exist on static-only hosts).
  const box = document.querySelector('.vote');
  if (box) {
    const item = box.dataset.item;
    const api = `${box.dataset.base}/api`;
    const msg = box.querySelector('.vote-msg');
    let mine = Number(store.get(`vote:${item}`)) || 0;
    let busy = false;
    const render = (d) => {
      box.querySelector('[data-up]').textContent = d.up;
      box.querySelector('[data-down]').textContent = d.down;
      box.querySelectorAll('button[data-v]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === mine)));
    };
    getJSON(`${api}/votes?items=${encodeURIComponent(item)}`).then((d) => {
      if (typeof d.mine === 'number') { mine = d.mine; store.set(`vote:${item}`, String(mine)); }
      render(d.counts[item] || { up: 0, down: 0 });
      box.hidden = false;
    }).catch(() => {});
    box.addEventListener('click', async (e) => {
      const b = e.target.closest('button[data-v]');
      if (!b || busy) return;
      busy = true;
      const v = Number(b.dataset.v);
      const next = mine === v ? 0 : v;
      try {
        const r = await fetch(`${api}/vote`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ item, v: next }) });
        if (!r.ok) throw new Error(String(r.status));
        const d = await r.json();
        mine = d.mine;
        store.set(`vote:${item}`, String(mine));
        render(d);
        msg.textContent = mine ? box.dataset.thanks : '';
      } catch {
        msg.textContent = box.dataset.fail;
      } finally {
        busy = false;
      }
    });
  }

  // Home: most-liked list, filled from the vote API when available.
  const pop = document.getElementById('popular');
  if (pop) {
    const lang = pop.dataset.lang;
    const base = pop.dataset.base;
    Promise.all([getJSON(`${base}/api/votes?top=6`), getJSON(`${base}/items.json`)]).then(([v, items]) => {
      const bySlug = Object.fromEntries(items.map((i) => [i.slug, i]));
      const list = (v.top || []).filter((t) => bySlug[t.item]).slice(0, 6);
      if (list.length < 3) return;
      const ul = pop.querySelector('ul');
      for (const t of list) {
        const it = bySlug[t.item];
        const li = document.createElement('li');
        li.className = 'card';
        const a = document.createElement('a');
        a.href = `${base}/${lang}/${it.slug}/`;
        const th = document.createElement('span');
        th.className = 'thumb';
        if (it.thumb) { const img = document.createElement('img'); img.src = it.thumb; img.alt = ''; img.loading = 'lazy'; th.append(img); }
        const meta = document.createElement('span');
        meta.className = 'meta';
        const strong = document.createElement('strong');
        strong.textContent = it[lang].title;
        const desc = document.createElement('span');
        desc.className = 'desc';
        desc.textContent = `👍 ${t.up} · ${it[lang].desc}`;
        meta.append(strong, desc);
        a.append(th, meta);
        li.append(a);
        ul.append(li);
      }
      pop.hidden = false;
    }).catch(() => {});
  }
})();
