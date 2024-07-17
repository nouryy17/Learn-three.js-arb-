import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
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
const geo=new THREE.IcosahedronGeometry(1,2)
// هو مثلث متساوي الاضلاع يتكون من 20 وجه
// الارقام هي الحجم و تفاصيل الوجه
const mat =new THREE.MeshStandardMaterial({
    color: "#e9997e",
    flatShading:true  //هاذس الخاصية تبين و تظهر  المثلثات المشكلة للهندسة 
})
// لون يكتب بطريقة الاعداد السادس عشر من 000000 الى ffffff
// كل شكل هندسي في three.Js مكون من هندسة و مادة 
// الهندسة هي الاطار السلكي وهي مكونة من قمم او يمكن انسميها شرائح او مثلثات
// اما المادة فهي عبارة عن اللون و الاشياء المماثله
// الفرق بين MeshStandardMaterial و  MeshBasicMaterial
// انو وحدة تظهر بالضوء فقط بينما الاخرة تظهر حتى بدون ضوء
const mash=new THREE.Mesh(geo,mat)
//  اربط بين الهندسة و المادة = شكل
scene.add(mash)
// هاذي الخطوط الموجودة بين المثلثات
const wireMat =new THREE.MeshStandardMaterial({
    color: "6e69ff",
    wireframe:true,
})
const wireMash=new THREE.Mesh(geo,wireMat)
wireMash.scale.setScalar(1.001)
// اصبح اكثر بروز
mash.add(wireMash)
// هنا اجعل  wireMash ابن ل  mash


// اضيف الشكل الى المشهد
// انشاء ضوء
const ligth =new THREE.HemisphereLight(0x0099ff,0xdf445d5)
scene.add(ligth)
function animtion(t = 0) {
    requestAnimationFrame(animtion)
    // mash.rotation.y=t * 0.0001
    // mash.rotateX=t * 0.0001
    // هنا لتحريك الكرة
    renderer.render(scene,camera)
    controls.update()
    // هذا الكود بعد ما تحرك الكورة تبقى تتحرك شوي
}
animtion()
// هذه الدالة تقوم بمناداة نفسها بشكل مستمر