import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Animations from './src/Animations.js';
import Lighting from './src/Lighting.js'
import View from './src/View.js';
import Models from './src/Models.js';
import Loading from './src/Loading.js';

const canvas = document.getElementById("render-canvas");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true});
const home_pos = new THREE.Vector3(-3.3445573092162864, 2.3245350023782074, -1.071712924964369);
const view = new View(renderer, window, document, canvas, scene, home_pos);
// const controls = new OrbitControls( view.camera, renderer.domElement );
const loader = new GLTFLoader();

Loading.initialize(document, window);

// lighting
const lighting = new Lighting(renderer, scene);

// models & textures - includes play pause buttons
const models = new Models(scene, loader, window);

// animations & buttons
Animations.initialize(scene, view.camera, home_pos, document, window, models, );

Animations.onClick(4);

window.addEventListener('resize', function(){
    document.body.style.zIndex = '1';
}, false);

function animate() {
	requestAnimationFrame( animate );

	Animations.animate();

	renderer.render( scene, view.camera );
	// console.log(view.camera.position);
	// console.log(window.innerHeight, window.innerWidth)
}

animate();