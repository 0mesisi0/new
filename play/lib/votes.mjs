// Vote storage on a D1-compatible database (Cloudflare D1 in production, node:sqlite in tests).
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS votes (item TEXT PRIMARY KEY, up INTEGER NOT NULL DEFAULT 0, down INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS voters (item TEXT NOT NULL, voter TEXT NOT NULL, v INTEGER NOT NULL, day TEXT NOT NULL, PRIMARY KEY (item, voter));
`;

/** One-way id for (visitor, item). The IP address itself is never stored. */
export async function voterId(ip, item, salt) {
  const data = new TextEncoder().encode(`${salt}|${ip}|${item}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function getCounts(db, items) {
  const out = {};
  if (!items.length) return out;
  const { results } = await db.prepare(`SELECT item, up, down FROM votes WHERE item IN (${items.map(() => '?').join(',')})`).bind(...items).all();
  for (const r of results) out[r.item] = { up: r.up, down: r.down };
  for (const i of items) out[i] ||= { up: 0, down: 0 };
  return out;
}

export async function getTop(db, n) {
  const { results } = await db.prepare('SELECT item, up, down FROM votes WHERE up > 0 ORDER BY (up - down) DESC, up DESC, item LIMIT ?').bind(n).all();
  return results.map((r) => ({ item: r.item, up: r.up, down: r.down }));
}

export async function getMine(db, item, voter) {
  const row = await db.prepare('SELECT v FROM voters WHERE item = ? AND voter = ?').bind(item, voter).first();
  return row ? row.v : 0;
}

/** v: 1 like, -1 dislike, 0 withdraw. Returns the new counts and the visitor's vote. */
export async function castVote(db, item, voter, v, day) {
  const prev = await getMine(db, item, voter);
  if (prev !== v) {
    const up = (v === 1 ? 1 : 0) - (prev === 1 ? 1 : 0);
    const down = (v === -1 ? 1 : 0) - (prev === -1 ? 1 : 0);
    const stmts = [
      db.prepare('INSERT INTO votes (item, up, down) VALUES (?, ?, ?) ON CONFLICT(item) DO UPDATE SET up = MAX(0, up + excluded.up), down = MAX(0, down + excluded.down)')
        .bind(item, Math.max(0, up), Math.max(0, down)),
    ];
    // The INSERT above only sees positive deltas for a brand-new row; apply negatives to existing rows.
    if (up < 0 || down < 0) stmts[0] = db.prepare('UPDATE votes SET up = MAX(0, up + ?), down = MAX(0, down + ?) WHERE item = ?').bind(up, down, item);
    stmts.push(v === 0
      ? db.prepare('DELETE FROM voters WHERE item = ? AND voter = ?').bind(item, voter)
      : db.prepare('INSERT INTO voters (item, voter, v, day) VALUES (?, ?, ?, ?) ON CONFLICT(item, voter) DO UPDATE SET v = excluded.v, day = excluded.day').bind(item, voter, v, day));
    await db.batch(stmts);
  }
  return { ...(await getCounts(db, [item]))[item], mine: v };
}
