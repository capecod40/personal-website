import Animations from "./Animations.js";

export default class Loading {
    static element;
    static text;
    static buttons;
    static animationReady = false;
    static modelsReady = false;
    static landscape = true;
    static warningText;
    static normalText;

    static initialize(document, window) {
        Loading.element = document.getElementById("loading-screen");
        Loading.text = document.getElementById("loading-text");
        Loading.buttons = document.getElementById("buttons");
        Loading.landscape = window.innerHeight < window.innerWidth;
        Loading.warningText = "Loading assets...\n\n\nPlease rotate your device to landscape";
        Loading.normalText = "Loading assets...";

        if (!Loading.landscape) {
            Loading.text.textContent += "\n\n\n Please rotate your device to landscape"
        }

        window.addEventListener("resize", function (){
            Loading.landscape = window.innerHeight < window.innerWidth;
            if (Loading.landscape) {
                Loading.text.textContent = Loading.normalText;
                Loading.callback();
            } else {
                Loading.text.textContent = Loading.warningText;
            }
        })
    }

    static callback() {
        if (Loading.animationReady && Loading.modelsReady && Loading.landscape) {
            Animations.onClick(-1);
            Loading.buttons.style.opacity = "1";
            Loading.element.style.opacity = "0";
        } else if (Loading.animationReady && Loading.modelsReady) {
            Loading.text.textContent = "Please rotate your device to landscape";
        }
    }
}