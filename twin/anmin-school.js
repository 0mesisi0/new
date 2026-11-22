import * as THREE from 'three';
import { Surface, instances } from './anmin-models.js';
import { canvasTexture, outline, school, seeded } from './anmin-terrain.js';

function yardTexture(bounds) {
  return canvasTexture(1024, (g, size) => {
    const random = seeded(18745);
    g.fillStyle = '#adba88';
    g.fillRect(0, 0, size, size);
    g.save();
    g.scale(size / (bounds.max.x - bounds.min.x), size / (bounds.max.y - bounds.min.y));
    g.translate(-bounds.min.x, -bounds.min.y);
    const rect = (colour, x, z, w, d) => { g.fillStyle = colour; g.fillRect(x, z, w, d); };
    rect('#c7b9a4', -59, -50, 99, 45);
    rect('#dbccaf', -46, -22, 96, 19);
    rect('#c9c1b2', 33, -19, 25, 14);
    rect('#d8c4a5', -28, -7, 71, 8);
    rect('#d6c4a7', 34, -6, 5, 77);
    rect('#e0cbaa', -37, 38, 20, 23);
    g.strokeStyle = '#b6aa94';
    g.lineWidth = 0.11;
    for (let x = -45; x < 34; x += 3) {
      g.beginPath(); g.moveTo(x, -22); g.lineTo(x, -5); g.stroke();
    }
    for (let z = -20; z < -5; z += 2.3) {
      g.beginPath(); g.moveTo(-45, z); g.lineTo(34, z); g.stroke();
    }
    // The clay infield doubles as the small-sided football pitch.
    function oval(r) {
      g.beginPath();
      g.arc(4, 20, r, Math.PI, 2 * Math.PI);
      g.arc(4, 41, r, 0, Math.PI);
      g.closePath();
    }
    oval(29); g.fillStyle = '#a74e3d'; g.fill();
    oval(23.8); g.fillStyle = '#c79465'; g.fill();
    g.save();
    g.clip();
    for (const [x, z, sx, sz] of [[-13, 30, 8, 27], [12, 25, 12, 12], [4, 8, 13, 5], [5, 54, 12, 5]]) {
      g.save(); g.translate(x, z); g.scale(sx, sz);
      const wear = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      wear.addColorStop(0, 'rgba(239,202,147,.52)'); wear.addColorStop(1, 'rgba(239,202,147,0)');
      g.fillStyle = wear; g.fillRect(-1, -1, 2, 2); g.restore();
    }
    g.restore();
    g.strokeStyle = '#fcf0da'; g.lineWidth = 0.17;
    for (const r of [24, 25.6, 27.2, 28.8]) { oval(r); g.stroke(); }
    g.beginPath(); g.moveTo(28, 23); g.lineTo(33, 23); g.stroke();
    g.strokeRect(-12, 7, 32, 47);
    g.strokeRect(-3, 7, 14, 5); g.strokeRect(-3, 49, 14, 5);
    g.beginPath(); g.moveTo(-12, 30.5); g.lineTo(20, 30.5);
    g.moveTo(8.2, 30.5); g.arc(4, 30.5, 4.2, 0, Math.PI * 2); g.stroke();

    rect('#486f63', -48, -1, 20, 31);
    rect('#b76d51', -43, 0, 10, 5);
    rect('#b76d51', -43, 24, 10, 5);
    g.strokeRect(-47, 0, 18, 29);
    g.strokeRect(-41, 0, 6, 5); g.strokeRect(-41, 24, 6, 5);
    g.beginPath(); g.moveTo(-47, 14.5); g.lineTo(-29, 14.5);
    g.moveTo(-35.5, 14.5); g.arc(-38, 14.5, 2.5, 0, Math.PI * 2);
    for (const [z, start] of [[0, 0], [29, Math.PI]]) {
      g.moveTo(-38 + 6.5 * Math.cos(start), z); g.arc(-38, z, 6.5, start, start + Math.PI);
    }
    g.stroke();
    for (let i = 0; i < 6; i++) rect(i % 2 ? '#67553c' : '#795b3c', 33.8 + 2 * (i % 3), 71 + 4 * Math.floor(i / 3), 1.2, 3);
    g.restore();
    for (let i = 0; i < 43000; i++) {
      g.fillStyle = i % 2 ? 'rgba(50,38,27,.10)' : 'rgba(255,247,215,.14)';
      g.fillRect(random() * size, random() * size, 1 + random() * 2, 1 + random());
    }
  });
}

function flagTexture(korean) {
  return canvasTexture(128, (g, size) => {
    g.scale(size / 120, size / 80);
    g.fillStyle = korean ? '#faf8f1' : '#246c71';
    g.fillRect(0, 0, 120, 80);
    if (!korean) {
      g.fillStyle = '#eed696'; g.beginPath(); g.arc(60, 31, 19, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#246c71'; g.font = 'bold 23px system-ui'; g.textAlign = 'center'; g.fillText('안', 60, 39);
      g.fillStyle = 'white'; g.font = 'bold 12px system-ui'; g.fillText(school.name, 60, 66);
      return;
    }
    g.save(); g.translate(60, 40); g.rotate(Math.atan2(2, 3));
    for (const [colour, start] of [['#cc293c', Math.PI], ['#174e9e', 0]]) {
      g.fillStyle = colour; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 20, start, start + Math.PI); g.fill();
    }
    for (const [x, colour] of [[-10, '#cc293c'], [10, '#174e9e']]) {
      g.fillStyle = colour; g.beginPath(); g.arc(x, 0, 10, 0, Math.PI * 2); g.fill();
    }
    g.restore();
    for (const [x, y, tilt, broken] of [[25, 17, -0.98, []], [95, 17, 0.98, [0, 2]], [25, 63, 0.98, [1]], [95, 63, -0.98, [0, 1, 2]]]) {
      g.save(); g.translate(x, y); g.rotate(tilt);
      g.fillStyle = '#202329';
      for (let row = 0; row < 3; row++) {
        const top = row * 5 - 7;
        if (broken.includes(row)) { g.fillRect(-10, top, 8.5, 3.4); g.fillRect(1.5, top, 8.5, 3.4); }
        else g.fillRect(-10, top, 20, 3.4);
      }
      g.restore();
    }
  });
}

export function buildSchool(scene, data, terrain, site) {
  if (!site.campus) return null;
  const y = terrain.ground(0, 0);
  const axis = site.boundary[1].clone().sub(site.boundary[0]).normalize();
  const angle = Math.atan2(axis.y, axis.x);
  const world = (x, z) => new THREE.Vector2(x * axis.x - z * axis.y, x * axis.y + z * axis.x);
  const local = p => new THREE.Vector2(p.x * axis.x + p.y * axis.y, -p.x * axis.y + p.y * axis.x);
  const xyz = (x, h, z) => { const p = world(x, z); return [p.x, y + h, p.y]; };
  const boundary = site.boundary.map(local);
  const bounds = new THREE.Box2().setFromPoints(boundary);
  const yard = new Surface();
  for (const tri of THREE.ShapeUtils.triangulateShape(boundary.slice(), [])) {
    const points = tri.map(i => boundary[i]);
    yard.face(points.map(p => xyz(p.x, 0.14, p.y)), new THREE.Color('white'), points.map(p => [
      (p.x - bounds.min.x) / (bounds.max.x - bounds.min.x), (bounds.max.y - p.y) / (bounds.max.y - bounds.min.y),
    ]));
  }
  const mappedMaterial = map => new THREE.MeshStandardMaterial({ map, roughness: 0.94, side: THREE.DoubleSide });
  const turf = yardTexture(bounds);
  turf.anisotropy = 4;
  yard.mesh(scene, mappedMaterial(turf));
  const boxes = [], windows = [], lamps = [], poles = [], crowns = [];
  const colors = new Map();
  const color = hex => {
    if (!colors.has(hex)) colors.set(hex, new THREE.Color(hex));
    return colors.get(hex);
  };
  const add = (batch, hex, x, h, z, w, height, d, yaw = 0, tilt = 0) => {
    batch.push([...xyz(x, h, z), w, height, d, -angle + yaw, color(hex), tilt]);
  };
  const box = (...args) => add(boxes, ...args);
  const pole = (...args) => add(poles, ...args);
  function beam(hex, a, b, width, depth = width) {
    const [x, h, z] = a, [u, v, w] = b;
    const flat = Math.hypot(u - x, w - z);
    box(hex, (x + u) / 2, (h + v) / 2, (z + w) / 2, Math.hypot(flat, v - h), width, depth,
      Math.atan2(z - w, u - x), Math.atan2(v - h, flat));
  }
  const ivory = '#e9d6b5', cream = '#f4e9d2', plinth = '#897f71';
  const teal = '#327675', ochre = '#ca803a', rust = '#a2503c', metal = '#354e4f';
  const white = '#e8e8db', roof = '#717d75';
  const random = seeded(68790);
  const structure = new Surface();

  function block(points) {
    const roofY = 14.4;
    for (const tri of THREE.ShapeUtils.triangulateShape(points.slice(), [])) {
      structure.face(tri.map(i => xyz(points[i].x, roofY, points[i].y)), color(roof));
    }
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      const length = a.distanceTo(b);
      if (length < 0.15) continue;
      const u = (b.x - a.x) / length, v = (b.y - a.y) / length;
      const yaw = Math.atan2(-v, u);
      const wall = (low, high, hex) => structure.face([
        xyz(a.x, low, a.y), xyz(b.x, low, b.y), xyz(b.x, high, b.y), xyz(a.x, high, a.y),
      ], color(hex));
      wall(-0.4, 0.87, plinth);
      wall(0.87, roofY, ivory);
      const midX = (a.x + b.x) / 2, midZ = (a.y + b.y) / 2;
      box(roof, midX, roofY + 0.31, midZ, length + 0.2, 0.81, 0.34, yaw);
      box(cream, midX, roofY + 0.76, midZ, length + 0.34, 0.17, 0.51, yaw);
      box(teal, midX, 12.42, midZ, length + 0.13, 0.3, 0.28, yaw);
      const count = Math.max(0, Math.floor((length - 1) / 3.4));
      for (let col = 0; col < count; col++) {
        const along = (col + 0.5) * length / count;
        const px = a.x + u * along, pz = a.y + v * along;
        for (let row = 0; row < 4; row++) {
          const entrance = v === 0 && u < 0 && Math.abs(px + 8) < 7 && Math.abs(pz + 25) < 1;
          if (entrance && row < 2) continue;
          const h = 2.25 + row * 3.22;
          const width = length / count - (u > 0 ? 0.32 : 0.61);
          box('#4d6264', px, h, pz, width + 0.16, 1.57, 0.26, yaw);
          const lit = random() < 0.28;
          const glass = lit ? windows : boxes;
          const glassColor = ['#567780', '#607e85', '#6b8586', '#739295'][Math.floor(random() * 4)];
          for (const side of [-1, 1]) {
            add(glass, glassColor, px + side * u * width / 4, h, pz + side * v * width / 4, width / 2 - 0.07, 1.29, 0.29, yaw);
          }
          box(cream, px, h - 0.84, pz, width + 0.3, 0.11, 0.53, yaw);
          box('#afc1bb', px, h + 0.42, pz, width, 0.06, 0.32, yaw);
        }
      }
    }
  }
  const footprints = data.buildings.map(building => outline(building.pts))
    .filter(points => points.length >= 3 && points.every(p => site.contains(p.x, p.y)));
  if (footprints.length) {
    for (const points of footprints) block(points.map(local));
  } else {
    block([[-54, -44], [34, -44], [34, -8], [20, -8], [20, -25], [-39, -25], [-39, -11], [-54, -11]]
      .map(([x, z]) => new THREE.Vector2(x, z)));
    for (const [x, z, accent] of [[-49, -10.8, ochre], [26, -7.8, teal]]) {
      box(accent, x, 7.6, z, 6.8, 15, 1.45);
      box(cream, x, 15.18, z, 7.2, 0.4, 1.85);
      for (let i = 0; i < 4; i++) {
        add(windows, '#628790', x, 2.35 + 3.2 * i, z + 0.77, 2.9, 1.98, 0.15);
        box(cream, x, 2.35 + 3.2 * i, z + 0.86, 0.11, 1.98, 0.10);
      }
    }
    box(teal, -8, 4.2, -22.6, 15, 0.56, 5.3);
    box(cream, -8, 4.54, -22.6, 15.3, 0.2, 5.5);
    box('#526970', -8, 2.0, -24.78, 10, 3.7, 0.27);
    for (const x of [-14.7, -1.3]) box(cream, x, 2, -20.3, 0.55, 4, 0.55);
    for (const x of [-12.8, -10.4, -8, -5.6, -3.2]) box('#bdc3ae', x, 1.9, -24.56, 0.12, 3.4, 0.2);
    for (let i = 0; i < 3; i++) box('#b8b7a4', -8, 0.18 + i * 0.11, -20.7 - i * 0.5, 14, 0.23, 6 - i);
    box(ivory, 24, 15.95, -35, 8, 3.1, 6.2);
    box(roof, 24, 17.6, -35, 8.5, 0.2, 6.7);
    box(teal, 24, 15.45, -31.84, 1.45, 2.05, 0.12);
    box('#90968b', -35, 14.69, -36, 6.4, 0.59, 4.8);
    pole('#93ada9', -35, 15.86, -36, 3.8, 1.9, 3.8);
    pole('#bacbc1', -35, 16.84, -36, 3.91, 0.15, 3.91);
    for (const x of [-23, -18, 7, 12]) box('#9ba395', x, 14.82, -37, 2.9, 0.84, 1.85);
    const sign = canvasTexture(512, (g, size) => {
      g.fillStyle = '#245357'; g.fillRect(0, 0, size, size);
      g.fillStyle = '#d9af6b'; g.fillRect(0, size - 22, size, 22);
      g.fillStyle = '#fff1ce'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.scale(1, 4.35); g.font = 'bold 70px "Malgun Gothic", sans-serif';
      g.fillText(school.name, 256, 59);
    });
    box(teal, -8, 8.69, -24.78, 14.3, 3.01, 0.26);
    panel(sign, -8, 8.69, -24.62, 13.95, 2.72);
  }

  function panel(map, x, h, z, w, height, ripple = false) {
    const geo = new THREE.PlaneGeometry(w, height, ripple ? 9 : 1, 1);
    if (ripple) {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const progress = (pos.getX(i) + w / 2) / w;
        pos.setZ(i, Math.sin(progress * 8.8) * 0.36 * progress);
        pos.setY(i, pos.getY(i) - 0.38 * progress * progress);
      }
      geo.computeVertexNormals();
    }
    const mesh = new THREE.Mesh(geo, mappedMaterial(map));
    mesh.position.set(...xyz(x, h, z));
    mesh.rotation.y = -angle;
    mesh.castShadow = ripple;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
  for (const [x, height, korean] of [[3, 11, true], [8, 9.4, false]]) {
    box(plinth, x, 0.36, -12, 1.25, 0.6, 1.25);
    pole('#c7cdbe', x, height / 2, -12, 0.14, height, 0.14);
    pole('#dab779', x, height, -12, 0.29, 0.27, 0.29);
    panel(flagTexture(korean), x + 1.59, height - 1.28, -12, 3.05, 2.02, true);
  }

  // Fence segments stop on either side of the mapped street approach.
  const gateZ = -12;
  for (let i = 0; i < boundary.length; i++) {
    const a = boundary[i], b = boundary[(i + 1) % boundary.length];
    const edge = [a, b];
    if (a.x > 40 && b.x > 40 && a.y < gateZ && b.y > gateZ) {
      const at = z => a.clone().lerp(b, (z - a.y) / (b.y - a.y));
      edge.splice(1, 0, at(gateZ - 5), at(gateZ + 5));
      for (const p of edge.slice(1, 3)) {
        box(ivory, p.x, 1.48, p.y, 1.24, 2.8, 1.24);
        box(teal, p.x, 2.97, p.y, 1.45, 0.24, 1.45);
        add(lamps, '#eddbaf', p.x, 3.17, p.y, 0.7, 0.21, 0.7);
      }
      const leaf = edge[2].x - 0.55;
      for (const h of [0.47, 1.69]) beam(teal, [leaf, h, gateZ + 4.7], [leaf, h, gateZ + 10], 0.13);
      for (let k = 0; k < 15; k++) box(teal, leaf, 1.06, gateZ + 4.7 + k * 0.37, 0.09, 1.24, 0.09);
    }
    for (let j = 0; j < edge.length - 1; j += 2) {
      const p = edge[j], q = edge[j + 1];
      beam(plinth, [p.x, 0.30, p.y], [q.x, 0.30, q.y], 0.67, 0.53);
      for (const h of [0.78, 1.57]) beam(metal, [p.x, h, p.y], [q.x, h, q.y], 0.12);
      const n = Math.ceil(p.distanceTo(q) / 1.3);
      for (let k = 0; k <= n; k++) {
        const s = p.clone().lerp(q, k / n);
        const wide = k % 3 === 0 ? 0.23 : 0.09;
        box(metal, s.x, 1.08, s.y, wide, 1.26, wide);
      }
    }
  }

  // Use the road centerline for the crossing, markings, and raised hump.
  const road = data.roads.filter(entry => entry.name === '안민로101번길')
    .map(entry => outline(entry.pts).map(local))
    .find(points => points[0].y < gateZ && points[1].y > gateZ);
  if (road) {
    const [a, b] = road;
    const roadX = z => a.x + (b.x - a.x) * (z - a.y) / (b.y - a.y);
    const markings = new Surface();
    function roadPatch(batch, hex, x, z, w, d, lift, uv, farLift = lift) {
      const verts = [[x - w / 2, z + d / 2], [x + w / 2, z + d / 2], [x + w / 2, z - d / 2], [x - w / 2, z - d / 2]];
      batch.face(verts.map(([u, v], i) => {
        const p = world(u + roadX(v), v);
        return [p.x, terrain.ground(p.x, p.y) + (i < 2 ? farLift : lift), p.y];
      }), color(hex), uv);
    }
    for (let j = -3; j <= 3; j++) roadPatch(markings, white, j * 0.87, gateZ, 0.45, 3.85, 0.51);
    for (let j = -4; j < 4; j++) {
      const hex = j % 2 ? white : '#e8b747';
      roadPatch(markings, hex, j * 0.75 + 0.35, -27.48, 0.75, 0.96, 0.44, undefined, 0.61);
      roadPatch(markings, hex, j * 0.75 + 0.35, -26.52, 0.75, 0.96, 0.61, undefined, 0.44);
    }
    for (const side of [-1, 1]) roadPatch(markings, '#efb94b', side * 3.02, -7, 0.15, 48, 0.5);
    const driveway = new Surface();
    for (let j = -4; j < 4; j++) {
      const z = gateZ + j;
      driveway.face([[44, z + 1], [roadX(z + 1) - 3.4, z + 1], [roadX(z) - 3.4, z], [44, z]].map(([u, v]) => {
        const p = world(u, v);
        return [p.x, terrain.ground(p.x, p.y) + 0.53, p.y];
      }), color('#aaa798'));
    }
    const sign = canvasTexture(256, (g, size) => {
      g.fillStyle = '#a65544'; g.fillRect(0, 0, size, size);
      g.strokeStyle = '#eac26a'; g.lineWidth = 8; g.strokeRect(8, 8, 240, 240);
      g.fillStyle = '#ffe19a'; g.font = 'bold 61px "Malgun Gothic", sans-serif'; g.textAlign = 'center';
      g.fillText('어린이', 128, 102); g.fillText('보호구역', 128, 187);
    });
    const zone = new Surface();
    roadPatch(zone, 'white', 0, 5, 5.7, 6.5, 0.52, [[0, 0], [1, 0], [1, 1], [0, 1]]);
    const roadStyle = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 1 });
    const zoneMaterial = mappedMaterial(sign);
    for (const material of [zoneMaterial, roadStyle]) {
      material.polygonOffset = true;
      material.polygonOffsetFactor = -1;
      material.polygonOffsetUnits = -6;
    }
    zone.mesh(scene, zoneMaterial);
    markings.mesh(scene, roadStyle);
    driveway.mesh(scene, roadStyle);
  }

  for (const [z, side] of [[7, -1], [54, 1]]) {
    const back = z + side * 1.35;
    for (const x of [1, 7]) {
      beam(white, [x, .14, z], [x, 2.25, z], .105);
      beam(white, [x, 2.25, z], [x, .14, back], .07);
    }
    beam(white, [1, 2.25, z], [7, 2.25, z], .105);
    for (let x = 1; x <= 7; x += .5) beam('#c8cdbb', [x, 2.23, z], [x, .2, back], .023);
    for (let t = .25; t < 1; t += .25) {
      beam('#c8cdbb', [1, 2.25 * t, back - side * t * 1.35], [7, 2.25 * t, back - side * t * 1.35], .023);
    }
  }
  for (const [z, side] of [[0.5, 1], [28.5, -1]]) {
    pole(teal, -38, 1.75, z - side * .75, .17, 3.5, .17);
    box(white, -38, 3.33, z, 1.75, 1.02, .15);
    box('#c6d2ca', -38, 3.3, z + side * .09, 1.46, .8, .06);
    for (let i = 0; i < 10; i++) {
      const t = i * Math.PI / 5, s = t + Math.PI / 5;
      beam(rust, [-38 + .235 * Math.cos(t), 2.96, z + side * .33 + .235 * Math.sin(t)],
        [-38 + .235 * Math.cos(s), 2.96, z + side * .33 + .235 * Math.sin(s)], .04);
    }
  }
  for (const [x, z] of [[-33, 45], [-32, 49], [-36, 44]]) {
    for (const dx of [-1.35, 1.35]) pole(teal, x + dx, 1.42, z, 0.16, 2.8, 0.16);
    box(ochre, x, 1.76, z, 2.9, 0.15, 1.8);
    box(rust, x, 2.94, z, 3.0, 0.24, 2.07);
  }
  for (const x of [-34, -32.6]) beam(ochre, [x, 1.78, 45.9], [x, .28, 48.6], .16, .13);
  beam(teal, [-33.3, 1.78, 45.9], [-33.3, .27, 48.6], .10, 1.48);
  for (const x of [-32, -28]) for (const z of [39.7, 41.2]) pole(teal, x, 1.35, z, .13, 2.45, .13);
  for (const z of [39.7, 41.2]) beam(teal, [-32, 2.57, z], [-28, 2.57, z], .12);
  for (let x = -32; x <= -28; x += .5) beam(ochre, [x, 2.57, 39.7], [x, 2.57, 41.2], .08);
  for (const x of [-34.5, -27.7]) {
    for (const side of [-1, 1]) beam(teal, [x, .15, 54 + side * 1.5], [x, 3.25, 54], .16);
  }
  beam(teal, [-34.5, 3.25, 54], [-27.7, 3.25, 54], .18);
  for (const x of [-32.8, -29.5]) {
    for (const dx of [-.38, .38]) beam(metal, [x + dx, 3.23, 54], [x + dx, .84, 54], .035);
    box(rust, x, .79, 54, .95, .12, .44);
  }
  for (let row = 0; row < 3; row++) {
    box('#bfb9a7', 36 + row * .64, .25 + row * .18, 26, .68, .47 + row * .36, 19);
    box(row % 2 ? teal : ochre, 36 + row * .64, .53 + row * .36, 26, .65, .14, 18.7);
  }
  for (const [x, z] of [[-29, -13], [13, -14], [-39, 34], [-24, 59], [39, 49]]) {
    box('#866046', x, .68, z, 2.65, .15, .66);
    box('#a67751', x, 1.04, z - .3, 2.65, .36, .12);
    for (const dx of [-.88, .88]) box(metal, x + dx, .43, z, .17, .58, .55);
  }
  for (let i = 0; i < 7; i++) {
    const x = 39 + i * .93;
    for (const dx of [-.28, .28]) pole(metal, x + dx, .56, -4.2, .09, .86, .09);
    box(metal, x, 1, -4.2, .63, .09, .09);
  }
  for (let i = 0; i < 6; i++) {
    const x = 34.4 + 2 * (i % 3), z = 72.5 + 4 * Math.floor(i / 3);
    for (let j = -2; j <= 2; j++) {
      add(crowns, i % 2 ? '#739343' : '#597443', x, .37, z + j * .48, .54, .37, .53);
    }
  }
  for (const [x, z, size] of [[-56, -16, 8], [-54, -4, 7], [-48, 35, 7], [-39, 48, 8], [-26, 59, 6], [-7, 65, 6],
    [40, -31, 8], [43, -21, 7], [43, 9, 6], [43, 48, 7], [36, 83, 6], [-61, -29, 7], [-27, -47, 7], [7, -48, 7]]) {
    pole('#695846', x, size * .27, z, .32, size * .53, .32);
    for (let i = 0; i < 4; i++) {
      const green = ['#567949', '#6c8b46', '#7a9951', '#4d744b'][i];
      add(crowns, green, x + Math.cos(i * 2) * size * .15, size * (.57 + i * .08),
        z + Math.sin(i * 2) * size * .14, size * .55, size * .54, size * .55, i);
    }
  }
  for (const [x, z, w, d] of [[-27, -20, 10, 2.5], [11, -20, 8, 2.5], [41, -23, 3.5, 5], [-36, 34, 6.5, 2]]) {
    box('#bdb294', x, .27, z, w, .32, d);
    box('#6c5940', x, .45, z, w - .32, .06, d - .32);
    for (let i = 0; i < 24; i++) {
      const px = x + (random() - .5) * (w - .6), pz = z + (random() - .5) * (d - .6);
      add(crowns, '#698348', px, .58, pz, .43, .38, .48);
      add(crowns, ['#d78a5e', '#ebc556', '#c67683', '#eee3bc'][i % 4], px, .8, pz, .28, .19, .28);
    }
  }
  for (const [x, z] of [[-29, -19], [13, -19], [40, -6], [40, 57], [-28, 36]]) {
    pole(metal, x, 2.48, z, .13, 4.8, .13);
    box(metal, x, 4.94, z, .8, .22, .54);
    add(lamps, '#e8d4aa', x, 4.80, z, .64, .14, .43);
  }

  const solid = new THREE.MeshStandardMaterial({ roughness: .86 });
  const glow = new THREE.MeshStandardMaterial({ emissive: '#ffc478', emissiveIntensity: 0, roughness: .65 });
  structure.mesh(scene, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: .88 }), true);
  const cube = new THREE.BoxGeometry();
  instances(scene, cube, solid, boxes, true);
  instances(scene, cube, glow, [...windows, ...lamps]);
  instances(scene, new THREE.CylinderGeometry(.5, .5, 1, 8), solid, poles, true);
  instances(scene, new THREE.IcosahedronGeometry(.61, 0), solid, crowns, true);
  const pools = new THREE.MeshBasicMaterial({
    map: canvasTexture(64, (g, size) => {
      const mid = size / 2, light = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
      light.addColorStop(0, 'rgba(255,190,98,.85)'); light.addColorStop(1, 'rgba(255,190,98,0)');
      g.fillStyle = light; g.fillRect(0, 0, size, size);
    }),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const poolMesh = instances(scene, new THREE.PlaneGeometry().rotateX(-Math.PI / 2), pools,
    [[-29, -18], [13, -18], [40, -6], [40, 57], [-28, 36], [-8, -19]].map(([x, z]) => [...xyz(x, .55, z), 10, 1, 8]));
  return {
    center: world(-1, 16), label: world(22, 74),
    night(amount) {
      glow.emissiveIntensity = amount * 1.2;
      poolMesh.visible = amount > .04;
      pools.opacity = amount * .66;
    },
  };
}
