import * as THREE from 'three'

export default class Animations {

    static inAnimation = false;
    static exit = false;
    static state = -1;
    static immediateEnter = -1;
    static animations = [];

    static projects;
    static extras;
    static about;
    static curr;

    static initialize(scene, camera, home_pos, document, window) {
        // 0: projects
        // 1: extras
        // 2: about

        this.animations[0] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( -1.13, 1.05, -1.8 ) ], 
                new THREE.Vector3( -1.1, 1.03, -2.2 ),  0.01, 0.01, 0.01, false
        )

        this.animations[1] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( -1.5, 1.4, 0.4 ) ], 
                new THREE.Vector3( 0.8, 1, 0.9 ), 0.015, 0.015, 0.015, false
        )

        this.animations[2] = new Animations(scene, camera, 
            [	home_pos,
                new THREE.Vector3( 1.2, 0.7, -2.2 ) ], 
                new THREE.Vector3( 1.4, 0.5, -1.4 ), 0.01, 0.01, 0.01, false
        )

        Animations.projects = document.getElementById("projects");
        Animations.extras = document.getElementById("extras");
        Animations.about = document.getElementById("about");

        this.window = window;
        window.onClick = this.onClick;
    }

    static onClick(index) {
        if (index == Animations.state)
            return;
    
        Animations.inAnimation = true;
        
        if (index == -1) {
            Animations.exit = true;
        } else if (Animations.state != -1) {
            Animations.immediateEnter = index;
            Animations.exit = true;
        } else {
            Animations.state = index;
        }
    }

    static animate() {
        if (Animations.inAnimation) {
            if (Animations.exit == true) {
                Animations.animations[Animations.state].exit();
                // Animations.curr.style.display = "none";
            } else {
                Animations.animations[Animations.state].enter();
                switch (Animations.state) {
                    case 0:
                        // Animations.projects.style.display = "block";
                        Animations.curr = Animations.projects;
                        break;
                    case 1:
                        // Animations.extras.style.display = "block";
                        Animations.curr = Animations.extras;
                        break;
                    case 2:
                        // Animations.about.style.display = "block";
                        Animations.curr = Animations.about;
                        break;
                }
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
            Animations.inAnimation = false;
            Animations.immediateEnter = -1;
            Animations.projects.classList.toggle("active");
            console.log(Animations.projects);
        }
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
            if (Animations.immediateEnter != -1) {
                Animations.state = Animations.immediateEnter;
            } else {
                Animations.inAnimation = false;
                Animations.state = -1;
            }
            Animations.exit = false;
        }
    }
}