import * as THREE from 'three'

export default class CameraAnimation {
    constructor(scene, camera, cam_points, lookat_point, cam_speed, lookat_speed, return_speed, debug = true) {
        this.debug = debug;
        this.scene = scene;
        this.camera = camera;
        this.cam_speed = cam_speed;
        this.lookat_speed = lookat_speed;
        this.return_speed = return_speed;
        this.home = true;

        this.cam_progress = 0;
        this.lookat_progress = 0;

        this.cam_curve = new THREE.CatmullRomCurve3( cam_points );

        let lookat_points = [
            new THREE.Vector3(0, 0, 0), 
            lookat_point
        ];
        this.lookat_curve = new THREE.CatmullRomCurve3( lookat_points );

        let return_points = [
            new THREE.Vector3(0, 0, 0), 
            lookat_points[lookat_points.length - 1]
        ];
        this.return_curve = new THREE.CatmullRomCurve3( return_points );

        if (debug) {
            let points = this.cam_curve.getPoints( 50 );
            let geometry = new THREE.BufferGeometry().setFromPoints( cam_points );
            let material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            const cam_curveObject = new THREE.Line( geometry, material );
            scene.add(cam_curveObject);

            points = this.lookat_curve.getPoints( 50 );
            geometry = new THREE.BufferGeometry().setFromPoints( lookat_points );
            const lookat_curveObject = new THREE.Line( geometry, material );
            scene.add(lookat_curveObject);

            points = this.return_curve.getPoints( 50 );
            geometry = new THREE.BufferGeometry().setFromPoints( return_points );
            const return_curveObject = new THREE.Line( geometry, material );
            scene.add(return_curveObject);
        }
    }

    enter() {
        let pos;

        // cam curve
        this.cam_progress += this.cam_speed;
        if (this.cam_progress >= 1)
            this.cam_progress = 1

        pos = this.cam_curve.getPointAt(this.cam_progress);
        this.camera.position.copy(pos);

        // lookat curve
        this.lookat_progress += this.lookat_speed;
        if (this.lookat_progress > 1)
            this.lookat_progress = 1;
        
        pos = this.lookat_curve.getPointAt(this.lookat_progress);
        this.camera.lookAt(pos);

        if (this.cam_progress == 1 && this.lookat_progress == 1)
            this.home = false;
    }

    exit() {
        let pos;

        // cam curve
        this.cam_progress -= this.cam_speed;
        if (this.cam_progress < 0)
            this.cam_progress = 0;

        pos = this.cam_curve.getPointAt(this.cam_progress);
        this.camera.position.copy(pos);

        // lookat curve
        this.lookat_progress -= this.return_speed;
        if (this.lookat_progress < 0)
            this.lookat_progress = 0;
        
        pos = this.return_curve.getPointAt(this.lookat_progress);
        this.camera.lookAt(pos);

        if (this.cam_progress == 0 && this.lookat_progress == 0)
            this.home = true;
    }


}