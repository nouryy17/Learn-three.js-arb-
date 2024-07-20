import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// تجعلك قادر على تحريك الكائن الممر فيها
import getStarfield from "./node_modules/three/src/getStarfield.js";
// مسؤول على النجوم لكن لا اعرف لماذا لم تعمل
import { getFresnelMat } from "./node_modules/three/src/getFresnelMat.js";
// مسؤول على الشعاع الازرق المحيط بالكرة
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
//  اضافة المشهد الكاميرا العارض 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// هذا الكود يحاكي كيف للعارض ان يعمل مثل الكاميرا  في التعامل مع الضوء و الالوان
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
// اما هذا الكود  يستخدمRGB التي تضمن عرض الوان  بشكل صحيح في مختلف الشاشات
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
// محور دوران الارض
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
// من اجل التحريك
const detail = 12;
const loader = new THREE.TextureLoader();
// يستحدم لعرض الصور و النصوص
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./img/00_earthspec1k.jpg"),   //هذه الخاصية تحدد الخريطة الأساسية للنسيج
  specularMap: loader.load("./img/02_earthspec1k.jpg"),  //هذه الخاصية تحدد خريطة التلميع (specular map) التي تحدد أجزاء السطح التي تعكس الضوء بشكل أكثر لمعانًا
  bumpMap: loader.load("./img/01_earthbump1k.jpg"),   // التي تستخدم لإضافة تفاصيل دقيقة إلى السطح بواسطة التلاعب بالإضاءة والظلال
  bumpScale: 0.04,
});
//اضافة الكرة
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);
// اضافة الجانب المظلم من الكرة الارضية
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./img/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,  // يستحدم لدمج الضور و الاوان
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./img/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./img/05_earthcloudmaptrans.jpg'), //  تحديد درجة شفافية الصور كي نقدر نشوف الي بعدها مثل السحب و الوجاح
  alphaTest: 0.3,
});
// اضافة السحب للكرة الارضية
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);
// الشعاع الازرق المحيط بالكرة
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);
// اضافة النجوم 
const stars = getStarfield({numStars: 2000});
scene.add(stars);
// اضافة ضوء الشمس
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;
  renderer.render(scene, camera);
}

animate();
// دالة  لضبط الطول و العرض للصفحة و الكاميرا
function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);