import * as THREE from 'three';
import { Surface, instances } from './anmin-models.js';
import { canvasTexture, school, seeded } from './anmin-terrain.js';

// Layout follows the satellite picture the owner shared: multipurpose hall in the north-west, kindergarten and main
// school blocks on the west side, a plain sand playground in the middle, a pink-roofed hall and a white block to the south.
// Positions are metres east / north of the map centre; scene z points south.
const YARD = [[27, 45], [63, 16], [39, -36], [-1, -12]];
const scene2 = ([e, n]) => new THREE.Vector2(e, -n);

function sandTexture(bounds) {
  return canvasTexture(1024, (g, size) => {
    const random = seeded(18745);
    g.fillStyle = '#cdb88f';
    g.fillRect(0, 0, size, size);
    const sx = size / (bounds.max.x - bounds.min.x), sz = size / (bounds.max.y - bounds.min.y);
    for (let i = 0; i < 70; i++) {
      const x = random() * size, y = random() * size, r = 30 + random() * 120;
      const patch = g.createRadialGradient(x, y, 0, x, y, r);
      const tone = random() < .5 ? '224,205,165' : '176,155,120';
      patch.addColorStop(0, `rgba(${tone},.38)`); patch.addColorStop(1, `rgba(${tone},0)`);
      g.fillStyle = patch; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // A faint painted outline just inside the yard edge.
    const pts = YARD.map(p => { const q = scene2(p); return [(q.x - bounds.min.x) * sx, (q.y - bounds.min.y) * sz]; });
    const cx = pts.reduce((s, p) => s + p[0] / pts.length, 0), cy = pts.reduce((s, p) => s + p[1] / pts.length, 0);
    g.strokeStyle = 'rgba(250,243,225,.55)'; g.lineWidth = 2.2;
    g.beginPath();
    pts.forEach(([x, y], i) => {
      const px = x + (cx - x) * .1, py = y + (cy - y) * .1;
      if (i) g.lineTo(px, py); else g.moveTo(px, py);
    });
    g.closePath(); g.stroke();
    for (let i = 0; i < 52000; i++) {
      g.fillStyle = i % 2 ? 'rgba(74,58,38,.10)' : 'rgba(255,248,226,.16)';
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
  const random = seeded(68790);
  const colors = new Map();
  const color = hex => { if (!colors.has(hex)) colors.set(hex, new THREE.Color(hex)); return colors.get(hex); };
  const boxes = [], windows = [], lamps = [], poles = [], crowns = [];
  const deg = d => d * Math.PI / 180;
  // local (u along the building, v across) -> scene x, z for a building centred at (e, n) heading psi (counter-clockwise from east)
  const at = (e, n, psi, u, v) => [e + u * Math.cos(psi) + v * Math.sin(psi), -n - u * Math.sin(psi) + v * Math.cos(psi)];
  const box = (hex, x, h, z, w, height, d, yaw = 0, tilt = 0) => boxes.push([x, y + h, z, w, height, d, yaw, color(hex), tilt]);
  const pole = (hex, x, h, z, w, height, d) => poles.push([x, y + h, z, w, height, d, 0, color(hex)]);
  const lampAt = (e, n) => {
    const x = e, z = -n;
    pole('#3d4e4f', x, 2.48, z, .13, 4.8, .13);
    box('#3d4e4f', x, 4.94, z, .8, .22, .54);
    lamps.push([x, y + 4.8, z, .64, .14, .43, 0, color('#e8d4aa')]);
  };

  // Ground: pale paved campus with the sand playground on top.
  const ground = new Surface();
  const campusPoints = site.boundary.slice();
  for (const tri of THREE.ShapeUtils.triangulateShape(campusPoints.slice(), [])) {
    ground.face(tri.map(i => [campusPoints[i].x, y + .12, campusPoints[i].y]), color('#bdb7a6'));
  }
  const yard = new Surface();
  const yardPts = YARD.map(scene2);
  const yb = new THREE.Box2().setFromPoints(yardPts);
  for (const tri of THREE.ShapeUtils.triangulateShape(yardPts.slice(), [])) {
    const p = tri.map(i => yardPts[i]);
    yard.face(p.map(q => [q.x, y + .17, q.y]), new THREE.Color('white'),
      p.map(q => [(q.x - yb.min.x) / (yb.max.x - yb.min.x), (yb.max.y - q.y) / (yb.max.y - yb.min.y)]));
  }
  const sand = sandTexture(yb);
  sand.anisotropy = 4;
  const flatStyle = { side: THREE.DoubleSide, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1 };
  ground.mesh(scene, new THREE.MeshStandardMaterial({ vertexColors: true, ...flatStyle, polygonOffsetUnits: -4 }));
  yard.mesh(scene, new THREE.MeshStandardMaterial({ map: sand, ...flatStyle, polygonOffsetUnits: -8 }));

  // A building = walls, windows on both long sides, parapet and trim.
  function building({ e, n, w, d, floors, psi, wall = '#ece4d2', roofHex = '#7d8a84', trim = '#c9d3cf', accent = '#3d7f86' }) {
    const h = floors * 3.3 + .6, a = deg(psi);
    const [cx, cz] = at(e, n, a, 0, 0);
    box(wall, cx, h / 2 - .3, cz, w, h, d, a);
    box(roofHex, cx, h + .1, cz, w + .5, .35, d + .5, a);
    box(trim, cx, h + .42, cz, w + .8, .16, d + .8, a);
    box(accent, cx, h - 1.2, cz, w + .1, .4, d + .1, a);
    const cols = Math.max(2, Math.floor(w / 3.1)), step = w / cols;
    for (let f = 0; f < floors; f++) {
      const hh = 1.9 + f * 3.3;
      for (let c = 0; c < cols; c++) {
        for (const side of [-1, 1]) {
          const [x, z] = at(e, n, a, -w / 2 + step * (c + .5), side * (d / 2 + .06));
          const lit = random() < .3;
          (lit ? windows : boxes).push([x, y + hh, z, step * .62, 1.4, .22, a,
            color(['#58808a', '#648790', '#6f8f94', '#7a9a9c'][Math.floor(random() * 4)]), 0]);
          box(trim, x, hh - .85, z, step * .72, .1, .4, a);
        }
      }
    }
    return { h, a };
  }
  building({ e: -7, n: 45, w: 30, d: 24, floors: 3, psi: -39, wall: '#f1eee4', roofHex: '#8c948d', accent: '#8aa5b4' }); // multipurpose hall
  const kg = building({ e: -31, n: 14, w: 32, d: 11, floors: 3, psi: 65, wall: '#eee8da', roofHex: '#9aa39c', accent: '#5aa0c8' }); // kindergarten
  for (let i = 0; i < 10; i++) {
    for (const row of [-1.7, 1.7]) {
      const [x, z] = at(-31, 14, kg.a, -13 + i * 2.9, row);
      boxes.push([x, y + kg.h + .9, z, 2.5, .08, 2.2, kg.a, color('#2f4a78'), row < 0 ? .45 : -.45]); // rooftop solar panels
    }
  }
  const main = building({ e: -33, n: -25, w: 36, d: 13.5, floors: 4, psi: 65, wall: '#e9ddc1', roofHex: '#8a9188', accent: '#c38a3d' });
  building({ e: 3, n: -43, w: 22, d: 20, floors: 2, psi: 65, wall: '#efe9dd', roofHex: '#d89aa0', trim: '#f3d6d6', accent: '#d27f8a' }); // pink-roof hall
  building({ e: -14, n: -68, w: 28, d: 16, floors: 3, psi: 65, wall: '#f3f1ea', roofHex: '#aeb4ad', accent: '#8e9aa2' }); // white block

  // Name sign on the playground side of the main building.
  const signTex = canvasTexture(512, (g, size) => {
    g.fillStyle = '#245357'; g.fillRect(0, 0, size, size);
    g.fillStyle = '#fff1ce'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.scale(1, 5); g.font = 'bold 64px "Malgun Gothic", sans-serif'; g.fillText(school.name, 256, 51);
  });
  const [px, pz] = at(-33, -25, main.a, 0, 7.4);
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(10.6, 1.8), new THREE.MeshStandardMaterial({ map: signTex, roughness: .8 }));
  signMesh.position.set(px, y + 11.2, pz);
  signMesh.lookAt(px + Math.sin(main.a) * 5, y + 11.2, pz + Math.cos(main.a) * 5);
  scene.add(signMesh);

  // Coloured roof stands along the south-east edge of the playground.
  const edge = [[10, -19], [37, -33]];
  const dirE = edge[1][0] - edge[0][0], dirN = edge[1][1] - edge[0][1], len = Math.hypot(dirE, dirN), ang = Math.atan2(dirN, dirE);
  ['#d9798b', '#5e92d4', '#e6bf4a', '#e58f53', '#69b384', '#d9798b', '#5e92d4', '#e6bf4a'].forEach((hex, i, all) => {
    const t = (i + .5) / all.length;
    const e = edge[0][0] + dirE * t + 2.2 * Math.sin(ang), n = edge[0][1] + dirN * t - 2.2 * Math.cos(ang);
    box(hex, e, 2.45, -n, len / all.length - .25, .16, 3.1, ang);
    box('#e9e5d6', e, 1.2, -n, len / all.length - .35, 2.2, .12, ang);
  });
  // Football goals at both ends of the yard and flagpoles beside the main building.
  for (const [ge, gn] of [[16, 29], [44, -6]]) {
    const a = deg(-39);
    for (const k of [-1, 1]) { const [qx, qz] = at(ge, gn, a, k * 3.6, 0); pole('#f3f3ee', qx, 1.2, qz, .12, 2.4, .12); }
    const [x, z] = at(ge, gn, a, 0, 0);
    box('#f3f3ee', x, 2.4, z, 7.4, .12, .12, a);
  }
  for (const [fe, fn, korean, hh] of [[-19, -12, true, 11], [-15.5, -7, false, 9.4]]) {
    const x = fe, z = -fn;
    box('#8a8272', x, .36, z, 1.25, .6, 1.25);
    pole('#c7cdbe', x, hh / 2, z, .14, hh, .14);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.05, 2.02, 9, 1),
      new THREE.MeshStandardMaterial({ map: flagTexture(korean), roughness: .9, side: THREE.DoubleSide }));
    const pos = flag.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin((pos.getX(i) + 1.525) / 3.05 * 8.8) * .36 * (pos.getX(i) + 1.525) / 3.05);
    flag.geometry.computeVertexNormals();
    flag.position.set(x + 1.59, y + hh - 1.28, z);
    flag.castShadow = true;
    scene.add(flag);
  }

  // Perimeter fence along the campus boundary, with a gate gap on the south-east side.
  const bp = site.boundary;
  const gateT = .3;
  for (let i = 0; i < bp.length; i++) {
    const a = bp[i], b = bp[(i + 1) % bp.length];
    const n = Math.ceil(a.distanceTo(b) / 1.4);
    for (let k = 0; k < n; k++) {
      if (i === 1 && k / n > gateT - .05 && k / n < gateT + .05) continue;
      const p = a.clone().lerp(b, k / n), q = a.clone().lerp(b, (k + 1) / n);
      box('#3b4f50', p.x, .78, p.y, .1, 1.5, .1);
      box('#3b4f50', (p.x + q.x) / 2, 1.2, (p.y + q.y) / 2, p.distanceTo(q), .08, .08, -Math.atan2(q.y - p.y, q.x - p.x));
    }
  }
  for (const s of [-1, 1]) {
    const g = bp[1].clone().lerp(bp[2], gateT + s * .05);
    box('#d9cfb4', g.x, 1.5, g.y, 1.1, 3, 1.1);
    lamps.push([g.x, y + 3.15, g.y, .6, .2, .6, 0, color('#eddbaf')]);
  }

  // Trees and lamps.
  for (const [e, n, size] of [[-52, 40, 8], [-46, 62, 7], [-56, 6, 8], [-48, -48, 7], [-44, -80, 8], [30, -50, 8], [52, -22, 7],
    [60, -4, 7], [-20, 30, 6], [-18, 60, 7], [10, 62, 6], [48, 36, 6], [22, -62, 7], [4, -88, 7], [58, 22, 6], [-26, 5, 5], [14, -4, 5]]) {
    const x = e, z = -n;
    pole('#695846', x, size * .27, z, .32, size * .53, .32);
    for (let i = 0; i < 4; i++) {
      const green = ['#567949', '#6c8b46', '#7a9951', '#4d744b'][i];
      crowns.push([x + Math.cos(i * 2) * size * .15, y + size * (.57 + i * .08), z + Math.sin(i * 2) * size * .14,
        size * .55, size * .54, size * .55, i, color(green)]);
    }
  }
  for (const [e, n] of [[-12, 22], [-8, -6], [20, -12], [30, 40], [-18, -50], [10, -30]]) lampAt(e, n);
  // Parked cars beside the south blocks.
  ['#f4f4f2', '#3a3f44', '#aeb5ba', '#f4f4f2', '#7b8892', '#2b3b52', '#f4f4f2'].forEach((hex, i) => {
    box(hex, 24, .75, -(-52 - i * 3.2), 1.7, 1.2, 4.2, deg(65));
  });

  const solid = new THREE.MeshStandardMaterial({ roughness: .86 });
  const glow = new THREE.MeshStandardMaterial({ emissive: '#ffc478', emissiveIntensity: 0, roughness: .65 });
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
    [[-12, -22], [-8, 6], [20, 12], [30, -40], [-18, 50], [10, 30]].map(([x, z]) => [x, y + .55, z, 10, 1, 8]));
  return {
    center: new THREE.Vector2(14, -2), label: new THREE.Vector2(46, 48),
    night(amount) {
      glow.emissiveIntensity = amount * 1.2;
      if (poolMesh) poolMesh.visible = amount > .04;
      pools.opacity = amount * .66;
    },
  };
}
