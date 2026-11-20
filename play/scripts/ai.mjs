#!/usr/bin/env node
// Calls other AI providers for the daily pipeline. Keys are injected by the session's network proxy,
// so this script sends a placeholder; it never sees or stores a real key.
//
//   node scripts/ai.mjs status
//   node scripts/ai.mjs gemini-search "prompt"      Gemini + Google Search grounding, prints text and sources
//   node scripts/ai.mjs gemini "prompt"             Gemini, plain
//   node scripts/ai.mjs openai "prompt"             OpenAI text
//   node scripts/ai.mjs openai-image "prompt" out.png [1024x1024]
//
// Prompts can also be read from stdin with "-". Exit code 3 means the provider is not configured.
import { writeFileSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Node's fetch only honours HTTPS_PROXY when started with NODE_USE_ENV_PROXY=1.
if ((process.env.HTTPS_PROXY || process.env.https_proxy) && process.env.NODE_USE_ENV_PROXY !== '1') {
  const r = spawnSync(process.execPath, process.argv.slice(1), { stdio: 'inherit', env: { ...process.env, NODE_USE_ENV_PROXY: '1' } });
  process.exit(r.status ?? 1);
}

const PLACEHOLDER = 'proxy-injected';
const GEMINI = 'https://generativelanguage.googleapis.com/v1beta';
const OPENAI = 'https://api.openai.com/v1';

async function call(url, init = {}) {
  let res;
  try {
    res = await fetch(url, init);
  } catch (e) {
    return { ok: false, status: 0, error: `network: ${e.cause?.code || e.message}` };
  }
  const text = await res.text();
  let body = null;
  try { body = JSON.parse(text); } catch { /* not json */ }
  return { ok: res.ok, status: res.status, body, error: res.ok ? null : (body?.error?.message || text.slice(0, 300)) };
}

const geminiHeaders = { 'content-type': 'application/json', 'x-goog-api-key': PLACEHOLDER };
const openaiHeaders = { 'content-type': 'application/json', authorization: `Bearer ${PLACEHOLDER}` };

// Pick the newest capable model each run instead of hard-coding a name that may be retired.
async function geminiModel() {
  const r = await call(`${GEMINI}/models?pageSize=200`, { headers: geminiHeaders });
  if (!r.ok) return { error: r.error, status: r.status };
  const names = (r.body.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => m.name.replace(/^models\//, ''))
    .filter((n) => /^gemini-\d/.test(n) && !/(image|tts|audio|live|embedding|lite|preview-tts|exp)/.test(n));
  const score = (n) => {
    const v = parseFloat(n.match(/^gemini-(\d+(?:\.\d+)?)/)[1]);
    return v * 10 + (n.includes('pro') ? 2 : n.includes('flash') ? 1 : 0) - (n.includes('preview') ? 0.5 : 0);
  };
  names.sort((a, b) => score(b) - score(a));
  return names.length ? { model: names[0] } : { error: 'no Gemini model found' };
}

async function openaiModels() {
  const r = await call(`${OPENAI}/models`, { headers: openaiHeaders });
  if (!r.ok) return { error: r.error, status: r.status };
  return { ids: (r.body.data || []).map((m) => m.id) };
}
function pickOpenAIText(ids) {
  const c = ids.filter((id) => /^gpt-\d/.test(id) && !/(audio|realtime|transcribe|tts|search|image|mini-tts|instruct|codex)/.test(id) && !/-\d{4}-\d{2}-\d{2}$/.test(id));
  const v = (id) => parseFloat(id.match(/^gpt-(\d+(?:\.\d+)?)/)[1]) * 10 - (id.includes('mini') ? 3 : 0) - (id.includes('nano') ? 6 : 0);
  return c.sort((a, b) => v(b) - v(a))[0];
}
const pickOpenAIImage = (ids) => ids.filter((id) => /^gpt-image/.test(id) && !/-\d{4}-\d{2}-\d{2}$/.test(id)).sort().reverse()[0];

function fail(msg, code = 1) { console.error(msg); process.exit(code); }
const notConfigured = (status) => status === 401 || status === 403 || status === 0;

async function main() {
  const [cmd, promptArg, out, size] = process.argv.slice(2);
  const prompt = promptArg === '-' ? readFileSync(0, 'utf8') : promptArg;

  if (cmd === 'status') {
    const g = await geminiModel();
    const o = await openaiModels();
    console.log(`gemini: ${g.model ? `ok (${g.model})` : `unavailable (${g.error})`}`);
    console.log(`openai: ${o.ids ? `ok (text ${pickOpenAIText(o.ids) || 'none'}, image ${pickOpenAIImage(o.ids) || 'none'})` : `unavailable (${o.error})`}`);
    return;
  }
  if (!prompt) fail('missing prompt');

  if (cmd === 'gemini' || cmd === 'gemini-search') {
    const g = await geminiModel();
    if (!g.model) fail(`gemini unavailable: ${g.error}`, notConfigured(g.status) ? 3 : 1);
    const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
    if (cmd === 'gemini-search') body.tools = [{ google_search: {} }];
    const r = await call(`${GEMINI}/models/${g.model}:generateContent`, { method: 'POST', headers: geminiHeaders, body: JSON.stringify(body) });
    if (!r.ok) fail(`gemini error ${r.status}: ${r.error}`);
    const cand = r.body.candidates?.[0];
    console.log((cand?.content?.parts || []).map((p) => p.text || '').join(''));
    const chunks = cand?.groundingMetadata?.groundingChunks || [];
    if (chunks.length) {
      console.log('\nSources:');
      for (const c of chunks) if (c.web) console.log(`- ${c.web.title || ''} ${c.web.uri}`);
    }
    console.error(`[model: ${g.model}]`);
    return;
  }

  if (cmd === 'openai' || cmd === 'openai-image') {
    const o = await openaiModels();
    if (!o.ids) fail(`openai unavailable: ${o.error}`, notConfigured(o.status) ? 3 : 1);
    if (cmd === 'openai') {
      const model = pickOpenAIText(o.ids);
      if (!model) fail('no OpenAI text model found');
      const r = await call(`${OPENAI}/responses`, { method: 'POST', headers: openaiHeaders, body: JSON.stringify({ model, input: prompt }) });
      if (!r.ok) fail(`openai error ${r.status}: ${r.error}`);
      const text = r.body.output_text ?? (r.body.output || []).flatMap((x) => x.content || []).map((c) => c.text || '').join('');
      console.log(text);
      console.error(`[model: ${model}]`);
      return;
    }
    if (!out) fail('usage: openai-image "prompt" out.png [size]');
    const model = pickOpenAIImage(o.ids);
    if (!model) fail('no OpenAI image model found');
    const r = await call(`${OPENAI}/images/generations`, { method: 'POST', headers: openaiHeaders, body: JSON.stringify({ model, prompt, size: size || '1024x1024', n: 1 }) });
    if (!r.ok) fail(`openai image error ${r.status}: ${r.error}`);
    const b64 = r.body.data?.[0]?.b64_json;
    if (!b64) fail('no image returned');
    writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`wrote ${out}`);
    console.error(`[model: ${model}]`);
    return;
  }
  fail(`unknown command ${cmd}`);
}

main();
