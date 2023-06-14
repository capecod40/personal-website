import * as THREE from 'three';

export default class Models {
    constructor(scene, loader) {
        // mario video texture
        let mario = document.getElementById( "mario video" );
        let mario_texture = new THREE.VideoTexture( mario );
        let mario_material = new THREE.MeshBasicMaterial({map: mario_texture, side: THREE.FrontSide, toneMapped: false});

        // osu video texture
        let osu = document.getElementById( "osu video" );
        let osu_texture = new THREE.VideoTexture( osu );
        let osu_material = new THREE.MeshBasicMaterial({map: osu_texture, side: THREE.FrontSide, toneMapped: false});

        // formula video texture
        let formula = document.getElementById( "formula video" );
        let formula_texture = new THREE.VideoTexture( formula );
        let formula_material = new THREE.MeshBasicMaterial({map: formula_texture, side: THREE.DoubleSide, toneMapped: false});

        // vintage video texture
        let vintage = document.getElementById( "vintage video" );
        let vintage_texture = new THREE.VideoTexture( vintage );
        let vintage_material = new THREE.MeshBasicMaterial({map: vintage_texture, side: THREE.FrontSide, toneMapped: false});

        // helmet video texture
        let helmet = document.getElementById( "helmet video" );
        let helmet_texture = new THREE.VideoTexture( helmet );
        let helmet_material = new THREE.MeshBasicMaterial({map: helmet_texture, side: THREE.FrontSide, toneMapped: false});
        helmet_texture.wrapS = THREE.MirroredRepeatWrapping;
        helmet_texture.offset = new THREE.Vector2(0, 0.25);

        let screen_off_material = new THREE.MeshBasicMaterial({color: 0x0});

        this.mario_material = mario_material;
        this.osu_material = osu_material;
        this.formula_material = formula_material;
        this.vintage_material = vintage_material;
        this.helmet_material = helmet_material;
        this.screen_off_material = screen_off_material;

        let screen_geometry = new THREE.BoxGeometry(0.7, 0.39, .0001);
        let screen_mesh = new THREE.Mesh(screen_geometry, screen_off_material);
        screen_mesh.position.set(-1.35499, 1.09544, -2.33416)
        scene.add(screen_mesh);
        
        let helmetChild;
        function setShadow(child) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.userData.name == "shield") {
                helmetChild = child;
            }
            child.children.forEach((subchild) => {
                setShadow(subchild);
            })
        }
        
        //load gltf
        loader.load( 'blender/room.gltf', function ( gltf ) {
            let model = gltf.scene;
            scene.add( model );
        
            model.children.forEach((child) => {
                setShadow(child);
            })
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );
    }
}