import * as THREE from 'three';

export const school = { lat: 35.18745, lon: 128.68790, name: '안민초등학교', en: 'Anmin Elementary School' };
const metres = Math.PI * 6371000 / 180;
const eastScale = metres * Math.cos(school.lat * Math.PI / 180);
const mix = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

export function project(lat, lon) {
  return new THREE.Vector2((lon - school.lon) * eastScale, (school.lat - lat) * metres);
}

export function outline(pts) {
  const points = [];
  for (const [lat, lon] of pts) {
    const point = project(lat, lon);
    if (!points.length || point.distanceToSquared(points[points.length - 1]) > 0.0001) points.push(point);
  }
  if (points.length > 1 && points[0].distanceToSquared(points[points.length - 1]) < 0.0001) points.pop();
  return points;
}

export function seeded(seed) {
  let value = seed | 0;
  return () => {
    value = Math.imul(value, 1664525) + 1013904223 | 0;
    return (value >>> 0) / 4294967296;
  };
}

export function canvasTexture(size, paint) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  paint(canvas.getContext('2d'), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const covers = [
  ['meadow', '#a2a77b'],
  ['grass', '#8eac62'],
  ['forest', '#597d49'],
  ['bare', '#9a947e'],
  ['built', '#ada898'],
  ['water', '#598c94'],
  ['farm', '#a7a260'],
  ['park', '#88a46f'],
  ['pitch', '#b5a68b'],
  ['school', '#b5ad87'],
];
const coverCode = {
  wood: 2, forest: 2, water: 5, riverbank: 5, residential: 4, industrial: 4, commercial: 4,
  bare_rock: 3, grass: 1, grassland: 1, scrub: 1, farmland: 6, park: 7, garden: 7, recreation_ground: 7, pitch: 8, school: 9,
};

export function buildTerrain(scene, data) {
  const [south, west, north, east] = data.bbox;
  const min = project(north, west);
  const max = project(south, east);
  const width = max.x - min.x;
  const depth = max.y - min.y;
  const { columns, rows, elevation } = data.terrain;
  const datum = Math.min(...elevation);
  const inside = (x, z) => x >= min.x && x <= max.x && z >= min.y && z <= max.y;
  function ground(x, z) {
    const u = clamp((x - min.x) / width, 0, 1) * (columns - 1);
    const v = clamp((z - min.y) / depth, 0, 1) * (rows - 1);
    const i = Math.min(Math.floor(u), columns - 2);
    const j = Math.min(Math.floor(v), rows - 2);
    const p = j * columns + i;
    return mix(mix(elevation[p], elevation[p + 1], u - i),
      mix(elevation[p + columns], elevation[p + columns + 1], u - i), v - j) - datum;
  }

  // Rasterize cover at one shared resolution for textures and vegetation lookups.
  const size = 1024;
  const mask = document.createElement('canvas');
  mask.width = mask.height = size;
  const ctx = mask.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  const campuses = data.places.filter(place => place.kind === 'school' && place.pts);
  const priority = [0, 3, 1, 4, 2, 9, 5, 6, 8, 7];
  const polygons = [...data.green, ...data.landuse, ...data.water, ...campuses]
    .map(poly => ({ ...poly, code: coverCode[poly.kind] }))
    .sort((a, b) => priority[a.code] - priority[b.code]);
  for (const { pts, holes, code } of polygons) {
    if (!code) continue;
    ctx.beginPath();
    for (const ring of [pts, ...(holes || [])]) {
      outline(ring).forEach((p, i) => {
        const x = (p.x - min.x) / width * size;
        const z = (p.y - min.y) / depth * size;
        if (i === 0) ctx.moveTo(x, z);
        else ctx.lineTo(x, z);
      });
      ctx.closePath();
    }
    ctx.fillStyle = 'rgb(' + code * 28 + ',0,0)';
    ctx.fill('evenodd');
  }
  const pixels = ctx.getImageData(0, 0, size, size).data;
  const pixel = (u, v) => (clamp(Math.floor(v * size), 0, size - 1) * size
    + clamp(Math.floor(u * size), 0, size - 1)) * 4;
  function cover(x, z) {
    return covers[Math.round(pixels[pixel((x - min.x) / width, (z - min.y) / depth)] / 28)][0];
  }
  const colours = covers.map(entry => new THREE.Color(entry[1]));
  const rock = new THREE.Color('#a09a86');
  const texture = canvasTexture(size, (paint, resolution) => {
    const random = seeded(350128);
    const image = paint.createImageData(resolution, resolution);
    const bytes = image.data;
    const rgb = colours.map(color => color.clone().convertLinearToSRGB().toArray().map(channel => channel * 255));
    for (let y = 0, p = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++, p += 4) {
        const code = Math.round(pixels[p] / 28);
        const tone = (random() - 0.5) * (code === 5 ? 4 : 17)
          + Math.sin(x * 0.13 + Math.sin(y * 0.14)) * 3 + Math.sin(y * 0.39 + x * 0.16) * 2;
        for (let c = 0; c < 3; c++) bytes[p + c] = rgb[code][c] + tone;
        bytes[p + 3] = 255;
      }
    }
    paint.putImageData(image, 0, 0);
  });
  texture.anisotropy = 4;

  const geometry = new THREE.PlaneGeometry(width, depth, (columns - 1) * 3, (rows - 1) * 3);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate((min.x + max.x) / 2, 0, (min.y + max.y) / 2);
  const positions = geometry.attributes.position;
  const tints = [];
  const tint = new THREE.Color();
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    positions.setY(i, ground(x, z));
    const slope = Math.hypot(ground(x + 12, z) - ground(x - 12, z), ground(x, z + 12) - ground(x, z - 12)) / 24;
    const weight = cover(x, z) === 'water' ? 0 : THREE.MathUtils.smoothstep(slope, 0.32, 0.85) * 0.43;
    tint.setRGB(1, 1, 1).lerp(rock, weight).toArray(tints, tints.length);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(tints, 3));
  geometry.computeVertexNormals();
  const terrain = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: texture, vertexColors: true, roughness: 0.96 }));
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Expose the finite survey boundary as a cutaway rather than continuing invented terrain.
  const skirt = [];
  for (const [a, b] of [[min, new THREE.Vector2(max.x, min.y)], [new THREE.Vector2(max.x, min.y), max],
    [max, new THREE.Vector2(min.x, max.y)], [new THREE.Vector2(min.x, max.y), min]]) {
    for (let i = 0; i < (columns - 1) * 3; i++) {
      const start = a.clone().lerp(b, i / ((columns - 1) * 3));
      const end = a.clone().lerp(b, (i + 1) / ((columns - 1) * 3));
      const p = [start.x, ground(start.x, start.y), start.y];
      const q = [end.x, ground(end.x, end.y), end.y];
      const r = [end.x, -19, end.y];
      const s = [start.x, -19, start.y];
      skirt.push(...p, ...q, ...r, ...p, ...r, ...s);
    }
  }
  const sides = new THREE.BufferGeometry();
  sides.setAttribute('position', new THREE.Float32BufferAttribute(skirt, 3));
  sides.computeVertexNormals();
  scene.add(new THREE.Mesh(sides, new THREE.MeshStandardMaterial({ color: '#666955', side: THREE.DoubleSide })));
  return { ground, cover, inside, min, max, width, depth, datum };
}
