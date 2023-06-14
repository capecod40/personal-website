import * as THREE from 'three';

export default class WindowSize {
    constructor(renderer, camera, window, document) {
        this.renderer = renderer;
        this.window = window;
        this.camera = camera;
        this.document = document;

        camera.fov = 75;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1000;

        window.addEventListener("resize", function (){
            let aspect = window.innerWidth / window.innerHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })
    }


}