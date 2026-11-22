import * as THREE from 'three';
import { canvasTexture, outline, project, seeded } from './anmin-terrain.js';

export class Surface {
  constructor() {
    this.positions = [];
    this.uv = [];
    this.colours = [];
  }

  face(points, colour, uv = points.map(p => [p[0] / 10, p[2] / 10])) {
    for (let i = 1; i < points.length - 1; i++) {
      for (const j of [0, i, i + 1]) {
        this.positions.push(...points[j]);
        this.uv.push(...uv[j]);
        this.colours.push(colour.r, colour.g, colour.b);
      }
    }
  }

  mesh(scene, material, shadow = false) {
    if (!this.positions.length) return;
    const geo = new THREE.BufferGeometry();
    for (const [key, values, size] of [['position', this.positions, 3], ['uv', this.uv, 2], ['color', this.colours, 3]]) {
      geo.setAttribute(key, new THREE.Float32BufferAttribute(values, size));
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }
}

export function instances(scene, geometry, material, items, shadows = false) {
  if (!items.length) return;
  const mesh = new THREE.InstancedMesh(geometry, material, items.length);
  const object = new THREE.Object3D();
  items.forEach(([x, y, z, w, h, d, yaw, color, tilt], i) => {
    object.position.set(x, y, z);
    object.scale.set(w, h, d);
    object.rotation.set(0, yaw || 0, tilt || 0, 'YXZ');
    object.updateMatrix();
    mesh.setMatrixAt(i, object.matrix);
    if (color) mesh.setColorAt(i, color);
  });
  mesh.castShadow = shadows;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

const box = new THREE.BoxGeometry();
const solid = new THREE.MeshStandardMaterial({ color: 'white', vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });
const plain = colour => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.87 });
const wallPalette = ['#dfd5bf', '#e4e2d9', '#cdc7b9', '#d7bda2', '#ebe5d2'];
const accentPalette = ['#788e9b', '#b39477', '#9c877d', '#7a957e', '#606e81'];
const roofPalette = ['#8b594b', '#58756a', '#66787c', '#577863'];
const namesToColours = { grey: '#a4a4a0', gray: '#a4a4a0', beige: '#d5c6a8', white: '#e8e5dc', brown: '#987c69',
  red: '#ab675c', green: '#6d8e77', blue: '#7091a4', yellow: '#d5c48f', cream: '#e3d6ab', black: '#515554',
  orange: '#c18b67', tan: '#bfa889', pink: '#c89599' };

function repeating(texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function facades() {
  return ['concrete', 'brick', 'stucco', 'apartment'].map((style, index) => {
    const random = seeded(1417 + index);
    const lit = Array.from({ length: 32 }, () => random() < 0.38);
    const windows = (g, night) => {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 4; col++) {
          const x = col * 64 + 11;
          const y = row * 32 + 8;
          const w = style === 'apartment' && col === 2 ? 19 : 42;
          if (night) {
            if (!lit[row * 4 + col]) continue;
            g.fillStyle = col % 2 ? '#ffd39a' : '#ffe4b1';
            g.fillRect(x + 2, y + 2, w - 4, 13);
            continue;
          }
          g.fillStyle = '#515c61';
          g.fillRect(x - 2, y - 1, w + 4, 19);
          const glass = g.createLinearGradient(x, y, x, y + 16);
          glass.addColorStop(0, '#556c79');
          glass.addColorStop(1, '#99a8a8');
          g.fillStyle = glass;
          g.fillRect(x, y, w, 16);
          g.fillStyle = '#e1dfd4';
          g.fillRect(x + w * 0.52, y, 2, 16);
          g.fillRect(x - 3, y + 16, w + 6, 2);
        }
      }
    };
    const day = repeating(canvasTexture(256, (g, size) => {
      g.fillStyle = style === 'brick' ? '#e0c2af' : '#efeeeb';
      g.fillRect(0, 0, size, size);
      if (style === 'apartment') {
        g.fillStyle = '#b7c2c3';
        g.fillRect(129, 0, 40, size);
      }
      if (style === 'brick') {
        g.strokeStyle = 'rgba(122,80,65,.18)';
        for (let y = 0; y < size; y += 5) {
          g.beginPath();
          g.moveTo(0, y);
          g.lineTo(size, y);
          for (let x = y % 2 ? 8 : 0; x < size; x += 16) { g.moveTo(x, y); g.lineTo(x, y + 5); }
          g.stroke();
        }
      }
      g.fillStyle = style === 'stucco' ? 'rgba(89,76,63,.12)' : 'rgba(75,77,70,.08)';
      for (let i = 0; i < 7600; i++) g.fillRect(random() * size, random() * size, 1 + random() * 2, 1);
      windows(g, false);
    }));
    const night = repeating(canvasTexture(256, (g, size) => {
      g.fillStyle = '#000';
      g.fillRect(0, 0, size, size);
      windows(g, true);
    }));
    return new THREE.MeshStandardMaterial({
      vertexColors: true, map: day, emissive: 'white', emissiveMap: night, emissiveIntensity: 0,
      roughness: 0.86, side: THREE.DoubleSide,
    });
  });
}

export function buildBuildings(scene, data, terrain, site) {
  const walls = Array.from({ length: 4 }, () => new Surface());
  const trim = new Surface();
  const roofs = new Surface();
  const tanks = [];
  const buildings = [];
  const { ground, inside } = terrain;
  const concrete = new THREE.Color('#ada695');
  const concreteRoof = new THREE.Color('#777b72');
  const metresPerTile = 18;
  const floor = 3.05;
  for (const building of data.buildings) {
    const points = outline(building.pts);
    if (points.length < 3 || !points.every(p => inside(p.x, p.y))) continue;
    if (points.every(p => site.contains(p.x, p.y))) continue;
    const area = Math.abs(THREE.ShapeUtils.area(points));
    if (area < 2) continue;
    const bounds = new THREE.Box2().setFromPoints(points);
    const center = bounds.getCenter(new THREE.Vector2());
    const random = seeded(Math.round(center.x * 101377 + center.y * 1316657));
    const apartment = building.type === 'apartments' || (!building.name && (!building.type || building.type === 'yes')
      && points.length <= 6 && area >= 250 && area < 1300);
    const given = typeof building.height === 'string' && /^\s*\d+(\.\d+)?\s*(m)?\s*$/.test(building.height)
      ? parseFloat(building.height) : 0;
    const supplied = Boolean(given || building.levels > 0);
    const height = Math.min(180, given || (building.levels > 0 ? building.levels * floor
      : apartment ? floor * (9 + Math.floor(random() * 8)) : area > 450 ? 8 + random() * 4 : 4.3 + random() * 3.7));
    const holes = (building.holes || []).map(outline).filter(ring => ring.length >= 3);
    const borders = [points, ...holes];
    const bottom = Math.min(...borders.flat().map(p => ground(p.x, p.y))) - 1.4;
    const base = Math.max(...borders.flat().map(p => ground(p.x, p.y)), ground(center.x, center.y));
    const roofY = base + height;
    const accent = new THREE.Color(accentPalette[Math.floor(random() * accentPalette.length)]);
    const specified = building.colour || '';
    const colour = new THREE.Color(namesToColours[specified] || (/^#[a-f\d]{6}$/i.test(specified) ? specified
      : wallPalette[Math.floor(random() * wallPalette.length)]));
    const type = apartment ? 3 : building.material === 'brick' ? 1
      : building.material === 'concrete' ? 0 : Math.floor(random() * 3);
    const wallsTop = apartment ? roofY - Math.min(1.4, height * 0.12) : roofY;
    const phase = Math.floor(random() * 4) / 4;
    const at = (p, y) => [p.x, y, p.y];
    const quad = (a, b, low, high) => [at(a, low), at(b, low), at(b, high), at(a, high)];
    let length = 0;
    for (const border of borders) {
      for (let i = 0; i < border.length; i++) {
        const a = border[i];
        const b = border[(i + 1) % border.length];
        const start = length / metresPerTile + phase;
        length += a.distanceTo(b);
        const end = length / metresPerTile + phase;
        trim.face(quad(a, b, bottom, base), concrete);
        const tiles = Math.max(1, Math.round(height / floor)) / 8;
        walls[type].face(quad(a, b, base, wallsTop), colour,
          [[start, phase], [end, phase], [end, tiles + phase], [start, tiles + phase]]);
        if (apartment) trim.face(quad(a, b, wallsTop, roofY), accent);
      }
    }

    const roofStyle = building.roof || (area < 195 && height < 10 ? (random() < 0.63 ? 'gabled' : 'hipped') : 'flat');
    const pitched = points.length === 4 && !holes.length && ['gabled', 'hipped', 'pyramidal'].includes(roofStyle);
    if (pitched) {
      const tile = new THREE.Color(roofPalette[Math.floor(random() * roofPalette.length)]);
      const first = points[0].distanceToSquared(points[1]) > points[1].distanceToSquared(points[2]) ? 0 : 1;
      const [a, b, c, d] = Array.from({ length: 4 }, (_, i) => points[(first + i) % 4]);
      const r = a.clone().lerp(d, 0.5);
      const s = b.clone().lerp(c, 0.5);
      const inset = roofStyle === 'pyramidal' ? 0.5 : roofStyle === 'hipped' ? 0.2 : 0;
      const ridgeA = r.clone().lerp(s, inset);
      const ridgeB = s.clone().lerp(r, inset);
      const rise = Math.min(4.8, Math.max(1.1, a.distanceTo(d) * 0.25));
      const highA = at(ridgeA, roofY + rise);
      const highB = at(ridgeB, roofY + rise);
      roofs.face([at(a, roofY), at(b, roofY), highB, highA], tile);
      roofs.face([at(c, roofY), at(d, roofY), highA, highB], tile);
      const ends = roofStyle === 'gabled' ? trim : roofs;
      const endColour = roofStyle === 'gabled' ? colour : tile;
      ends.face([at(d, roofY), at(a, roofY), highA], endColour);
      ends.face([at(b, roofY), at(c, roofY), highB], endColour);
    } else {
      const vertices = [...points, ...holes.flat()];
      for (const indices of THREE.ShapeUtils.triangulateShape(points.slice(), holes.map(ring => ring.slice()))) {
        roofs.face(indices.map(i => at(vertices[i], roofY)), apartment ? concreteRoof : new THREE.Color('#758079'));
      }
      for (let i = 0; i < points.length; i++) {
        trim.face(quad(points[i], points[(i + 1) % points.length], roofY - 0.05, roofY + 0.48), apartment ? accent : concrete);
      }
      if (points.length === 4 && area > 65 && random() < 0.33) {
        const c = points[0].clone().lerp(points[2], 0.48);
        tanks.push([c.x, roofY + 0.75, c.y, 2.15, 1.5, 2.15, 0, new THREE.Color('#55747a')]);
      }
    }
    buildings.push({ center, y: roofY, height, supplied, name: building.name, en: building.en, bounds });
  }
  const materials = facades();
  walls.forEach((batch, i) => batch.mesh(scene, materials[i], true));
  trim.mesh(scene, solid, true);
  const tile = repeating(canvasTexture(128, (g, size) => {
    const random = seeded(726);
    g.fillStyle = '#e3dfd7';
    g.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 8) {
      g.fillStyle = '#bdb7ac';
      g.fillRect(0, y, size, 1);
      for (let x = y % 16 ? -4 : 0; x < size; x += 8) {
        g.fillStyle = random() > 0.5 ? '#d4cec4' : '#ebe7df';
        g.fillRect(x, y + 1, 7, 6);
      }
    }
  }));
  roofs.mesh(scene, new THREE.MeshStandardMaterial({ map: tile, vertexColors: true, side: THREE.DoubleSide, roughness: 0.96 }), true);
  instances(scene, new THREE.CylinderGeometry(0.47, 0.5, 1, 9), plain('white'), tanks, true);
  return { materials, buildings };
}

const roadWidths = { motorway: 16, trunk: 15, primary: 13, secondary: 11, tertiary: 9,
  residential: 6.8, unclassified: 6, living_street: 5.2, service: 4.4, track: 3.1,
  footway: 2, cycleway: 2.4, pedestrian: 3, path: 1.2, steps: 1.6 };
const marked = ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified'];
const stone = new THREE.Color('#a29b88');
const asphalt = new THREE.Color('#515759');
const kerb = new THREE.Color('#b7b5ab');
const paint = new THREE.Color('#e3ca77');
const whitePaint = new THREE.Color('#e0e0d4');

function roadPoints(points) {
  const line = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const n = Math.ceil(a.distanceTo(b) / 5);
    for (let j = 1; j <= n; j++) line.push(a.clone().lerp(b, j / n));
  }
  return line;
}

export function buildStreets(scene, data, terrain, site) {
  const surface = new Surface();
  const lines = new Surface();
  const walk = new Surface();
  const { ground, inside } = terrain;
  const fixtures = [];
  const roadside = [];
  const random = seeded(462);
  function ribbon(points, batch, width, lift, colour, shift = 0, dashed = false) {
    let dist = 0;
    const pairs = points.map((p, i) => {
      const a = points[Math.max(i - 1, 0)];
      const b = points[Math.min(i + 1, points.length - 1)];
      const normal = new THREE.Vector2(a.y - b.y, b.x - a.x).normalize();
      return [shift + width / 2, shift - width / 2].map(offset => {
        const x = p.x + normal.x * offset;
        const z = p.y + normal.y * offset;
        return [x, ground(x, z) + lift, z];
      });
    });
    for (let i = 1; i < points.length; i++) {
      dist += points[i].distanceTo(points[i - 1]);
      if (!inside(points[i].x, points[i].y) || !inside(points[i - 1].x, points[i - 1].y)) continue;
      if (!dashed || dist % 15 < 7) batch.face([pairs[i - 1][1], pairs[i - 1][0], pairs[i][0], pairs[i][1]], colour);
    }
  }
  for (const road of data.roads) {
    if (road.tunnel || road.bridge || road.area || road.kind === 'construction') continue;
    const kind = road.kind.replace(/_link$/, '');
    const points = roadPoints(road.pts.map(([lat, lon]) => project(lat, lon)));
    if (points.length < 2) continue;
    const width = roadWidths[kind] || 4;
    const paved = width >= 4 && !['gravel', 'ground', 'unpaved'].includes(road.surface);
    ribbon(points, surface, width, 0.40, paved ? asphalt : stone);
    const sidewalks = paved && width >= 6 && !['motorway', 'trunk'].includes(kind) && road.sidewalk !== 'no' && road.sidewalk !== 'separate';
    if (sidewalks) {
      if (road.sidewalk !== 'right') ribbon(points, walk, 1.65, 0.48, kerb, width / 2 + 0.84);
      if (road.sidewalk !== 'left') ribbon(points, walk, 1.65, 0.48, kerb, -width / 2 - 0.84);
    }
    if (paved && marked.includes(kind) && (road.lanes >= 2 || width >= 8)) {
      ribbon(points, lines, 0.14, 0.46, paint, 0, true);
      if (width >= 9) for (const side of [-1, 1]) ribbon(points, lines, 0.11, 0.46, whitePaint, side * (width / 2 - 0.36));
    }

    if (!sidewalks || road.kind === 'service') continue;
    let next = 12 + random() * 14;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const length = a.distanceTo(b);
      if (length === 0) continue;
      if (next < length) {
        const p = a.clone().lerp(b, next / length);
        const normal = new THREE.Vector2(a.y - b.y, b.x - a.x).normalize().multiplyScalar(random() < 0.5 ? -1 : 1);
        const lamp = p.clone().addScaledVector(normal, width / 2 + 1);
        const tree = p.clone().addScaledVector(normal, width / 2 + 3.2).lerp(b, 0.12);
        if (inside(lamp.x, lamp.y)) fixtures.push([lamp, Math.atan2(normal.y, -normal.x)]);
        if (inside(tree.x, tree.y) && random() < 0.65) roadside.push(tree);
        next += 36 + random() * 20;
      }
      next -= length;
    }
  }
  for (const { pts } of data.rail) {
    const points = roadPoints(pts.map(([lat, lon]) => project(lat, lon)));
    ribbon(points, walk, 4, 0.40, stone);
    for (const shift of [-0.72, 0.72]) ribbon(points, lines, 0.14, 0.46, whitePaint, shift);
  }
  for (const place of data.places) {
    const { kind, pts } = place;
    if (kind !== 'school' || !pts || place === site.campus) continue;
    ribbon(roadPoints(pts.map(([lat, lon]) => project(lat, lon))), walk, 0.9, 0.38, new THREE.Color('#d8c589'));
  }
  const grit = repeating(canvasTexture(128, (g, size) => {
    const random = seeded(851);
    g.fillStyle = '#f7f7f7';
    g.fillRect(0, 0, size, size);
    g.fillStyle = 'rgba(32,38,36,.16)';
    for (let i = 0; i < 3700; i++) g.fillRect(random() * size, random() * size, 1, 1);
  }));
  for (const [layer, units] of [[surface, -2], [walk, -3], [lines, -4]]) {
    layer.mesh(scene, new THREE.MeshStandardMaterial({
      vertexColors: true, map: layer === surface ? grit : null, roughness: 0.97, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: units,
    }));
  }
  const poles = [];
  const lampHeads = [];
  const bulbs = [];
  const pools = [];
  const metal = plain('#424f4e');
  const light = new THREE.MeshStandardMaterial({ color: '#e3d5b4', emissive: '#ffc569', emissiveIntensity: 0 });
  for (const [p, angle] of fixtures) {
    const y = ground(p.x, p.y);
    const dx = Math.cos(angle);
    const dz = -Math.sin(angle);
    poles.push([p.x, y + 3.2, p.y, 0.19, 6.4, 0.19]);
    lampHeads.push([p.x + dx * 0.72, y + 6.36, p.y + dz * 0.72, 1.7, 0.16, 0.25, angle]);
    bulbs.push([p.x + dx * 1.38, y + 6.30, p.y + dz * 1.38, 0.47, 0.12, 0.34, angle]);
    const glowX = p.x + dx * 2.1;
    const glowZ = p.y + dz * 2.1;
    const glowY = ground(glowX, glowZ);
    if (Math.abs(ground(glowX + 3, glowZ + 3) - ground(glowX - 3, glowZ - 3)) < 0.7) {
      pools.push([glowX, glowY + 0.62, glowZ, 9.2, 1, 7.6, angle]);
    }
  }

  const fence = [];
  const fencePosts = [];
  const campusFences = data.places.filter(place => place.kind === 'school' && place.pts && place !== site.campus);
  for (const { pts, kind } of [...data.fences, ...campusFences]) {
    const points = roadPoints(pts.map(([lat, lon]) => project(lat, lon)));
    const height = kind === 'school' ? 1.12 : 1.72;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      if (!inside(a.x, a.y) || !inside(b.x, b.y)) continue;
      if (kind === 'school' && Math.abs(i - Math.floor(points.length / 2)) <= 1) continue;
      const x = (a.x + b.x) / 2;
      const z = (a.y + b.y) / 2;
      const angle = Math.atan2(a.y - b.y, b.x - a.x);
      const startY = ground(a.x, a.y);
      const endY = ground(b.x, b.y);
      const length = a.distanceTo(b);
      const tilt = Math.atan2(endY - startY, length);
      fencePosts.push([a.x, startY + height / 2, a.y, 0.14, height, 0.14]);
      for (const h of [height * 0.33, height * 0.83]) {
        fence.push([x, (startY + endY) / 2 + h, z, Math.hypot(length, endY - startY), 0.07, 0.09, angle, null, tilt]);
      }
    }
  }
  const stops = [];
  const shelter = [];
  const glass = [];
  const signs = [];
  for (const stop of data.stops) {
    const p = project(stop.lat, stop.lon);
    if (!inside(p.x, p.y)) continue;
    const y = ground(p.x, p.y);
    stops.push({ ...stop, center: p, y: y + 4.2 });
    signs.push([p.x, y + 3.5, p.y, 0.77, 0.9, 0.22]);
    poles.push([p.x, y + 1.6, p.y, 0.10, 3.2, 0.10]);
    for (const dx of [0.8, 4.55]) for (const dz of [0.15, 1.48]) {
      poles.push([p.x + dx, y + 1.27, p.y + dz, 0.12, 2.55, 0.12]);
    }
    shelter.push([p.x + 2.67, y + 2.65, p.y + 0.8, 4.25, 0.17, 1.7]);
    shelter.push([p.x + 2.67, y + 0.52, p.y + 1.29, 2.74, 0.16, 0.38]);
    glass.push([p.x + 2.67, y + 1.49, p.y + 1.49, 3.64, 1.9, 0.08]);
  }
  instances(scene, box, metal, [...lampHeads, ...shelter, ...fence, ...fencePosts]);
  instances(scene, new THREE.CylinderGeometry(0.5, 0.5, 1, 6), metal, poles);
  instances(scene, box, light, bulbs);
  const glow = new THREE.MeshBasicMaterial({
    map: canvasTexture(64, (g, size) => {
      const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'rgba(255,199,104,.8)');
      gradient.addColorStop(0.48, 'rgba(255,174,76,.24)');
      gradient.addColorStop(1, 'rgba(255,174,76,0)');
      g.fillStyle = gradient;
      g.fillRect(0, 0, size, size);
    }),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const lampPools = instances(scene, new THREE.PlaneGeometry().rotateX(-Math.PI / 2), glow, pools);
  instances(scene, box, plain('#428d8a'), signs);
  instances(scene, box, new THREE.MeshStandardMaterial({ color: '#71999d', roughness: 0.38, transparent: true, opacity: 0.52 }), glass);
  return { light, lampPools, stops, roadside };
}

export function buildTrees(scene, data, terrain, roadside, buildings, site) {
  const { ground, cover, inside, min, max } = terrain;
  const random = seeded(562793);
  const trunks = [];
  const crowns = [];
  const pines = [];
  const greens = ['#56754a', '#486b43', '#769456', '#668650', '#416346', '#819c60'].map(x => new THREE.Color(x));
  const tree = (x, z, conifer, size) => {
    const y = ground(x, z);
    const shade = greens[Math.floor(random() * greens.length)];
    const spin = random() * 6.28;
    trunks.push([x, y + size * 0.23, z, size * 0.12, size * 0.52, size * 0.12]);
    const batch = conifer ? pines : crowns;
    batch.push([x, y + size * 0.66, z, size * 0.64, size * 0.82, size * 0.65, spin, shade]);
    if (conifer) batch.push([x, y + size * 0.91, z, size * 0.50, size * 0.66, size * 0.50, spin, shade]);
  };
  for (const { lat, lon, leaf } of data.trees) {
    const p = project(lat, lon);
    if (inside(p.x, p.y)) tree(p.x, p.y, leaf === 'needleleaved', 7 + random() * 3);
  }
  const open = (x, z) => !site.contains(x, z) && !buildings.some(({ bounds }) => x > bounds.min.x - 2 && x < bounds.max.x + 2
    && z > bounds.min.y - 2 && z < bounds.max.y + 2);
  for (const { x, y: z } of roadside) {
    if (cover(x, z) !== 'water' && open(x, z)) tree(x, z, false, 4.6 + random() * 2.8);
  }
  for (let z0 = min.y + 10; z0 < max.y - 10; z0 += 24) {
    for (let x0 = min.x + 10; x0 < max.x - 10; x0 += 24) {
      const x = x0 + (random() - 0.5) * 18;
      const z = z0 + (random() - 0.5) * 18;
      const type = cover(x, z);
      if ((type === 'forest' || (type === 'park' && random() < 0.3)) && open(x, z)) {
        tree(x, z, random() < 0.36, 7 + random() * 7);
      }
    }
  }
  const canopy = plain('white');
  const trunkMesh = instances(scene, new THREE.CylinderGeometry(0.28, 0.49, 1, 5), plain('#625649'), trunks);
  const crownMesh = instances(scene, new THREE.IcosahedronGeometry(0.57, 1), canopy, crowns);
  const pineMesh = instances(scene, new THREE.ConeGeometry(0.59, 1, 6), canopy, pines);
  const vegetated = [trunkMesh, crownMesh, pineMesh].filter(Boolean);
  const crownHigh = crownMesh && crownMesh.geometry;
  const crownLow = new THREE.IcosahedronGeometry(0.57, 0);
  return high => {
    vegetated.forEach(mesh => { mesh.castShadow = high; });
    if (crownMesh) crownMesh.geometry = high ? crownHigh : crownLow;
    if (trunkMesh) trunkMesh.visible = high;
  };
}
