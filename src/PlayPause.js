

export default class PlayPause {
    static buttons = [];
    static curr = null;
    static screen = null;

    static initialize(index, material, screen, videoElement, image) {
        if (PlayPause.screen == null)
            PlayPause.screen = screen;

        PlayPause.buttons[index] = new PlayPause(material, videoElement, image);
    }

    constructor(material, videoElement, image) {
        this.playing = false;
        this.material = material;
        this.videoElement = videoElement;
        this.image = image;
    }

    static toggle(index) {
        if (PlayPause.curr != PlayPause.buttons[index]) {
            if (PlayPause.curr != null) {
                PlayPause.curr.pause();
            }
            PlayPause.curr = PlayPause.buttons[index];
            PlayPause.screen.material = PlayPause.curr.material;
            PlayPause.curr.play();
            return;
        }
        
        if (PlayPause.curr.playing) {
            PlayPause.curr.pause();
        } else {
            PlayPause.curr.play();
        }
    }

    static stop(index) {
        PlayPause.buttons[index].videoElement.pause();
        PlayPause.buttons[index].videoElement.currentTime = 0;
    }

    play() {
        this.playing = true;
        this.videoElement.play();
        this.videoElement.loop = true;
        this.image.src = "./assets/pause.png";
    }

    pause() {
        this.playing = false;
        this.videoElement.pause();
        this.image.src = "./assets/play.png";
    }
}