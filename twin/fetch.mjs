// Downloads OSM features into data/area.json. Usage: node fetch.mjs [south west north east]
import { writeFileSync } from 'node:fs';
const bbox = process.argv.length > 5 ? process.argv.slice(2, 6).map(Number) : [35.2217, 128.6430, 35.2377, 128.6620];
const polygonFilters = [
  '["building"]', '["building:part"]',
  '["leisure"~"^(park|garden|pitch)$"]', '["landuse"~"^(grass|forest|recreation_ground)$"]',
  '["natural"~"^(wood|water)$"]', '["waterway"="riverbank"]',
];
const selectors = [
  ...polygonFilters.map(filter => 'way' + filter),
  ...polygonFilters.map(filter => 'relation["type"="multipolygon"]' + filter),
  'way["highway"]', 'node["highway"="bus_stop"]', 'node["public_transport"="platform"]',
];
const query = `[out:json][timeout:60];(${selectors.map(selector => `${selector}(${bbox});`).join('')});out geom tags;`;
const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  body: new URLSearchParams({ data: query }),
  headers: { 'User-Agent': 'digital-twin-prototype' },
});
if (response.status !== 200) throw new Error(`Overpass request failed: HTTP ${response.status} ${response.statusText || ''}`.trim());
const { elements, remark } = await response.json();
if (remark || !Array.isArray(elements)) throw new Error(`Overpass response: ${remark || 'missing elements'}`);

const out = { bbox, buildings: [], roads: [], stops: [], green: [], water: [] };
const relationWays = { buildings: new Set(), green: new Set(), water: new Set() };
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
  return layers;
}

function addPolygon(layer, pts, tags) {
  if (layer === 'buildings') {
    const h = parseFloat(tags.height) || (parseFloat(tags['building:levels']) || 0) * 3.2;
    out.buildings.push({ pts, h: Number.isFinite(h) && h > 0 ? h : 0, name: tags.name || '' });
  } else {
    out[layer].push({ pts });
  }
}

function* outerRings(members) {
  const segments = members
    .filter(member => member?.type === 'way' && member.role === 'outer')
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

const relationPolygons = [];
for (const element of elements) {
  if (element?.type !== 'relation' || !Array.isArray(element.members)) continue;
  const tags = element.tags || {};
  const layers = polygonLayers(tags);
  for (const { pts, refs } of outerRings(element.members)) {
    for (const layer of layers) {
      relationPolygons.push({ layer, pts, tags });
      for (const ref of refs) if (ref != null) relationWays[layer].add(ref);
    }
  }
}

for (const element of elements) {
  const { type, id, tags = {}, lat, lon, geometry } = element || {};
  if (type === 'node' && Number.isFinite(lat) && Number.isFinite(lon)
    && (tags.highway === 'bus_stop' || tags.public_transport === 'platform')) {
    out.stops.push({ lat, lon, name: tags.name || tags['name:ko'] || '' });
  }
  if (type !== 'way') continue;
  const pts = coordinates(geometry);
  if (closed(pts)) {
    for (const layer of polygonLayers(tags)) {
      if (!relationWays[layer].has(id)) addPolygon(layer, pts, tags);
    }
  }
  if (tags.highway && pts.length >= 2) out.roads.push({ pts, kind: tags.highway, name: tags.name || '' });
}
for (const { layer, pts, tags } of relationPolygons) addPolygon(layer, pts, tags);
writeFileSync(new URL('data/area.json', import.meta.url), JSON.stringify(out));
console.log(`buildings ${out.buildings.length} (with height ${out.buildings.filter(b => b.h).length}), roads ${out.roads.length}, stops ${out.stops.length}, green ${out.green.length}, water ${out.water.length}`);
