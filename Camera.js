export default class Camera {
    constructor(camera, window, home_pos) {
        this.camera = camera;
        this.window = window;
        this.home_pos = home_pos;

        camera.position.set(home_pos.x, home_pos.y, home_pos.z);
        camera.lookAt(0, 0.5, -0.15);

        camera.fov = 75;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1000;
    }
}