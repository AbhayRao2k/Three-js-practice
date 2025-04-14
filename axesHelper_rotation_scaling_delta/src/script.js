import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

cubeMesh.rotation.reorder = "YXZ";
cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.y = THREE.MathUtils.degToRad(45);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

cubeMesh.position.x = -1;
cubeMesh.position.y = 2;
cubeMesh.position.z = 1;

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// instantiate the clock
const clock = new THREE.Clock();
let previousTime = 0;
// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const deltaTime = currentTime - previousTime;
  previousTime = currentTime;

  cubeMesh.rotation.y += Math.sin(1) * 20 + 2;
  
  Math.sin(currentTime);
  
  cubeMesh.position.x += THREE.MathUtils.degToRad(currentTime) * deltaTime * 20 
  cubeMesh.scale.y += THREE.MathUtils.degToRad(currentTime) * deltaTime * 20 ;

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
