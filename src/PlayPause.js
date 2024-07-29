export default class PlayPause {
  static buttons = [];
  static curr = null;
  static screen = null;
  static off_material = null;

  static initialize(
    index,
    material,
    screen,
    videoElement,
    image,
    off_material
  ) {
    if (PlayPause.screen == null) PlayPause.screen = screen;
    if (PlayPause.off_material == null) PlayPause.off_material = off_material;

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
    if (PlayPause.buttons[index] == PlayPause.curr) {
      PlayPause.curr = null;
      PlayPause.buttons[index].pause();
      PlayPause.buttons[index].videoElement.currentTime = 0;
      PlayPause.screen.material = PlayPause.off_material;
    }
  }

  play() {
    this.playing = true;
    this.videoElement.play();
    this.videoElement.loop = true;
    this.image.src = "../assets/pause.png";
  }

  pause() {
    this.playing = false;
    this.videoElement.pause();
    this.image.src = "../assets/play.png";
  }
}
