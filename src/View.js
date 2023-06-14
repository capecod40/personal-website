import * as THREE from 'three';

export default class View {
    constructor(renderer, window, document, canvas, scene, home_pos) {
        this.renderer = renderer;
        this.window = window;
        // this.camera = camera;
        this.document = document;
        this.canvas = canvas;
        this.scene = scene;

        const camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000 );
        this.camera = camera;

        renderer.setSize( canvas.offsetWidth, canvas.offsetHeight);

        scene.background = new THREE.Color(0xc7dcff);

        camera.position.set(home_pos.x, home_pos.y, home_pos.z);
        camera.lookAt(0, 0.5, -0.15);

        window.addEventListener("resize", function (){
            let aspect = window.innerWidth / window.innerHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })
    }


}