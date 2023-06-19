import * as THREE from 'three';

export default class Lighting {
    constructor(renderer, scene) {
        this.renderer = renderer;
        
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        
        this.directionalLight_top = new THREE.DirectionalLight( 0xffffff, 1 );
        this.directionalLight_top.castShadow = true;
        this.directionalLight_top.position.x = 0;
        this.directionalLight_top.position.y = 5;
        this.directionalLight_top.position.z = 0;
        
        this.directionalLight_top.shadow.bias = -0.0001;
        this.directionalLight_top.shadow.mapSize.width = 256;
        this.directionalLight_top.shadow.mapSize.height = 256;
        this.directionalLight_top.shadow.camera.near = 0.1;
        this.directionalLight_top.shadow.camera.far = 100.0;
        this.directionalLight_top.shadow.camera.left = 100;
        this.directionalLight_top.shadow.camera.right = -100;
        this.directionalLight_top.shadow.camera.top = 100;
        this.directionalLight_top.shadow.camera.bottom = -100;

        this.directionalLight_project = new THREE.SpotLight( 0xffffff, 1 );
        this.directionalLight_project.castShadow = true;
        this.directionalLight_project.position.x = -1.998896;
        this.directionalLight_project.position.y = 11.631988;
        this.directionalLight_project.position.z = 10.250797;
        this.directionalLight_project.target.position.x = -1.30726;
        this.directionalLight_project.target.position.y = 1;
        this.directionalLight_project.target.position.z = -1.5;

        this.directionalLight_project.shadow.bias = -0.01;
        this.directionalLight_project.shadow.mapSize.width = 128;
        this.directionalLight_project.shadow.mapSize.height = 128;
        this.directionalLight_project.shadow.camera.near = 10;
        this.directionalLight_project.shadow.camera.far = 100.0;
        this.directionalLight_project.shadow.camera.left = 100;
        this.directionalLight_project.shadow.camera.right = -100;
        this.directionalLight_project.shadow.camera.top = 100;
        this.directionalLight_project.shadow.camera.bottom = -100;
        this.directionalLight_project.shadow.type = THREE.PCFSoftShadowMap;
        this.directionalLight_project.angle = 0.07;
        this.directionalLight_project.penumbra = 0.6;
        
        this.directionalLight_about = new THREE.SpotLight( 0xffffff, 1 );
        this.directionalLight_about.castShadow = true;
        this.directionalLight_about.position.x = -4.37789;
        this.directionalLight_about.position.y = 6.708101;
        this.directionalLight_about.position.z = -6.74765;
        this.directionalLight_about.target.position.x = 1.791416;
        this.directionalLight_about.target.position.y = 0.182071;
        this.directionalLight_about.target.position.z = -1.51495;

        this.directionalLight_about.shadow.bias = -0.01;
        this.directionalLight_about.shadow.mapSize.width = 128;
        this.directionalLight_about.shadow.mapSize.height = 128;
        this.directionalLight_about.shadow.camera.near = 10;
        this.directionalLight_about.shadow.camera.far = 100.0;
        this.directionalLight_about.shadow.camera.left = 100;
        this.directionalLight_about.shadow.camera.right = -100;
        this.directionalLight_about.shadow.camera.top = 100;
        this.directionalLight_about.shadow.camera.bottom = -100;
        this.directionalLight_about.shadow.type = THREE.PCFSoftShadowMap;
        this.directionalLight_about.angle = 0.1;
        this.directionalLight_about.penumbra = 0.5;

        this.directionalLight_extras = new THREE.SpotLight( 0xffffff, 1 );
        this.directionalLight_extras.castShadow = true;
        this.directionalLight_extras.position.x = -5.6353539;
        this.directionalLight_extras.position.y = 16.0253301;
        this.directionalLight_extras.position.z = -3.1850129;
        this.directionalLight_extras.target.position.x = -0.0;
        this.directionalLight_extras.target.position.y = 0.3655162;
        this.directionalLight_extras.target.position.z = 1.4;

        this.directionalLight_extras.shadow.bias = -0.01;
        this.directionalLight_extras.shadow.mapSize.width = 128;
        this.directionalLight_extras.shadow.mapSize.height = 128;
        this.directionalLight_extras.shadow.camera.near = 10;
        this.directionalLight_extras.shadow.camera.far = 100.0;
        this.directionalLight_extras.shadow.camera.left = 100;
        this.directionalLight_extras.shadow.camera.right = -100;
        this.directionalLight_extras.shadow.camera.top = 100;
        this.directionalLight_extras.shadow.camera.bottom = -100;
        this.directionalLight_extras.shadow.type = THREE.PCFSoftShadowMap;
        this.directionalLight_extras.angle = 0.1;
        this.directionalLight_extras.penumbra = 0.6;



        this.ambientLight = new THREE.AmbientLight( 0xffffff , .2);

        scene.add(this.ambientLight);
        scene.add(this.directionalLight_top);
        scene.add(this.directionalLight_about);
        scene.add(this.directionalLight_about.target);
        scene.add(this.directionalLight_project);
        scene.add(this.directionalLight_project.target);
        scene.add(this.directionalLight_extras);
        scene.add(this.directionalLight_extras.target);

    }
}

