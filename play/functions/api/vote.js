import { SLUG, voterId, castVote } from '../../lib/votes.mjs';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

let known = null; // slugs from /items.json, cached per isolate

// POST /api/vote  {item, v: 1|-1|0}  ->  {up, down, mine}
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'unavailable' }, 503);
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== url.host) return json({ error: 'origin' }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  const item = String(body?.item || '');
  const v = Number(body?.v);
  if (!SLUG.test(item) || item.length > 60 || ![1, 0, -1].includes(v)) return json({ error: 'bad request' }, 400);
  if (!known && env.ASSETS) {
    try { known = new Set((await (await env.ASSETS.fetch(new URL('/items.json', url))).json()).map((i) => i.slug)); } catch { known = null; }
  }
  if (known && !known.has(item)) {
    known = null; // a new item may have been deployed since this isolate cached the list
    return json({ error: 'unknown item' }, 404);
  }
  const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const voter = await voterId(ip, item, env.VOTE_SALT || 'daily-toybox');
  return json(await castVote(env.DB, item, voter, v, new Date().toISOString().slice(0, 10)));
}
