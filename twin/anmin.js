import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildTerrain, project, school, seeded } from './anmin-terrain.js';
import { buildBuildings, buildStreets, buildTrees } from './anmin-models.js';

const copy = {
  ko: {
    title: '안민동 3D 트윈', location: '창원시 성산구 · 안민초등학교 일대', map: '안민동 3D 지도',
    loading: '안민동 지도를 만드는 중…', unavailable: '이 브라우저에서 3D 지도를 열 수 없어요. WebGL을 지원하는 브라우저에서 열어 주세요.',
    views: '지도 시점', overview: '전체', school: '학교', top: '위에서', north: '북쪽 방향', northMark: '북', quality: '그래픽 품질',
    low: '절전', high: '고화질', time: '현지 시각', weather: '날씨', clear: '맑음', cloud: '흐림', rain: '비',
    places: '장소', about: '지도 정보', close: '닫기', forest: '숲', residential: '시가지', water: '물',
    coverage: 'OpenStreetMap 건물 데이터가 드문 지역이에요. 지도에 등록된 건물만 3D로 표시하고, 주거 구역은 옅은 회색으로 표시해요.',
    estimates: '건물 높이, 지붕, 가로수, 학교 울타리와 도로 시설은 원본 정보가 부족할 때 추정한 모습이에요. 고도는 90m 해상도의 표고 모델을 사용해요.',
    credit: '지도 © OpenStreetMap 기여자 (ODbL). 고도 Open-Meteo / Copernicus DEM GLO-90.',
    filled: '가까운 표본으로 채운 고도 지점', help: '드래그로 회전하고 휠·두 손가락으로 확대하세요. 두 손가락 또는 방향키로 이동하고, Shift와 방향키로 회전하며 +/−로 확대·축소하세요.',
    elevation: '해발', bus: '버스 정류장', mapped: '등록된 장소', landmark: '안민초등학교 · 지도의 기준점',
    height: '건물 높이', supplied: 'OSM 높이 또는 층수', inferred: '바닥 면적 기준 추정',
  },
  en: {
    title: 'Anmin-dong 3D Digital Twin', location: 'Seongsan-gu, Changwon · Anmin Elementary School', map: '3D map of Anmin-dong',
    loading: 'Preparing the Anmin map…', unavailable: 'The 3D map is unavailable here. Open it in a browser with WebGL support.',
    views: 'Map views', overview: 'Overview', school: 'School', top: 'Top view', north: 'North direction', northMark: 'N', quality: 'Graphics quality',
    low: 'Low detail', high: 'High detail', time: 'Local time', weather: 'Weather', clear: 'Clear', cloud: 'Cloudy', rain: 'Rain',
    places: 'Places', about: 'About', close: 'Close', forest: 'Forest', residential: 'Built-up', water: 'Water',
    coverage: 'OpenStreetMap building coverage is sparse here. Only mapped buildings appear in 3D. Light grey indicates a mapped residential zone.',
    estimates: 'Building heights, roofs, street trees, school fences, and street fixtures are approximations where source detail is missing. Elevation uses a 90 m resolution model.',
    credit: 'Map © OpenStreetMap contributors (ODbL). Elevation by Open-Meteo / Copernicus DEM GLO-90.',
    filled: 'Elevation points filled from nearby samples', help: 'Drag to orbit and scroll or pinch to zoom. Pan with two fingers or arrow keys. Shift + arrows rotates the map. Use +/− to zoom.',
    elevation: 'Elevation', bus: 'Bus stop', mapped: 'Mapped place', landmark: 'Anmin Elementary School · Map center',
    height: 'Building height', supplied: 'OSM height or levels', inferred: 'Estimated from footprint',
  },
};

const localNames = {
  '안민어린이집': 'Anmin Daycare', '성주동 행정복지센터': 'Seongju-dong Community Center',
  '성주동주민센터': 'Seongju-dong Community Center', '출출할때': 'Chulchulhalttae', '정자': 'Pavilion',
  '카페': 'Café', '자금성': 'Jageumseong', '참솔상가': 'Chamsol Shopping Center', 'CU편의점': 'CU Convenience Store',
  '현대위아 창원4공장': 'Hyundai Wia Changwon Plant 4', '한화디펜스': 'Hanwha Defense', '풍산산업': 'Poongsan Industrial',
  '태화기계': 'Taehwa Machinery', '청솔아파트종점': 'Cheongsol Apartments Terminus', '안민고개입구': 'Anmin Pass Entrance',
  '신우에이스타운': 'Shinwoo Ace Town', '성주사역': 'Seongjusa Station', '새벽촌': 'Saebyeokchon',
  '삼성그린빌': 'Samsung Greenvill', '대림자동차': 'Daelim Motors', '대동한솔아파트': 'Daedong Hansol Apartments',
  '안민초등학교': 'Anmin Elementary School',
};
const byId = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const requested = params.get('lang');
const lang = requested === 'ko' || requested === 'en' ? requested : /^ko/i.test(navigator.language) ? 'ko' : 'en';
const words = copy[lang];
document.documentElement.lang = lang;
document.title = words.title;
for (const el of document.querySelectorAll('[data-copy]')) el.textContent = words[el.dataset.copy];
for (const el of document.querySelectorAll('[data-label]')) el.setAttribute('aria-label', words[el.dataset.label]);

const nameOf = place => (lang === 'en' && (place.en || localNames[place.name])) || place.name || place.en || words.mapped;
const press = (buttons, active) => {
  for (const button of buttons) button.setAttribute('aria-pressed', String(button === active));
};

const data = ITEM_AREA;
const viewport = byId('viewport');
const status = byId('status');
const quality = byId('quality');
const viewButtons = document.querySelectorAll('[data-view]');
const weatherButtons = document.querySelectorAll('[data-weather]');
const aboutButton = byId('open-about');
const placesButton = byId('open-places');
const sheet = byId('sheet');
const closeButton = byId('close');
const sheetParts = [byId('about'), byId('place-list'), byId('detail')];
let returnFocus;
function closeSheet(restore) {
  sheet.hidden = true;
  aboutButton.setAttribute('aria-expanded', 'false');
  placesButton.setAttribute('aria-expanded', 'false');
  if (restore && returnFocus && !returnFocus.hidden) returnFocus.focus();
}
function showSheet(part, title, opener) {
  if (!sheet.hidden && !sheetParts[part].hidden && part < 2) {
    closeSheet(true);
    return;
  }
  returnFocus = opener;
  sheetParts.forEach((el, i) => { el.hidden = i !== part; });
  byId('sheet-title').textContent = title;
  aboutButton.setAttribute('aria-expanded', String(part === 0));
  placesButton.setAttribute('aria-expanded', String(part === 1));
  sheet.hidden = false;
  closeButton.focus();
}
aboutButton.onclick = () => showSheet(0, words.about, aboutButton);
closeButton.onclick = () => closeSheet(true);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !sheet.hidden) {
    closeSheet(true);
    event.preventDefault();
  }
});
if (data.terrain.filled) {
  const note = byId('filled');
  note.textContent = words.filled + ' · ' + data.terrain.filled.toLocaleString(lang);
  note.hidden = false;
}

function atmosphere(scene, sun) {
  const uniforms = {
    zenith: { value: new THREE.Color() }, horizon: { value: new THREE.Color() },
    sun: { value: new THREE.Vector3() }, brightness: { value: 0 },
  };
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms, fog: false,
    vertexShader: 'varying vec3 direction; void main(){ direction = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: [
      'varying vec3 direction;',
      'uniform vec3 zenith, horizon, sun;',
      'uniform float brightness;',
      'void main(){',
      'vec3 v = normalize(direction);',
      'vec3 c = mix(horizon, zenith, smoothstep(-.30,.72,v.y));',
      'float glare = max(dot(v,sun),0.);',
      'c += vec3(1.,.69,.38) * brightness * (pow(glare,17.) * .27 + smoothstep(.99945,.99969,glare));',
      'gl_FragColor = vec4(c,1.);',
      '#include <tonemapping_fragment>',
      '#include <colorspace_fragment>',
      '}',
    ].join('\n'),
  }));
  sky.scale.setScalar(6600);
  sky.frustumCulled = false;
  sky.renderOrder = -2;
  scene.add(sky);
  const ambient = new THREE.HemisphereLight('#e6f1f1', '#6a7261', 1);
  scene.add(ambient);
  const night = new THREE.Color('#1b3046');
  const twilight = new THREE.Color('#ddaa91');
  const clear = new THREE.Color('#b9cfca');
  const blue = new THREE.Color('#73a8bf');
  const overcast = new THREE.Color('#a3b3b9');
  const direction = new THREE.Vector3();
  return {
    sky, direction,
    update(minutes, clouds) {
      const angle = (minutes - 360) * Math.PI / 720;
      const elevation = Math.sin(angle);
      const day = THREE.MathUtils.smoothstep(elevation, -0.14, 0.55);
      const dusk = THREE.MathUtils.smoothstep(elevation, -0.26, 0.08);
      direction.set(Math.cos(angle), Math.max(0.09, elevation * 0.88), 0.73).normalize();
      uniforms.sun.value.copy(direction);
      uniforms.brightness.value = THREE.MathUtils.smoothstep(elevation, 0, 0.35) * (1 - clouds);
      uniforms.horizon.value.copy(night).lerp(twilight, dusk).lerp(clear, day).lerp(overcast, clouds * day * 0.83);
      uniforms.zenith.value.copy(night).lerp(blue, day).lerp(overcast, clouds * day * 0.72);
      scene.fog.color.copy(uniforms.horizon.value);
      scene.fog.density = 0.000135 + clouds * 0.00011;
      ambient.intensity = 0.36 + day * (1.29 - clouds * 0.15);
      ambient.color.set('#a7bada').lerp(new THREE.Color('#e8f1ec'), day);
      sun.color.set('#ffb375').lerp(new THREE.Color('#fff2d8'), day);
      sun.intensity = 2.45 * THREE.MathUtils.smoothstep(elevation, 0.02, 0.55) * (1 - clouds * 0.85);
      return 1 - THREE.MathUtils.smoothstep(elevation, -0.12, 0.13);
    },
  };
}

function run() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  const options = { alpha: false, antialias: true, powerPreference: 'high-performance' };
  let renderer;
  try {
    const context = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
    if (context) renderer = new THREE.WebGLRenderer({ canvas, context, ...options });
  } catch (error) { /* Context creation can be disabled. */ }
  if (!renderer) {
    status.textContent = words.unavailable;
    quality.hidden = byId('compass').hidden = placesButton.hidden = true;
    for (const button of [...viewButtons, ...weatherButtons, byId('time')]) button.disabled = true;
    return;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', words.map);
  canvas.setAttribute('aria-describedby', 'keyboard');
  viewport.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2();
  const terrain = buildTerrain(scene, data);
  const { materials, buildings } = buildBuildings(scene, data, terrain);
  const { light, lampPools, stops, roadside } = buildStreets(scene, data, terrain);
  const setTreeQuality = buildTrees(scene, data, terrain, roadside, buildings);
  const sun = new THREE.DirectionalLight();
  sun.castShadow = true;
  sun.shadow.bias = -0.00012;
  sun.shadow.normalBias = 0.62;
  sun.shadow.mapSize.set(1536, 1536);
  scene.add(sun, sun.target);
  const sky = atmosphere(scene, sun);
  const camera = new THREE.PerspectiveCamera(44, 1, 1, 9600);
  camera.position.set(-900, 1500, -1600);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = !reduced.matches;
  controls.dampingFactor = 0.09;
  controls.screenSpacePanning = true;
  controls.minDistance = 45;
  controls.maxDistance = 4700;
  controls.maxPolarAngle = Math.PI / 2 - 0.20;
  controls.listenToKeyEvents(canvas);
  const changeMotion = () => { controls.enableDamping = !reduced.matches; };
  if (reduced.addEventListener) reduced.addEventListener('change', changeMotion);
  else reduced.addListener(changeMotion);

  const schoolPoint = project(school.lat, school.lon);
  const schoolY = terrain.ground(schoolPoint.x, schoolPoint.y);
  const landmark = { ...school, center: schoolPoint, y: schoolY + 17, school: true };
  const marker = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.8, 0.7, 24),
    new THREE.MeshStandardMaterial({ color: '#f4c673', emissive: '#c6803e', emissiveIntensity: 0.34 }));
  marker.position.set(schoolPoint.x, schoolY + 0.9, schoolPoint.y);
  scene.add(marker);
  const mapPlaces = [landmark];
  for (const place of data.places) {
    if (place.name === school.name) continue;
    const center = project(place.lat, place.lon);
    mapPlaces.push({ ...place, center, y: terrain.ground(center.x, center.y) + 10 });
  }
  for (const building of buildings) {
    if (building.name && !mapPlaces.some(place => place.name === building.name && place.center.distanceToSquared(building.center) < 120 ** 2)) {
      mapPlaces.push(building);
    }
  }
  const entries = [...mapPlaces, ...stops.map(stop => ({ ...stop, bus: true }))];
  let dirty = true;
  let activeView = 'overview';
  let selected;
  let high = params.has('thumb') || !matchMedia('(any-pointer: coarse)').matches;
  const readout = byId('readout');
  const tmp = new THREE.Vector3();
  const previousTarget = new THREE.Vector3(Infinity, 0, 0);
  const needle = byId('needle');
  const time = byId('time');
  const clock = byId('clock');
  const rain = byId('rain');
  let weather = 'clear';
  let shadowRadius = 0;

  function setQuality() {
    quality.textContent = high ? words.high : words.low;
    quality.setAttribute('aria-pressed', String(high));
    quality.setAttribute('aria-label', words.quality + ' · ' + quality.textContent);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, high ? 2 : 1.15));
    renderer.shadowMap.enabled = high;
    renderer.shadowMap.needsUpdate = true;
    setTreeQuality(high);
    dirty = true;
  }
  quality.onclick = () => { high = !high; setQuality(); };
  setQuality();

  function focusCamera(place, distance) {
    controls.enableDamping = false;
    controls.update();
    controls.target.set(place.center.x, place.y, place.center.y);
    const offset = activeView === 'top' ? tmp.set(0, 1, 0.013) : activeView === 'overview'
      ? tmp.set(-0.27, 0.64, -1) : tmp.set(-0.56, 0.78, 1);
    camera.position.copy(controls.target).add(offset.setLength(distance));
    controls.update();
    controls.enableDamping = !reduced.matches;
    dirty = true;
  }
  function preset(view) {
    selected = undefined;
    activeView = view;
    press(viewButtons, [...viewButtons].find(button => button.dataset.view === view));
    const aspectFactor = Math.max(1, 0.87 / camera.aspect);
    if (view === 'school') focusCamera(landmark, 365 * Math.min(1.35, aspectFactor));
    else if (view === 'top') focusCamera({ center: schoolPoint, y: schoolY }, 2150 * Math.min(1.4, aspectFactor));
    else focusCamera({ center: new THREE.Vector2(10, 165), y: schoolY + 30 }, 2130 * Math.min(1.33, aspectFactor));
  }
  for (const button of viewButtons) button.onclick = () => {
    closeSheet(false);
    preset(button.dataset.view);
  };

  function details(place, opener) {
    selected = place;
    activeView = '';
    press(viewButtons);
    focusCamera(place, place.school ? 365 : 250);
    const meters = Math.round(terrain.datum + terrain.ground(place.center.x, place.center.y));
    const kind = place.school ? words.landmark : place.bus ? words.bus : words.mapped;
    const extra = place.height ? ' · ' + words.height + ' ' + Math.round(place.height) + ' m (' + (place.supplied ? words.supplied : words.inferred) + ')' : '';
    byId('detail-text').textContent = kind + ' · ' + words.elevation + ' ' + meters + ' m' + extra;
    showSheet(2, nameOf(place), opener);
  }
  placesButton.onclick = () => showSheet(1, words.places, placesButton);
  for (const place of entries) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = nameOf(place) + (place.bus ? ' · ' + words.bus : '');
    button.onclick = () => details(place, placesButton);
    byId('place-list').appendChild(button);
  }
  const pins = mapPlaces.map(place => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = place.school ? 'pin school' : 'pin';
    const caption = document.createElement('span');
    caption.textContent = nameOf(place);
    button.appendChild(caption);
    button.onclick = () => details(place, button);
    byId('pins').appendChild(button);
    return { place, button };
  });
  function updatePins() {
    const used = [];
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const overview = camera.position.distanceTo(controls.target) > 920;
    for (const { place, button } of pins) {
      tmp.set(place.center.x, place.y, place.center.y).project(camera);
      const x = (tmp.x + 1) / 2 * w;
      const y = (1 - tmp.y) / 2 * h;
      const hide = tmp.z >= 1 || x < 52 || x > w - 52 || y < 94 || y > h - 34 || (!place.school && place !== selected
        && (overview || used.length > 4 || used.some(([px, py]) => Math.abs(x - px) < 138 && Math.abs(y - py) < 41)));
      button.hidden = hide;
      if (hide) continue;
      used.push([x, y]);
      button.style.left = x + 'px';
      button.style.top = y + 'px';
    }
    needle.style.transform = 'rotate(' + controls.getAzimuthalAngle() + 'rad)';
    const height = Math.round(terrain.datum + terrain.ground(controls.target.x, controls.target.z));
    readout.textContent = words.elevation + ' ' + height + ' m';
  }

  const pad = n => n < 10 ? '0' + n : String(n);
  function changeWeather() {
    const minutes = Number(time.value);
    clock.value = pad(Math.floor(minutes / 60)) + ':' + pad(minutes % 60);
    time.setAttribute('aria-valuetext', clock.value);
    const night = sky.update(minutes, { clear: 0, cloud: 0.75, rain: 1 }[weather]);
    for (const wall of materials) wall.emissiveIntensity = night * 1.22;
    light.emissiveIntensity = night * 3.6;
    if (lampPools) {
      lampPools.visible = night > 0.04;
      lampPools.material.opacity = night * 0.44;
    }
    shadowRadius = 0;
    dirty = true;
    rain.hidden = weather !== 'rain' || document.hidden;
  }
  time.oninput = changeWeather;
  for (const button of weatherButtons) button.onclick = () => {
    weather = button.dataset.weather;
    press(weatherButtons, button);
    changeWeather();
  };

  controls.addEventListener('change', () => { dirty = true; });
  controls.addEventListener('start', () => { activeView = ''; press(viewButtons); });
  canvas.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === '+' || event.key === '=' || event.key === '-') {
      tmp.copy(camera.position).sub(controls.target);
      tmp.multiplyScalar(event.key === '-' ? 1.15 : 1 / 1.15);
      camera.position.copy(controls.target).add(tmp);
      controls.update();
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      activeView = '';
      press(viewButtons);
    }
  });
  function resize() {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (activeView) preset(activeView);
    dirty = true;
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(viewport);
  window.addEventListener('resize', resize);
  resize();
  changeWeather();

  function render() {
    controls.update();
    if (!dirty) return;
    const distance = camera.position.distanceTo(controls.target);
    const radius = Math.min(1900, Math.max(150, distance * 0.8));
    const near = Math.max(1, Math.floor(distance / 42));
    if (camera.near !== near) {
      camera.near = near;
      camera.updateProjectionMatrix();
    }
    if (Math.abs(shadowRadius - radius) > 45 || previousTarget.distanceToSquared(controls.target) > 28 ** 2) {
      shadowRadius = radius;
      previousTarget.copy(controls.target);
      sun.target.position.copy(controls.target);
      sun.position.copy(controls.target).addScaledVector(sky.direction, 2800);
      Object.assign(sun.shadow.camera, { left: -radius, right: radius, bottom: -radius, top: radius, far: 5900 });
      sun.shadow.camera.updateProjectionMatrix();
      renderer.shadowMap.needsUpdate = true;
    }
    sky.sky.position.copy(camera.position);
    camera.updateMatrixWorld();
    updatePins();
    renderer.render(scene, camera);
    dirty = false;
  }
  function visibility() {
    rain.hidden = document.hidden || weather !== 'rain';
    renderer.setAnimationLoop(document.hidden ? null : render);
  }
  document.addEventListener('visibilitychange', visibility);
  render();
  status.hidden = true;
  readout.hidden = false;
  visibility();
}
run();
