import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const viewport = document.querySelector('#viewport');
const status = document.querySelector('#status');
const panel = document.querySelector('#building');
const nameLabel = document.querySelector('#building-name');
const heightLabel = document.querySelector('#building-height');
const time = document.querySelector('#time');
const clock = document.querySelector('#clock');
const liveTime = document.querySelector('#live-time');
const weatherStatus = document.querySelector('#weather-status');
const resetView = document.querySelector('#reset-view');
const selectionStatus = document.querySelector('#selection-status');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const params = new URLSearchParams(location.search);
const attribution = '© OpenStreetMap contributors (ODbL)';
const copy = {
  ko: {
    title: '대원동 3D 트윈',
    help: '드래그로 회전 · 휠 또는 두 손가락으로 확대·축소 · 방향키로 이동',
    keys: '방향키로 이동, Shift와 방향키로 회전, +와 −로 확대·축소, Enter로 중앙의 장소 선택, Esc로 선택 해제',
    reset: '처음 시점',
    map: '대원동 3D 지도',
    loading: '지도를 불러오는 중…',
    unavailable: '지도를 열 수 없어요. 브라우저의 WebGL 지원을 확인해 주세요.',
    selection: '선택한 장소 정보',
    cleared: '선택 해제',
    weather: '날씨',
    sunny: '맑음',
    cloudy: '흐림',
    rain: '비',
    liveTime: '서울 현재 시각',
    time: '시각',
    unnamedStop: '이름 없는 정류장',
    unnamedBuilding: '이름 없는 건물',
    suppliedHeight: '원본 높이 (실측 여부 미상)',
    estimatedHeight: '추정 높이',
    height: '높이',
    attribution,
  },
  en: {
    title: 'Daewon-dong 3D Twin',
    help: 'Drag to orbit · Scroll or pinch to zoom · Arrow keys to pan',
    keys: 'Arrow keys to pan, Shift and arrow keys to orbit, + and − to zoom, Enter to select a place at the center, Esc to clear the selection',
    reset: 'Reset view',
    map: '3D map of Daewon-dong',
    loading: 'Loading the map…',
    unavailable: 'Unable to open the map. Check your browser’s WebGL support.',
    selection: 'Selected place details',
    cleared: 'Selection cleared',
    weather: 'Weather',
    sunny: 'Sunny',
    cloudy: 'Cloudy',
    rain: 'Rain',
    liveTime: 'Seoul live time',
    time: 'Time',
    unnamedStop: 'Unnamed bus stop',
    unnamedBuilding: 'Unnamed building',
    suppliedHeight: 'Source height (measurement unverified)',
    estimatedHeight: 'Estimated height',
    height: 'Height',
    attribution,
  },
};

let lang = 'ko';
let area;
if (typeof ITEM !== 'undefined' && ITEM) {
  const requested = params.get('lang');
  lang = requested === 'ko' || requested === 'en'
    ? requested
    : navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  document.documentElement.lang = lang;
  document.title = copy[lang].title;
  for (const element of document.querySelectorAll('[data-copy]')) {
    element.textContent = copy[lang][element.dataset.copy];
  }
  for (const element of document.querySelectorAll('[data-label]')) {
    element.setAttribute('aria-label', copy[lang][element.dataset.label]);
  }
  area = ITEM_AREA;
} else {
  const response = await fetch('./data/area.json');
  if (!response.ok) throw new Error(`Map data: HTTP ${response.status}`);
  area = await response.json();
}
const labels = copy[lang];
const [south, west, north, east] = area.bbox;
const features = key => Array.isArray(area[key]) ? area[key].filter(Boolean) : [];
const midLat = (south + north) / 2;
const midLon = (west + east) / 2;
const metresPerDegree = Math.PI * 6371000 / 180;
const eastScale = metresPerDegree * Math.cos(THREE.MathUtils.degToRad(midLat));
const halfWidth = (east - west) * eastScale / 2;
const halfDepth = (north - south) * metresPerDegree / 2;
const span = Math.max(halfWidth, halfDepth) * 2;
const bounds = new THREE.Box2(
  new THREE.Vector2(-halfWidth, -halfDepth),
  new THREE.Vector2(halfWidth, halfDepth),
);

const scene = new THREE.Scene();
scene.background = new THREE.Color();
scene.fog = new THREE.FogExp2(0x000000, 0.17 / span);
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} catch (error) {
  if (typeof ITEM !== 'undefined' && ITEM) status.textContent = labels.unavailable;
  throw error;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
const canvas = renderer.domElement;
canvas.setAttribute('aria-label', labels.map);
viewport.append(canvas);

const camera = new THREE.PerspectiveCamera(45, 1, 1, span * 12);
const viewDirection = new THREE.Vector3(0.65, 1.15, 1).normalize();
camera.position.copy(viewDirection).multiplyScalar(span * 1.5);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = !reducedMotion.matches;
controls.screenSpacePanning = false;
controls.minDistance = 45;
controls.maxDistance = span * 6;
controls.maxPolarAngle = Math.PI / 2 - 0.08;
if (typeof ITEM !== 'undefined' && ITEM) {
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'application');
  canvas.setAttribute('aria-describedby', 'map-keys');
  controls.listenToKeyEvents(canvas);
}
controls.update();

// Facade textures: 4x4 windows per tile (24 m x 12.8 m in the extrude UV space, which is in metres). `lit` shows at night.
const wallMaterials = [];
const facade = (() => {
  const make = (draw) => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    draw(c.getContext('2d'));
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1 / 24, 1 / 12.8);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };
  let n = 7; const rnd = () => ((n = (n * 16807) % 2147483647) / 2147483647); // fixed seed: same lit windows every load
  const lit = [];
  for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) lit.push(rnd() < 0.55);
  const cell = (g, q, r) => g.fillRect(q * 32 + 7, r * 32 + 8, 18, 16);
  return {
    day: make((g) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, 128, 128); g.fillStyle = '#7f95a6'; for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) cell(g, q, r); }),
    lit: make((g) => { g.fillStyle = '#000'; g.fillRect(0, 0, 128, 128); g.fillStyle = '#ffd27a'; lit.forEach((on, i) => on && cell(g, i % 4, Math.floor(i / 4))); }),
  };
})();

const hemisphere = new THREE.HemisphereLight(0xe4f2ff, 0x7e8275, 1.35);
const sun = new THREE.DirectionalLight(0xffe3bc, 2);
sun.castShadow = true;
const shadowResolution = matchMedia('(any-pointer: coarse)').matches ? 1024 : 2048;
sun.shadow.mapSize.set(shadowResolution, shadowResolution);
const shadowSize = span * 0.9;
Object.assign(sun.shadow.camera, {
  left: -shadowSize,
  right: shadowSize,
  top: shadowSize,
  bottom: -shadowSize,
  far: span * 5,
});
sun.shadow.camera.updateProjectionMatrix();
sun.shadow.bias = -0.00015;
sun.shadow.normalBias = 0.6;
scene.add(hemisphere, sun);

function project(points) {
  const projected = [];
  if (!Array.isArray(points)) return projected;
  for (const pair of points) {
    if (!Array.isArray(pair)) continue;
    const [lat, lon] = pair;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const point = new THREE.Vector2((lon - midLon) * eastScale, (midLat - lat) * metresPerDegree);
    if (projected.at(-1)?.distanceToSquared(point) < 0.0001) continue;
    projected.push(point);
  }
  return projected;
}

function footprint(pts) {
  const points = project(pts);
  if (points.length > 1 && points[0].distanceToSquared(points.at(-1)) < 0.0001) points.pop();
  return points;
}

// Shape y maps to negative world z when rotated flat.
function shapeFor(points) {
  const outline = points.map(({ x, y }) => new THREE.Vector2(x, -y));
  if (!THREE.ShapeUtils.isClockWise(outline)) outline.reverse();
  return new THREE.Shape(outline);
}

function footprintSeed(points) {
  const key = points.map(point => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).sort().join(';');
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) hash = Math.imul(hash ^ key.charCodeAt(i), 16777619);
  return (hash >>> 0) / 4294967295;
}

function apartmentCandidate({ points, size }) {
  if (points.length !== 4 || size < 140 || size > 1000) return;
  const edges = points.map((point, i) => points[(i + 1) % 4].clone().sub(point));
  if (edges.some((edge, i) => Math.abs(edge.clone().normalize().dot(edges[(i + 1) % 4].clone().normalize())) > 0.18)) return;
  const lengths = edges.map(edge => edge.length());
  return {
    size,
    aspect: Math.max(...lengths) / Math.min(...lengths),
    center: points[0].clone().lerp(points[2], 0.5),
  };
}

const footprints = features('buildings').map(({ pts, h, name }) => {
  const points = footprint(pts);
  return { points, size: Math.abs(THREE.ShapeUtils.area(points)), h, name };
}).filter(({ points, size }) => points.length >= 3 && size >= 0.1);
const candidates = footprints.map(apartmentCandidate);
const rectangles = candidates.filter(Boolean);
const buildings = [];
const roofEdges = [];
for (const [i, { points, size, h, name }] of footprints.entries()) {
  const seed = footprintSeed(points);
  const supplied = Number.isFinite(h) && h > 0;
  let height = h;
  if (!supplied) {
    const candidate = candidates[i];
    const clustered = candidate && rectangles.filter(other =>
      Math.abs(other.size - size) <= Math.min(other.size, size) * 0.25
      && Math.abs(other.aspect - candidate.aspect) <= Math.min(other.aspect, candidate.aspect) * 0.25
      && other.center.distanceToSquared(candidate.center) <= 110 ** 2,
    ).length >= 3;
    height = clustered ? 30 + seed * 15 : (size >= 600 ? 6 : 9) + seed * 6;
  }
  const geometry = new THREE.ExtrudeGeometry(shapeFor(points), { depth: height, bevelEnabled: false });
  geometry.rotateX(-Math.PI / 2);
  geometry.computeBoundingBox();
  const color = new THREE.Color(0xa5b6b5).lerp(new THREE.Color(0xe0d1b4), seed);
  const roof = new THREE.MeshStandardMaterial({ color: color.clone().multiplyScalar(0.78), roughness: 0.92 });
  const wall = new THREE.MeshStandardMaterial({ color, roughness: 0.8, map: facade.day, emissive: 0xffffff, emissiveMap: facade.lit, emissiveIntensity: 0 });
  wallMaterials.push(wall);
  const mesh = new THREE.Mesh(geometry, [roof, wall]); // ExtrudeGeometry groups: 0 = top/bottom caps, 1 = side walls
  mesh.userData = { name, height, supplied };
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  buildings.push(mesh);
  scene.add(mesh);
  for (const [index, point] of points.entries()) {
    const next = points[(index + 1) % points.length];
    roofEdges.push(point.x, height + 0.12, point.y, next.x, height + 0.12, next.y);
    bounds.expandByPoint(point);
  }
}
const roofEdgeGeometry = new THREE.BufferGeometry();
roofEdgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roofEdges, 3));
scene.add(new THREE.LineSegments(roofEdgeGeometry, new THREE.LineBasicMaterial({
  color: 0x42575d, transparent: true, opacity: 0.38, depthWrite: false,
})));

for (const [layer, color, elevation, offset] of [
  ['green', 0x80b58a, 0.08, -1],
  ['water', 0x568eb8, 0.16, -2],
]) {
  const material = new THREE.MeshStandardMaterial({
    color, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: offset,
  });
  for (const { pts } of features(layer)) {
    const points = footprint(pts);
    if (points.length < 3 || Math.abs(THREE.ShapeUtils.area(points)) < 0.1) continue;
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shapeFor(points)), material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = elevation;
    mesh.receiveShadow = true;
    scene.add(mesh);
    for (const point of points) bounds.expandByPoint(point);
  }
}

const stopSigns = [];
const poleGeometry = new THREE.CylinderGeometry(0.17, 0.17, 4, 8);
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x405360 });
const signGeometry = new THREE.BoxGeometry(2.4, 1.5, 1.2);
const signMaterial = new THREE.MeshStandardMaterial({ color: 0xffc354, emissive: 0x755016 });
for (const { lat, lon, name } of features('stops')) {
  const [point] = project([[lat, lon]]);
  if (!point) continue;
  const sign = new THREE.Mesh(signGeometry, signMaterial);
  sign.position.set(point.x, 4, point.y);
  sign.userData = { name, stop: true };
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = -2;
  sign.add(pole);
  stopSigns.push(sign);
  scene.add(sign);
  bounds.expandByPoint(point);
}

const roadWidths = { motorway: 14, trunk: 14, primary: 11, secondary: 9, footway: 2, path: 2 };
const roadVertices = [];
const roadIndices = [];
for (const { pts, kind } of features('roads')) {
  const points = project(pts);
  if (points.length < 2) continue;
  const halfWidth = (roadWidths[typeof kind === 'string' ? kind.replace(/_link$/, '') : ''] ?? 6) / 2;
  const normals = points.slice(1).map((point, i) =>
    new THREE.Vector2(points[i].y - point.y, point.x - points[i].x).normalize(),
  );
  const base = roadVertices.length / 3;
  for (let i = 0; i < points.length; i++) {
    const before = normals[Math.max(0, i - 1)];
    const after = normals[Math.min(i, normals.length - 1)];
    const join = before.clone().add(after);
    if (join.lengthSq() < 0.0001) join.copy(after);
    join.normalize().multiplyScalar(halfWidth / Math.max(0.5, join.dot(after)));
    const { x, y: z } = points[i];
    roadVertices.push(x + join.x, 0.24, z + join.y, x - join.x, 0.24, z - join.y);
    if (i > 0) {
      const j = base + i * 2;
      roadIndices.push(j - 2, j, j - 1, j - 1, j, j + 1);
    }
    bounds.expandByPoint(points[i]);
  }
}
const roadGeometry = new THREE.BufferGeometry();
roadGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roadVertices, 3));
roadGeometry.setIndex(roadIndices);
roadGeometry.computeVertexNormals();
const roads = new THREE.Mesh(roadGeometry, new THREE.MeshStandardMaterial({
  color: 0x606e71,
  side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: -1,
  polygonOffsetUnits: -3,
}));
roads.receiveShadow = true;
scene.add(roads);

bounds.expandByScalar(span * 0.06);
const groundSize = bounds.getSize(new THREE.Vector2());
const groundCenter = bounds.getCenter(new THREE.Vector2());
// Keep the mapped area opaque and fade the surrounding terrain into the sky.
const groundGeometry = new THREE.PlaneGeometry(1, 1, 3, 3);
const groundPositions = groundGeometry.getAttribute('position');
const groundColors = [];
const feather = span * 0.4;
for (let i = 0; i < groundPositions.count; i++) {
  const x = i % 4;
  const y = Math.floor(i / 4);
  const outerX = x === 0 || x === 3;
  const outerY = y === 0 || y === 3;
  groundPositions.setXY(i,
    (x < 2 ? -1 : 1) * (groundSize.x / 2 + (outerX ? feather : 0)),
    (y < 2 ? 1 : -1) * (groundSize.y / 2 + (outerY ? feather : 0)),
  );
  groundColors.push(1, 1, 1, outerX || outerY ? 0 : 1);
}
groundGeometry.setAttribute('color', new THREE.Float32BufferAttribute(groundColors, 4));
const ground = new THREE.Mesh(
  groundGeometry,
  new THREE.MeshStandardMaterial({ color: 0x9cae9b, vertexColors: true, transparent: true }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.set(groundCenter.x, 0, groundCenter.y);
ground.receiveShadow = true;
scene.add(ground);

let dirty = true;
controls.addEventListener('change', () => { dirty = true; });

let fitDistance;
function resize() {
  const { clientWidth: width, clientHeight: height } = viewport;
  if (!width || !height) return;
  camera.aspect = width / height;
  const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const horizontal = vertical * camera.aspect;
  const right = new THREE.Vector3(viewDirection.z, 0, -viewDirection.x).normalize();
  const up = new THREE.Vector3().crossVectors(viewDirection, right);
  let distance = 0;
  for (const x of [-halfWidth, halfWidth]) {
    for (const z of [-halfDepth, halfDepth]) {
      const corner = new THREE.Vector3(x, 0, z);
      const fit = Math.max(Math.abs(corner.dot(right)) / horizontal, Math.abs(corner.dot(up)) / vertical);
      distance = Math.max(distance, corner.dot(viewDirection) + fit * 1.12);
    }
  }
  const offset = camera.position.clone().sub(controls.target);
  const zoom = fitDistance ? offset.length() / fitDistance : 1;
  fitDistance = distance;
  const nextDistance = THREE.MathUtils.clamp(fitDistance * zoom, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(offset.setLength(nextDistance));
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  dirty = true;
}
new ResizeObserver(resize).observe(viewport);
resize();

const homeOrbit = new THREE.Spherical().setFromVector3(viewDirection);
const cameraOffset = new THREE.Vector3();
let flight;
function advanceFlight(seconds) {
  flight.elapsed += seconds;
  const progress = THREE.MathUtils.smoothstep(flight.elapsed, 0, flight.duration);
  controls.target.copy(flight.target).multiplyScalar(1 - progress);
  cameraOffset.setFromSphericalCoords(
    THREE.MathUtils.lerp(flight.zoom, 1, progress) * fitDistance,
    THREE.MathUtils.lerp(flight.phi, homeOrbit.phi, progress),
    homeOrbit.theta + flight.yawOffset * (1 - progress),
  );
  camera.position.copy(controls.target).add(cameraOffset);
  if (progress === 1) flight = undefined;
  dirty = true;
}
function flyHome(duration) {
  // Consume any leftover OrbitControls inertia before taking over the camera.
  controls.enableDamping = false;
  controls.update();
  controls.enableDamping = !reducedMotion.matches;
  const orbit = new THREE.Spherical().setFromVector3(cameraOffset.copy(camera.position).sub(controls.target));
  flight = {
    target: controls.target.clone(),
    zoom: orbit.radius / fitDistance,
    phi: orbit.phi,
    yawOffset: THREE.MathUtils.euclideanModulo(orbit.theta - homeOrbit.theta + Math.PI, Math.PI * 2) - Math.PI,
    elapsed: 0,
    duration,
  };
  if (reducedMotion.matches) advanceFlight(duration);
}
if (typeof ITEM !== 'undefined' && ITEM) {
  controls.addEventListener('start', () => { flight = undefined; });
  resetView.addEventListener('click', () => {
    showFeature(selected);
    flyHome(0.55);
  });
  if (!reducedMotion.matches && !params.has('thumb')) {
    camera.position.setFromSphericalCoords(
      fitDistance * 1.13, homeOrbit.phi + 0.10, homeOrbit.theta - 0.14,
    );
    flyHome(0.7);
  }
}

const nightSky = new THREE.Color(0x192a46);
const twilightSky = new THREE.Color(0xd59480);
const daySky = new THREE.Color(0xa6c7d8);
const overcastSky = new THREE.Color(0x9ba5ad);
let cloudCover = 0;
let lastShadowTime;
function updateTime() {
  const minutes = time.valueAsNumber;
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const minuteText = String(minutes % 60).padStart(2, '0');
  clock.value = `${hours}:${minuteText}`;
  time.setAttribute('aria-valuetext', clock.value);

  const phase = (minutes - 360) * Math.PI / 720;
  const elevation = Math.sin(phase);
  const daylight = THREE.MathUtils.smoothstep(elevation, -0.16, 0.45);
  const twilight = THREE.MathUtils.smoothstep(elevation, -0.3, 0.02);
  scene.background.copy(nightSky).lerp(twilightSky, twilight).lerp(daySky, daylight);
  scene.background.lerp(overcastSky, cloudCover * (0.04 + 0.8 * daylight));
  scene.fog.color.copy(scene.background);
  hemisphere.intensity = 0.52 + daylight * 0.83 * (1 - cloudCover * 0.25);
  sun.intensity = 2.1 * THREE.MathUtils.smoothstep(elevation, 0, 0.55) * (1 - cloudCover * 0.8);
  sun.color.set(0xffaa73).lerp(new THREE.Color(0xfff1da), daylight);
  sun.position.set(Math.cos(phase), Math.max(elevation * 0.9, 0.06), 0.4).multiplyScalar(span * 2);
  const night = 1 - THREE.MathUtils.smoothstep(elevation, -0.14, 0.1);
  for (const wall of wallMaterials) wall.emissiveIntensity = night * 0.95; // lit windows after dusk
  if (sun.intensity > 0 && minutes !== lastShadowTime) {
    renderer.shadowMap.needsUpdate = true;
    lastShadowTime = minutes;
  }
  dirty = true;
}
time.addEventListener('input', updateTime);
updateTime();

const seoulTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
function syncTime() {
  if (document.hidden || !liveTime.checked) return;
  const [hours, minutes] = seoulTime.format(new Date()).split(':').map(Number);
  const current = hours * 60 + minutes;
  if (time.valueAsNumber === current) return;
  time.valueAsNumber = current;
  updateTime();
}
liveTime.addEventListener('change', () => {
  time.disabled = liveTime.checked;
  syncTime();
});
setInterval(syncTime, 1000);

const rainDepth = 12;
const droplets = Array.from({ length: 170 }, () => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  speed: 1.4 + Math.random(),
}));
const rainPositions = new THREE.BufferAttribute(new Float32Array(droplets.length * 6), 3);
rainPositions.setUsage(THREE.DynamicDrawUsage);
const rainGeometry = new THREE.BufferGeometry();
rainGeometry.setAttribute('position', rainPositions);
const rain = new THREE.LineSegments(rainGeometry, new THREE.LineBasicMaterial({
  color: 0xcce6f5, transparent: true, opacity: 0.35, depthTest: false, depthWrite: false,
}));
rain.frustumCulled = false;
rain.visible = false;
rain.renderOrder = 1;
camera.add(rain);
scene.add(camera);

function advanceRain(seconds) {
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * rainDepth;
  const halfWidth = halfHeight * camera.aspect;
  for (const [i, drop] of droplets.entries()) {
    drop.y -= drop.speed * seconds;
    if (drop.y < -1.08) {
      drop.y = 1.08;
      drop.x = Math.random() * 2 - 1;
    }
    const x = drop.x * halfWidth;
    const y = drop.y * halfHeight;
    rainPositions.setXYZ(i * 2, x, y, -rainDepth);
    rainPositions.setXYZ(i * 2 + 1, x + 0.04, y - drop.speed * 0.12, -rainDepth);
  }
  rainPositions.needsUpdate = true;
}

if (typeof ITEM !== 'undefined' && ITEM) {
  const weatherButtons = document.querySelectorAll('[data-weather]');
  const clouds = { sunny: 0, cloudy: 0.75, rain: 1 };
  for (const button of weatherButtons) {
    button.addEventListener('click', () => {
      const weather = button.dataset.weather;
      cloudCover = clouds[weather];
      rain.visible = weather === 'rain';
      for (const option of weatherButtons) option.setAttribute('aria-pressed', String(option === button));
      updateTime();
    });
  }
} else {
  const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.2297&longitude=128.6525&current=temperature_2m,precipitation,cloud_cover,wind_speed_10m,weather_code&timezone=Asia%2FSeoul';
  const weatherNumber = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 });
  async function refreshWeather() {
    try {
      const result = await fetch(weatherUrl, { signal: AbortSignal.timeout(15000) });
      if (!result.ok) throw new Error(`Weather: HTTP ${result.status}`);
      const { current } = await result.json();
      const { temperature_2m: temperature, precipitation, cloud_cover: clouds, wind_speed_10m: wind } = current ?? {};
      if (![temperature, precipitation, clouds, wind].every(Number.isFinite)) throw new Error('Missing current weather');
      weatherStatus.textContent = `기온 ${weatherNumber.format(temperature)} °C · 강수량 ${weatherNumber.format(precipitation)} mm · 풍속 ${weatherNumber.format(wind)} km/h`;
      cloudCover = THREE.MathUtils.clamp(clouds / 100, 0, 1);
      rain.visible = precipitation > 0;
      updateTime();
    } catch {
      weatherStatus.textContent = '날씨를 불러오지 못했어요';
    }
  }
  refreshWeather();
  setInterval(refreshWeather, 10 * 60 * 1000);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const pickTargets = [...buildings, ...stopSigns];
let selected;
let displayed;
let press;
function pick(event) {
  if (event) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    pointer.set((event.clientX - left) / width * 2 - 1, 1 - (event.clientY - top) / height * 2);
  } else {
    pointer.set(0, 0);
  }
  camera.updateMatrixWorld();
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(pickTargets, true)[0]?.object;
  return hit?.parent?.userData.stop ? hit.parent : hit;
}

function showFeature(mesh) {
  if (mesh === displayed) return;
  if (displayed && !displayed.userData.stop) { displayed.material[0].emissive.setHex(0); displayed.material[1].color.offsetHSL(0, 0, -0.12); }
  displayed = mesh;
  panel.hidden = !mesh;
  if (mesh) {
    const { name, height, supplied, stop } = mesh.userData;
    nameLabel.textContent = name || (stop ? labels.unnamedStop : labels.unnamedBuilding);
    nameLabel.lang = name && /\p{Script=Hangul}/u.test(name) ? 'ko' : lang;
    heightLabel.hidden = Boolean(stop);
    if (!stop) {
      mesh.material[0].emissive.setHex(0x473619);
      mesh.material[1].color.offsetHSL(0, 0, 0.12);
      const source = supplied ? labels.suppliedHeight : labels.estimatedHeight;
      heightLabel.textContent = `${labels.height} ${height.toLocaleString(lang, { maximumFractionDigits: 1 })} m · ${source}`;
    }
  }
  dirty = true;
}

function commitSelection(mesh) {
  selected = mesh;
  showFeature(mesh);
  if (selectionStatus) {
    selectionStatus.textContent = mesh
      ? [nameLabel.textContent, heightLabel.hidden ? '' : heightLabel.textContent].filter(Boolean).join('. ')
      : labels.cleared;
  }
}

function select(i) {
  selected = Number.isInteger(i) ? buildings[i] : undefined;
  showFeature(selected);
}
if (!(typeof ITEM !== 'undefined' && ITEM)) {
  window.__twin = { scene, camera, buildings, select };
  const initialSelection = params.get('select');
  if (/^\d+$/.test(initialSelection ?? '')) select(Number(initialSelection));
} else {
  canvas.addEventListener('keydown', event => {
    const { key } = event;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (key.startsWith('Arrow')) {
      flight = undefined;
    } else if (key === '+' || key === '=' || key === '-') {
      flight = undefined;
      cameraOffset.copy(camera.position).sub(controls.target).multiplyScalar(key === '-' ? 1.15 : 1 / 1.15);
      camera.position.copy(controls.target).add(cameraOffset);
      controls.update();
      event.preventDefault();
    } else if (key === 'Enter' || key === 'Escape') {
      flight = undefined;
      commitSelection(key === 'Enter' ? pick() : undefined);
      event.preventDefault();
    }
  }, { capture: true });
}

canvas.addEventListener('pointerdown', event => {
  press = event.isPrimary && event.button === 0
    ? { id: event.pointerId, x: event.clientX, y: event.clientY }
    : undefined;
});
canvas.addEventListener('pointermove', event => {
  if (press?.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 7) press = undefined;
  if (event.pointerType === 'mouse' && !event.buttons) {
    const hovered = pick(event);
    canvas.style.cursor = hovered ? 'pointer' : 'grab';
    showFeature(hovered ?? selected);
  }
});
canvas.addEventListener('pointerup', event => {
  if (press?.id !== event.pointerId) return;
  if (Math.hypot(event.clientX - press.x, event.clientY - press.y) <= 7) {
    commitSelection(pick(event));
  }
  press = undefined;
});
canvas.addEventListener('pointerleave', () => {
  canvas.style.cursor = 'grab';
  showFeature(selected);
});
canvas.addEventListener('pointercancel', () => { press = undefined; });

controls.update();
if (!document.hidden) renderer.render(scene, camera);
status.hidden = true;
if (resetView) resetView.disabled = false;
let lastFrame;
function renderFrame(timestamp) {
  const seconds = lastFrame === undefined ? 0 : Math.min((timestamp - lastFrame) / 1000, 0.05);
  lastFrame = timestamp;
  if (flight) advanceFlight(seconds);
  controls.update();
  if (rain.visible && (dirty || !reducedMotion.matches)) {
    advanceRain(reducedMotion.matches ? 0 : seconds);
    dirty = true;
  }
  if (!dirty) return;
  renderer.render(scene, camera);
  dirty = false;
}
function updateAnimation() {
  lastFrame = undefined;
  if (!document.hidden) syncTime();
  renderer.setAnimationLoop(document.hidden ? null : renderFrame);
}
reducedMotion.addEventListener('change', () => {
  controls.enableDamping = !reducedMotion.matches;
  if (reducedMotion.matches && flight) advanceFlight(flight.duration);
});
document.addEventListener('visibilitychange', updateAnimation);
updateAnimation();
