// Usage: node fetch.mjs --area daewon|anmin (Daewon also accepts a legacy positional bbox).
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const args = process.argv.slice(2);
const selected = args[0] === '--area' ? args[1] : 'daewon';
const anmin = selected === 'anmin';
// Optional input files contain raw public responses when data was acquired separately.
const staged = anmin && args.length === 4 ? args.slice(2) : null;
assert.ok(args.length === 0 || (!args[0].startsWith('--') && args.length === 4)
  || (args[0] === '--area' && ['daewon', 'anmin'].includes(selected) && (args.length === 2 || staged)),
'Usage: node fetch.mjs --area daewon|anmin [OSM response JSON, elevation array JSON for Anmin]');
const bbox = anmin ? [35.1775, 128.6760, 35.1975, 128.7005]
  : args.length === 4 ? args.map(Number) : [35.2217, 128.6430, 35.2377, 128.6620];
assert.ok(bbox.every(Number.isFinite) && bbox[0] < bbox[2] && bbox[1] < bbox[3], 'Invalid bounding box');
const polygonFilters = [
  '["building"]', '["building:part"]',
  '["leisure"~"^(park|garden|pitch)$"]',
  anmin ? '["landuse"~"^(residential|commercial|industrial|farmland|grass|forest|recreation_ground)$"]'
    : '["landuse"~"^(grass|forest|recreation_ground)$"]',
  anmin ? '["natural"~"^(wood|water|bare_rock|scrub|grassland)$"]' : '["natural"~"^(wood|water)$"]',
  '["waterway"="riverbank"]',
];
const selectors = [
  ...polygonFilters.map(filter => 'way' + filter),
  ...polygonFilters.map(filter => 'relation["type"="multipolygon"]' + filter),
  'way["highway"]', 'node["highway"="bus_stop"]', 'node["public_transport"="platform"]',
  ...(anmin ? ['node["natural"="tree"]', 'nwr["amenity"]["name"]', 'nwr["shop"]["name"]',
    'way["railway"]', 'way["barrier"="fence"]'] : []),
];
const query = `[out:json][timeout:60];(${selectors.map(selector => `${selector}(${bbox});`).join('')});out geom tags;`;

async function getOSM() {
  const servers = ['https://overpass-api.de/api/interpreter'];
  if (anmin) servers.push('https://overpass.kumi.systems/api/interpreter', 'https://overpass.private.coffee/api/interpreter');
  let failure;
  for (const url of servers) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ data: query }),
        headers: { 'User-Agent': 'digital-twin-prototype' },
        signal: AbortSignal.timeout(80000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.remark || !Array.isArray(data.elements)) throw new Error(data.remark || 'Missing elements');
      return data;
    } catch (error) {
      failure = error;
      console.warn(`${url}: ${error.cause?.message || error.message}`);
    }
  }
  throw new Error('All Overpass requests failed', { cause: failure });
}

const columns = 48;
const rows = 48;
async function getElevation() {
  const [south, west, north, east] = bbox;
  const coords = Array.from({ length: rows * columns }, (_, i) => [
    (north - Math.floor(i / columns) * (north - south) / (rows - 1)).toFixed(6),
    (west + (i % columns) * (east - west) / (columns - 1)).toFixed(6),
  ]);
  const heights = [];
  for (let start = 0; start < coords.length; start += 100) {
    const batch = coords.slice(start, start + 100);
    const [lats, lons] = [0, 1].map(axis => batch.map(coord => coord[axis]).join(','));
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lons}`;
    let values = [];
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
        if (response.status === 429 && attempt < 2) {
          const retryAfter = Number(response.headers.get('retry-after')) || 60;
          console.warn(`Elevation batch ${start / 100 + 1}: rate limited, retrying after ${retryAfter} seconds`);
          await delay(retryAfter * 1000 + 1000);
          continue;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const { elevation } = await response.json();
        if (!Array.isArray(elevation) || elevation.length !== batch.length) throw new Error('Incomplete response');
        values = elevation;
        break;
      } catch (error) {
        console.warn(`Elevation batch ${start / 100 + 1}, attempt ${attempt + 1}: ${error.cause?.message || error.message}`);
        if (attempt < 2) await delay(600 * (attempt + 1));
      }
    }
    heights.push(...batch.map((_, i) => values[i]));
    if (start + 100 === heights.length && heights.length < coords.length) await delay(250);
  }
  return heights;
}

function terrainGrid(heights) {
  assert.ok(Array.isArray(heights) && heights.length === columns * rows, 'Wrong elevation array length');
  const known = [...heights.keys()].filter(i => Number.isFinite(heights[i]));
  assert.ok(known.length, 'No elevations to interpolate');
  const distance = (a, b) => (a % columns - b % columns) ** 2
    + (Math.floor(a / columns) - Math.floor(b / columns)) ** 2;
  return {
    columns, rows, source: 'Open-Meteo / Copernicus DEM GLO-90', filled: heights.length - known.length,
    elevation: Array.from(heights, (value, i) => Number.isFinite(value) ? value
      : heights[known.reduce((best, sample) => distance(sample, i) < distance(best, i) ? sample : best)]),
  };
}

const { elements, remark } = staged ? JSON.parse(readFileSync(staged[0], 'utf8')) : await getOSM();
if (remark || !Array.isArray(elements)) throw new Error(`Overpass response: ${remark || 'missing elements'}`);

const out = { bbox, buildings: [], roads: [], stops: [], green: [], water: [] };
if (anmin) Object.assign(out, { trees: [], landuse: [], places: [], fences: [], rail: [] });
const relationWays = { buildings: new Set(), green: new Set(), water: new Set(), landuse: new Set() };
const samePoint = ([lat, lon], [otherLat, otherLon]) => lat === otherLat && lon === otherLon;
const closed = pts => pts.length >= 4 && samePoint(pts[0], pts.at(-1));

function coordinates(geometry) {
  if (!Array.isArray(geometry) || geometry.some(p => !Number.isFinite(p?.lat) || !Number.isFinite(p?.lon))) return [];
  return geometry.map(p => [p.lat, p.lon]);
}

function polygonLayers(tags) {
  const layers = [];
  if ((tags.building && tags.building !== 'no') || (tags['building:part'] && tags['building:part'] !== 'no')) layers.push('buildings');
  if (['park', 'garden', 'pitch'].includes(tags.leisure)
    || ['grass', 'forest', 'recreation_ground'].includes(tags.landuse) || tags.natural === 'wood') layers.push('green');
  if (tags.natural === 'water' || tags.waterway === 'riverbank') layers.push('water');
  if (anmin && (landuseKinds.includes(tags.landuse) || ['bare_rock', 'grassland', 'scrub'].includes(tags.natural))) layers.push('landuse');
  return layers;
}

const landuseKinds = ['residential', 'commercial', 'industrial', 'farmland', 'grass', 'forest', 'recreation_ground'];
const localizedName = tags => ({ name: tags['name:ko'] || tags.name || '', en: tags['name:en'] || '' });

function addPolygon(layer, pts, tags, holes = []) {
  if (layer === 'buildings') {
    const h = parseFloat(tags.height) || (parseFloat(tags['building:levels']) || 0) * 3.2;
    const building = { pts, h: Number.isFinite(h) && h > 0 ? h : 0, name: tags.name || '' };
    if (anmin) Object.assign(building, localizedName(tags), {
      type: tags.building || tags['building:part'], levels: Number.parseFloat(tags['building:levels']) || undefined,
      height: tags.height, roof: tags['roof:shape'], colour: tags['building:colour'], material: tags['building:material'],
    });
    if (anmin && holes.length) building.holes = holes;
    out.buildings.push(building);
  } else {
    const polygon = { pts };
    if (anmin) polygon.kind = tags.landuse || tags.natural || tags.leisure || tags.waterway;
    if (anmin && holes.length) polygon.holes = holes;
    out[layer].push(polygon);
  }
}

function* rings(members, role = 'outer') {
  const segments = members
    .filter(member => member?.type === 'way' && member.role === role)
    .map(member => ({ ref: member.ref, pts: coordinates(member.geometry) }))
    .filter(segment => segment.pts.length >= 2);
  while (segments.length) {
    const first = segments.shift();
    const pts = first.pts;
    const refs = [first.ref];
    while (!closed(pts)) {
      const end = pts.at(-1);
      const index = segments.findIndex(segment => !closed(segment.pts)
        && (samePoint(segment.pts[0], end) || samePoint(segment.pts.at(-1), end)));
      if (index < 0) break;
      const [next] = segments.splice(index, 1);
      if (!samePoint(next.pts[0], end)) next.pts.reverse();
      pts.push(...next.pts.slice(1));
      refs.push(next.ref);
    }
    if (closed(pts)) yield { pts, refs };
  }
}

function contains(pts, [lat, lon]) {
  let inside = false;
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = pts[i - 1];
    const [c, d] = pts[i];
    if ((b > lon) !== (d > lon) && lat < (c - a) * (lon - b) / (d - b) + a) inside = !inside;
  }
  return inside;
}

const relationPolygons = [];
for (const element of elements) {
  if (element?.type !== 'relation' || !Array.isArray(element.members)) continue;
  const tags = element.tags || {};
  const layers = polygonLayers(tags);
  if (!layers.length) continue;
  const inner = anmin ? [...rings(element.members, 'inner')] : [];
  for (const { pts, refs } of rings(element.members)) {
    const holes = inner.filter(hole => contains(pts, hole.pts[0])).map(hole => hole.pts);
    for (const layer of layers) {
      relationPolygons.push({ layer, pts, tags, holes });
      for (const ref of refs) if (ref != null) relationWays[layer].add(ref);
    }
  }
}

for (const element of elements) {
  const { type, id, tags = {}, lat, lon, geometry } = element || {};
  if (type === 'node' && Number.isFinite(lat) && Number.isFinite(lon)
    && (tags.highway === 'bus_stop' || tags.public_transport === 'platform')) {
    out.stops.push(anmin ? { lat, lon, ...localizedName(tags) } : { lat, lon, name: tags.name || tags['name:ko'] || '' });
  }
  if (anmin && type === 'node' && tags.natural === 'tree' && Number.isFinite(lat) && Number.isFinite(lon)) {
    out.trees.push({ lat, lon, leaf: tags.leaf_type });
  }
  if (anmin && (tags.shop || tags.amenity) && (tags.name || tags['name:en'] || tags['name:ko'])) {
    const pts = type === 'way' ? coordinates(geometry)
      : type === 'relation' ? [...rings(element.members || [])].flatMap(ring => ring.pts) : [];
    const center = pts.length ? [0, 1].map(axis => {
      const values = pts.map(point => point[axis]);
      return (Math.min(...values) + Math.max(...values)) / 2;
    }) : [lat, lon];
    if (center.every(Number.isFinite) && center[0] >= bbox[0] && center[0] <= bbox[2]
      && center[1] >= bbox[1] && center[1] <= bbox[3]) {
      out.places.push({ lat: center[0], lon: center[1], ...localizedName(tags), kind: tags.amenity || tags.shop,
        pts: tags.amenity === 'school' && closed(pts) ? pts : undefined });
    }
  }
  if (type !== 'way') continue;
  const pts = coordinates(geometry);
  if (closed(pts)) {
    for (const layer of polygonLayers(tags)) {
      if (!relationWays[layer].has(id)) addPolygon(layer, pts, tags);
    }
  }
  if (tags.highway && pts.length >= 2) {
    const road = { pts, kind: tags.highway, name: tags.name || '' };
    if (anmin) Object.assign(road, {
      bridge: tags.bridge && tags.bridge !== 'no' || undefined,
      tunnel: tags.tunnel && tags.tunnel !== 'no' || undefined,
      lanes: Number.parseInt(tags.lanes, 10) || undefined,
      sidewalk: tags.sidewalk, surface: tags.surface, area: tags.area === 'yes' || undefined,
    });
    out.roads.push(road);
  }
  if (anmin && pts.length >= 2) {
    if (tags.barrier === 'fence') out.fences.push({ pts });
    if (['rail', 'light_rail', 'tram'].includes(tags.railway) && !tags.tunnel) out.rail.push({ pts });
  }
}
for (const { layer, pts, tags, holes } of relationPolygons) addPolygon(layer, pts, tags, holes);
if (anmin) out.terrain = terrainGrid(staged ? JSON.parse(readFileSync(staged[1], 'utf8')) : await getElevation());
writeFileSync(new URL(anmin ? 'data/anmin.json' : 'data/area.json', import.meta.url), JSON.stringify(out));
console.log(Object.entries(out).filter(([key, values]) => key !== 'bbox' && Array.isArray(values))
  .map(([key, values]) => `${key} ${values.length}`).join(', '));
console.log(`Buildings with supplied height or levels: ${out.buildings.filter(b => b.h).length}`);
if (anmin) console.log(`Elevation: ${columns} × ${rows}, ${out.terrain.filled} nearest-neighbour fills`);
