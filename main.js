import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import CameraAnimation from './Camera.js';
import Video from './Video.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7dcff);
const camera = new THREE.PerspectiveCamera( 75, document.getElementById("render-canvas").offsetWidth / document.getElementById("render-canvas").offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("render-canvas"), antialias: true });
renderer.setSize( document.getElementById("render-canvas").offsetWidth, document.getElementById("render-canvas").offsetHeight);
// document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

// animations
let home_pos = new THREE.Vector3(-3.48, 1.29, -1.4);

let project_animation = new CameraAnimation(scene, camera, 
	[	home_pos,
	    new THREE.Vector3(-3, 1.03, -1),
	    new THREE.Vector3(-1.3, 1.03, -1),
	    new THREE.Vector3( -1.13, 1.05, -1.8 ) ], 
		new THREE.Vector3( -1.1, 1.03, -2.2 ),  0.002, 0.002, 0.002, true
)

let extras_animation = new CameraAnimation(scene, camera, 
	[	home_pos,
	    new THREE.Vector3( -1.5, 1.4, 0.4 ) ], 
		new THREE.Vector3( 0.8, 1, 0.9 ), 0.005, 0.005, 0.003, true
)

let about_animation = new CameraAnimation(scene, camera, 
	[	home_pos,
	    new THREE.Vector3( 1.2, 0.7, -2.2 ) ], 
		new THREE.Vector3( 1.4, 0.5, -1.4 ), 0.003, 0.003, 0.003, true
)

camera.position.set(home_pos.x, home_pos.y, home_pos.z);
camera.lookAt(0, 0.5, -0.15);

// videos
const screen_geometry = new THREE.BoxGeometry(0.7, 0.39, .0001);
const screen_mesh = new THREE.Mesh(screen_geometry, Video.screen_off_material);
screen_mesh.position.set(-1.35499, 1.09544, -2.33416)
scene.add(screen_mesh);

let helmet;
function setShadow(child) {
	child.castShadow = true;
	child.receiveShadow = true;
	if (child.userData.name == "shield") {
		helmet = child;
	}
	child.children.forEach((subchild) => {
		setShadow(subchild);
	})
}

function animateHelmet() {
	helmet.material = Video.helmet_material;
}

//load gltf
loader.load( 'blender/room.gltf', function ( gltf ) {
	const model = gltf.scene;
	scene.add( model );

	model.children.forEach((child) => {
		setShadow(child);
	})

}, undefined, function ( error ) {

	console.error( error );

} );

// lighting
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.castShadow = true;
scene.add( directionalLight );
directionalLight.position.x = -1;
directionalLight.position.y = 4;
directionalLight.position.z = -1;

directionalLight.shadow.bias = -0.0001;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 0.1;
// directionalLight.shadow.camera.far = 500.0;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.left = 100;
// directionalLight.shadow.camera.right = -100;
// directionalLight.shadow.camera.top = 100;
// directionalLight.shadow.camera.bottom = -100;

const light = new THREE.AmbientLight( 0xffffff , .5);
scene.add( light );

// window resizing
window.addEventListener("resize", function (){
	let aspect = window.innerWidth/ window.innerHeight;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

function animate() {
	requestAnimationFrame( animate );

	// if (extras_animation.home) {
	// 	extras_animation.enter();
	// } else {
	// 	extras_animation.exit();
	// 	animateHelmet();
	// }

	// if (project_animation.home) {
	// 	project_animation.enter();
	// } else {
	// 	project_animation.exit();
	// 	// screen_mesh.material = mario_material;
	// }

	// if (about_animation.home) {
	// 	about_animation.enter();
	// } else {
	// 	about_animation.exit();
	// }

	// console.log(pos);
	// console.log(camera.position);
	// console.log(camera.rotation)

	renderer.render( scene, camera );
}

animate();