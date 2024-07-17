import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import  getStarfield  from './node_modules/three/src/getStarfield.js';
// استدعاء OrbitControls من اجل تحكم و تحريك الكاميرا


// عرض الشاشة
const w=window.innerWidth
// طول الشاشة
const h=window.innerHeight
//  renderer==العارض
const renderer=new THREE.WebGLRenderer({ antialias: true })
// ملاحضة WebGL مسؤول عن عرض اشكال d3 في المتصفح 
renderer.setSize(w,h)
//  نمرر خاصية الذي سيجعلها تبدو افضل ولكن هناك طريقة اخرى لانشاء العارض 
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
// يقوم بضبط البكسل  على حسب قيسات شاشة الحاسوب خصتنا و بذلك ينزع  التعرجات الموجود في الشكل
document.body.appendChild(renderer.domElement)
// هنا استدعي html و احقنه بالعارض
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
)
camera.position.z=2;
// تحديد موضع الكاميرا
const scene = new THREE.Scene()
// انشاء مشهد

// تحريك
const  controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true
controls.dampingFactor=0.03
// تحريك الكرة اصبح افضل
const earthGrup=new THREE.Group()
earthGrup.rotation.z= 23.4 * Math.PI / 180  //زاوية دوران الارض 
let loder=new THREE.TextureLoader() //يستخدمان لتغليف الكرة بالخريطة
const geo=new THREE.IcosahedronGeometry(1,14)
// هو مثلث متساوي الاضلاع يتكون من 20 وجه
// الارقام هي الحجم و تفاصيل الوجه
const mat =new THREE.MeshStandardMaterial({
    map: loder.load("00_earthmap1k.jpg") //يستخدمان لتغليف الكرة بالخريطة
})
// لون يكتب بطريقة الاعداد السادس عشر من 000000 الى ffffff
// كل شكل هندسي في three.Js مكون من هندسة و مادة 
// الهندسة هي الاطار السلكي وهي مكونة من قمم او يمكن انسميها شرائح او مثلثات
// اما المادة فهي عبارة عن اللون و الاشياء المماثله
// الفرق بين MeshStandardMaterial و  MeshBasicMaterial
// انو وحدة تظهر بالضوء فقط بينما الاخرة تظهر حتى بدون ضوء
const mash = new THREE.Mesh(geo,mat)
//  اربط بين الهندسة و المادة = شكل
earthGrup.add(mash)
scene.add(earthGrup)
// اضيف الشكل الى المشهد
const sters=getStarfield(numStars:2000)
scene.add(sters)
// انشاء ضوء
const ligth =new THREE.HemisphereLight(0xffc5ff)
scene.add(ligth)
function animtion(t = 0) {
    requestAnimationFrame(animtion)
    mash.rotation.y=t * 0.0001
    // mash.rotateX=t * 0.0001
    // هنا لتحريك الكرة
    renderer.render(scene,camera)
    controls.update()
    // هذا الكود بعد ما تحرك الكورة تبقى تتحرك شوي
}
animtion()
// هذه الدالة تقوم بمناداة نفسها بشكل مستمر