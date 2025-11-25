import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import spline from "./spline.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight; // Set to fit the whole window
const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x000000, 0.3); // add fog so that you can't see the whole tunnel
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000); // params: fov, aspect ratio, near, far
// near = how close to the camera something is before it stops rendering
// far = vice versa
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// no clue what this means but it makes the colors look better :shrug:
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace; 
const controls = new OrbitControls(camera, renderer.domElement); // lets you drag the camera (basically does nothing since the camera updates automatically every frame)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// load terrence texture
const loader = new THREE.TextureLoader();
const texture = loader.load("./kerry.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// Repeat enough to cover tube
texture.repeat.set(50, 5);
// Create a tube along the spline path

// Spline.js code isn't mine, basically just a set of coordinates x,y,z
// create edges geometry from the spline
const tubeGeometry = new THREE.TubeGeometry(spline, 222, 0.65, 16, true); // params: path, # segments of the length of the tube, radius, # segments to fit the radius, is the tube open or closed
const tubeMet = new THREE.MeshBasicMaterial({
  map: texture, // terrence texture
  side: THREE.DoubleSide, // double-sided so that the texture appears on the inside
});
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMet); 
scene.add(tubeMesh);


//scene flythrough
function updateCamera(tx) {
  const time = tx * 0.1;  // controls the speed
  const looptime = 2 * 1000; // time to complete a loop
  const t = (time % looptime) / looptime; // how far around the loop you are (0 to 1)
  const pos = tubeGeometry.parameters.path.getPointAt(t); // current position
  const pos2 = tubeGeometry.parameters.path.getPointAt((t + 0.01) % 1); // next position
  camera.position.copy(pos); // set current position to current position (gee willikers)
  camera.lookAt(pos2); // look at the next position 
}

function animate(t = 0) {
  // should be self explanatory
  requestAnimationFrame(animate); 
  updateCamera(t);
  renderer.render(scene, camera);
}

animate();
// changes aspect ratio if you change the aspect of the window
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
