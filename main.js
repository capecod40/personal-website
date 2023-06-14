import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import CameraAnimation from './CameraAnimation.js';
import Video from './Video.js';
import Lighting from './Lighting.js'
import WindowSize from './WindowSize.js';
import Camera from './Camera.js';
import Models from './Models.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7dcff);
const camera = new THREE.PerspectiveCamera( 75, document.getElementById("render-canvas").offsetWidth / document.getElementById("render-canvas").offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("render-canvas"), antialias: true });
renderer.setSize( document.getElementById("render-canvas").offsetWidth, document.getElementById("render-canvas").offsetHeight);

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();



const home_pos = new THREE.Vector3(-3.48, 1.29, -1.4);

// window sizing
const windowSize = new WindowSize(renderer, camera, window, document);

// camera
const cam = new Camera(camera, window, home_pos);

// lighting
let lighting = new Lighting(renderer);
scene.add(lighting.ambientLight);
scene.add(lighting.directionalLight);

// animations
CameraAnimation.initialize(scene, camera, home_pos);

// models & textures
const models = new Models(scene, loader);

function onClick(index) {
	if (index == CameraAnimation.state)
		return;

	CameraAnimation.inAnimation = true;
	
	if (index == -1)
		CameraAnimation.exit = true;
	else if (CameraAnimation.state != -1) {
		CameraAnimation.immediateEnter = index;
		CameraAnimation.exit = true;
	} else
		CameraAnimation.state = index;
}

window.onClick = onClick;

function animate() {
	requestAnimationFrame( animate );

	if (CameraAnimation.inAnimation) {
		if (CameraAnimation.exit == true) {
			CameraAnimation.animations[CameraAnimation.state].exit();
		} else {
			CameraAnimation.animations[CameraAnimation.state].enter();
		}
	}

	renderer.render( scene, camera );
}

animate();