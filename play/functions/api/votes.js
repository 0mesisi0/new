import { SLUG, voterId, getCounts, getTop, getMine } from '../../lib/votes.mjs';

const json = (body, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache } });

// GET /api/votes?items=a,b,c[&top=6]  ->  { counts: {a:{up,down}}, top?: [...], mine?: -1|0|1 }
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: 'unavailable' }, 503);
  const url = new URL(request.url);
  const items = [...new Set((url.searchParams.get('items') || '').split(',').filter((s) => s.length <= 60 && SLUG.test(s)))].slice(0, 60);
  const top = Math.max(0, Math.min(12, Number(url.searchParams.get('top')) || 0));
  const out = { counts: await getCounts(env.DB, items) };
  if (top) out.top = await getTop(env.DB, top);
  if (items.length === 1) {
    const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    out.mine = await getMine(env.DB, items[0], await voterId(ip, items[0], env.VOTE_SALT || 'daily-toybox'));
  }
  return json(out);
}
