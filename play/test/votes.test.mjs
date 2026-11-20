import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { SCHEMA, voterId, castVote, getCounts, getTop, getMine } from '../lib/votes.mjs';

// Minimal Cloudflare D1 lookalike over node:sqlite.
function d1() {
  const db = new DatabaseSync(':memory:');
  db.exec(SCHEMA);
  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    first: async () => db.prepare(sql).get(...args) ?? null,
    run: async () => db.prepare(sql).run(...args),
  });
  return {
    prepare: (sql) => stmt(sql),
    batch: async (stmts) => { db.exec('BEGIN'); try { for (const s of stmts) await s.run(); db.exec('COMMIT'); } catch (e) { db.exec('ROLLBACK'); throw e; } },
  };
}

test('voter ids are stable, per item, and hide the IP', async () => {
  const a = await voterId('1.2.3.4', 'x', 's');
  assert.equal(a, await voterId('1.2.3.4', 'x', 's'));
  assert.notEqual(a, await voterId('1.2.3.4', 'y', 's'));
  assert.notEqual(a, await voterId('1.2.3.5', 'x', 's'));
  assert.match(a, /^[0-9a-f]{32}$/);
  assert.ok(!a.includes('1.2.3.4'));
});

test('like, switch, withdraw and repeat votes', async () => {
  const db = d1();
  const day = '2026-11-20';
  assert.deepEqual(await castVote(db, 'g', 'A', 1, day), { up: 1, down: 0, mine: 1 });
  assert.deepEqual(await castVote(db, 'g', 'A', 1, day), { up: 1, down: 0, mine: 1 }, 'repeat like does not double count');
  assert.deepEqual(await castVote(db, 'g', 'B', 1, day), { up: 2, down: 0, mine: 1 });
  assert.deepEqual(await castVote(db, 'g', 'A', -1, day), { up: 1, down: 1, mine: -1 }, 'switch');
  assert.deepEqual(await castVote(db, 'g', 'A', 0, day), { up: 1, down: 0, mine: 0 }, 'withdraw');
  assert.deepEqual(await castVote(db, 'g', 'C', 0, day), { up: 1, down: 0, mine: 0 }, 'withdraw without a vote is a no-op');
  assert.equal(await getMine(db, 'g', 'B'), 1);
  assert.equal(await getMine(db, 'g', 'A'), 0);
});

test('counts and top list', async () => {
  const db = d1();
  const day = '2026-11-20';
  for (const v of ['a', 'b', 'c']) await castVote(db, 'one', v, 1, day);
  await castVote(db, 'two', 'a', 1, day);
  await castVote(db, 'three', 'a', -1, day);
  assert.deepEqual(await getCounts(db, ['one', 'missing']), { one: { up: 3, down: 0 }, missing: { up: 0, down: 0 } });
  const top = await getTop(db, 5);
  assert.deepEqual(top.map((t) => t.item), ['one', 'two']);
});
