import * as THREE from 'three';

// mario video texture
const mario = document.getElementById( "mario video" );
const mario_texture = new THREE.VideoTexture( mario );
const mario_material = new THREE.MeshBasicMaterial({map: mario_texture, side: THREE.FrontSide, toneMapped: false});

// osu video texture
const osu = document.getElementById( "osu video" );
const osu_texture = new THREE.VideoTexture( osu );
const osu_material = new THREE.MeshBasicMaterial({map: osu_texture, side: THREE.FrontSide, toneMapped: false});

// formula video texture
const formula = document.getElementById( "formula video" );
const formula_texture = new THREE.VideoTexture( formula );
const formula_material = new THREE.MeshBasicMaterial({map: formula_texture, side: THREE.DoubleSide, toneMapped: false});

// vintage video texture
const vintage = document.getElementById( "vintage video" );
const vintage_texture = new THREE.VideoTexture( vintage );
const vintage_material = new THREE.MeshBasicMaterial({map: vintage_texture, side: THREE.FrontSide, toneMapped: false});

// helmet video texture
const helmet = document.getElementById( "helmet video" );
const helmet_texture = new THREE.VideoTexture( helmet );
const helmet_material = new THREE.MeshBasicMaterial({map: helmet_texture, side: THREE.FrontSide, toneMapped: false});

helmet_texture.wrapS = THREE.MirroredRepeatWrapping;
helmet_texture.offset = new THREE.Vector2(0, 0.25);

const screen_off_material = new THREE.MeshBasicMaterial({color: 0x0});

export default { mario_material, osu_material, formula_material, vintage_material, helmet_material, screen_off_material};