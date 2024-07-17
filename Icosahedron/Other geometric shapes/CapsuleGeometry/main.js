import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
const w=window.innerWidth
const h=window.innerHeight
const renderer=new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w,h)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
)
camera.position.z=2;
const scene = new THREE.Scene()
const  controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true
controls.dampingFactor=0.03
const geo=new THREE.CapsuleGeometry(1, 1, 4, 8)
const mat =new THREE.MeshStandardMaterial({
    color: "#e9997e",
    flatShading:true   
})

const mash=new THREE.Mesh(geo,mat )
scene.add(mash)
const wireMat =new THREE.MeshStandardMaterial({
    color: "6e69ff",
    wireframe:true,
})
const wireMash=new THREE.Mesh(geo,wireMat)
wireMash.scale.setScalar(1.001)
mash.add(wireMash)


const ligth =new THREE.HemisphereLight(0x2e22ef,0xa44eff)
scene.add(ligth)

function animtion(t = 0) {
    requestAnimationFrame(animtion)
    renderer.render(scene,camera)
    controls.update()
}
animtion()