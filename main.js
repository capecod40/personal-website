import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import CameraAnimation from './Camera.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7dcff);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector(".room-canvas"), antialias: true });
renderer.setSize( window.innerWidth * 0.9, window.innerHeight * 0.9);
// document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

camera.position.x = -3.48;
camera.position.y = 1.29;
camera.position.z = -1.60;
camera.lookAt(0, 0, 0);

const video = document.getElementById( 'video' );
const texture = new THREE.VideoTexture( video );
texture.rotation = Math.PI;
const videoMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.FrontSide});

let screen_obj;

function setShadow(child) {
	child.castShadow = true;
	child.receiveShadow = true;
	if (child.userData.name == "screen") {
		// console.log(child);
		screen_obj = child;
		console.log(screen_obj);
		screen_obj.material = videoMaterial;
	}
	child.children.forEach((subchild) => {
		setShadow(subchild);
	})
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


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// lighting
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

let home_pos = new THREE.Vector3(-3.48, 1.29, -1.60);

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
		new THREE.Vector3( 0.8, 1, 0.9 ), 0.003, 0.003, 0.003, true
)

let about_animation = new CameraAnimation(scene, camera, 
	[	home_pos,
	    new THREE.Vector3( 1.2, 0.8, -1.8 ) ], 
		new THREE.Vector3( 1.6, 0.5, -1.4 ), 0.003, 0.003, 0.003, true
)

function animate() {
	requestAnimationFrame( animate );

	// window resizing
	let aspect = window.innerWidth / window.innerHeight;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	// if (extras_animation.home) {
		// extras_animation.enter();
	// } else {
	// 	extras_animation.exit();
	// }

	if (project_animation.home) {
		project_animation.enter();}
	// } else {
	// 	project_animation.exit();
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