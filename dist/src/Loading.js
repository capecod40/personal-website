import Animations from "./Animations";

export default class Loading {
    static element;
    static text;
    static buttons;
    static animationReady = false;
    static modelsReady = false;

    static initialize(document) {
        Loading.element = document.getElementById("loading-screen");
        Loading.text = document.getElementById("loading-text");
        Loading.buttons = document.getElementById("buttons");
    }

    static callback() {
        if (Loading.animationReady && Loading.modelsReady) {
            Animations.onClick(-1);
            Loading.buttons.style.opacity = "1";
            Loading.element.style.opacity = "0";
        }
    }
}