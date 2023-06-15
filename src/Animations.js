import * as THREE from 'three'
import Models from './Models';

export default class Animations {

    static window;
    static inAnimation = false;
    static exit = false;
    static state = -1;
    static immediateEnter = -1;
    static animations = [];

    static elements = [];
    static curr;

    static initialize(scene, camera, home_pos, document, window, models) {
        // 0: projects
        // 1: extras
        // 2: about

        Animations.models = models;

        Animations.animations[0] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( -1.13, 1.05, -1.8 ) ], 
                new THREE.Vector3( -1.1, 1.03, -2.2 ),  0.01, 0.01, 0.01, false
        )

        Animations.animations[1] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( -1.5, 1.4, 0.4 ) ], 
                new THREE.Vector3( 0.8, 1, 0.9 ), 0.015, 0.015, 0.015, false
        )

        Animations.animations[2] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( 1.2, 0.7, -2.2 ) ], 
                new THREE.Vector3( 1.4, 0.5, -1.4 ), 0.01, 0.01, 0.01, false
        )
        
        Animations.elements[0] = document.getElementById("projects");
        Animations.elements[1] = document.getElementById("extras");
        Animations.elements[2] = document.getElementById("about");

        Animations.window = window;
        window.onClick = this.onClick;
    }

    static onEnter() {
        if (Animations.state == 1) { // video texture for helmet
            Models.shield.material = Animations.models.helmet_material;
            Animations.models.helmet_element.play();
            Animations.models.helmet_element.loop = true;
        }
        Animations.curr.style.opacity = "1";
        Animations.curr.style.height = "60%";
        Animations.curr.children[0].style.opacity = "0";
    }

    static onExit() {
        Animations.curr.style.height = "0%";
        Animations.curr.children[0].style.opacity = "0";
    }

    static onClick(index) {
        if (index == Animations.state)
            return;
    
        Animations.inAnimation = true;
        
        if (index == -1) {
            Animations.exit = true;
            Animations.onExit();
        } else if (Animations.state != -1) {
            Animations.immediateEnter = index;
            Animations.exit = true;
            Animations.onExit();
        } else {
            Animations.state = index;
            Animations.curr = Animations.elements[Animations.state];
            Animations.onEnter();
        }
    }

    static animate() {
        if (Animations.inAnimation) {
            if (Animations.exit == true) {
                Animations.animations[Animations.state].exit();
            } else {
                Animations.animations[Animations.state].enter();
            }
        }
    }

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

    doneEnter() {
        Animations.inAnimation = false;
        Animations.curr.children[0].style.opacity = "1";
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

        if (this.cam_progress == 1 && this.lookat_progress == 1) {
            this.doneEnter();
        }
    }

    doneExit() {
        if (Animations.state == 1) { // video texture for helmet
            Models.shield.material = Models.sheild_off_mat;
            Animations.models.helmet_element.pause();
        }
        Animations.curr.style.opacity = "0";
        Animations.curr = null;
        if (Animations.immediateEnter != -1) {
            Animations.state = Animations.immediateEnter;
            Animations.immediateEnter = -1;
            Animations.curr = Animations.elements[Animations.state];
            Animations.onEnter();
        } else {
            Animations.inAnimation = false;
            Animations.state = -1;
        }
        Animations.exit = false;
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

        if (this.cam_progress == 0 && this.lookat_progress == 0) {
            this.doneExit();
        }
    }
}