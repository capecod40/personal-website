import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7dcff);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector(".room-canvas"), antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );

// document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

camera.position.x = -3.48;
camera.position.y = 1.29;
camera.position.z = -1.60;

function setShadow(child) {
	child.castShadow = true;
	child.receiveShadow = true;
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

function animate() {
	requestAnimationFrame( animate );

	// window resizing
	let aspect = window.innerWidth / window.innerHeight;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	renderer.render( scene, camera );
}

animate();