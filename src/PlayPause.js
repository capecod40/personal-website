

export default class PlayPause {
    static buttons = [];
    static curr = null;
    static screen = null;

    static initialize(index, material, screen, videoElement) {
        if (PlayPause.screen == null)
            PlayPause.screen = screen;

        PlayPause.buttons[index] = new PlayPause(material, videoElement);
    }

    playing;
    constructor(material, videoElement) {
        this.playing = false;
        this.material = material;
        this.videoElement = videoElement;
    }

    static toggle(index) {
        if (PlayPause.curr != PlayPause.buttons[index]) {
            if (PlayPause.curr != null) {
                PlayPause.curr.videoElement.pause();
                PlayPause.curr.playing = !PlayPause.curr.playing;
            }
            PlayPause.curr = PlayPause.buttons[index];
            PlayPause.screen.material = PlayPause.curr.material;
        }

        if (PlayPause.curr.playing) {
            PlayPause.curr.videoElement.pause();
        } else {
            PlayPause.curr.videoElement.play();
        }
        PlayPause.curr.playing = !PlayPause.curr.playing;
    }

    static stop(index) {
        PlayPause.buttons[index].videoElement.pause();
        PlayPause.buttons[index].videoElement.currentTime = 0;
    }
}