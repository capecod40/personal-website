import * as THREE from 'three';

export default class Lighting {
    constructor(renderer, scene) {
        this.renderer = renderer;
        
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        
        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        this.directionalLight.castShadow = true;
        this.directionalLight.position.x = -1;
        this.directionalLight.position.y = 4;
        this.directionalLight.position.z = -1;
        
        this.directionalLight.shadow.bias = -0.0001;
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        // this.directionalLight.shadow.camera.near = 0.1;
        // this.directionalLight.shadow.camera.far = 500.0;
        // this.directionalLight.shadow.camera.near = 0.5;
        // this.directionalLight.shadow.camera.left = 100;
        // this.directionalLight.shadow.camera.right = -100;
        // this.directionalLight.shadow.camera.top = 100;
        // this.directionalLight.shadow.camera.bottom = -100;
        
        this.ambientLight = new THREE.AmbientLight( 0xffffff , .5);

        scene.add(this.ambientLight);
        scene.add(this.directionalLight);
    }
}

