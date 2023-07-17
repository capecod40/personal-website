import Animations from "./Animations.js";

export default class Loading {
    static element;
    static text = [];
    static buttons;
    static animationReady = false;
    static modelsReady = false;
    static landscape = true;
    static done = false;

    static initialize(document, window) {
        Loading.element = document.getElementById("loading-screen");
        Loading.buttons = document.getElementById("buttons");
        Loading.text[0] = document.getElementById("assets-text");
        Loading.text[1] = document.getElementById("rotate-text");
        Loading.text[2] = document.getElementById("time-text");
        Loading.landscape = window.innerHeight < window.innerWidth - 200;

        if (!Loading.landscape) {
            Loading.text[1].style.display = "";
        }

        window.setTimeout(() => {
            if (!(Loading.animationReady && Loading.modelsReady)) {
                Loading.text[2].style.display = "";
            }
        }, 15000);

        window.addEventListener("resize", function (){
            Loading.landscape = window.innerHeight < window.innerWidth - 200;
            if (Loading.landscape) {
                Loading.text[1].style.display = "none";
                Loading.callback();
            } else {
                Loading.text[1].style.display = "";
            }
        })
    }

    static callback() {
        if (Loading.animationReady && Loading.modelsReady && Loading.landscape && !Loading.done) {
            Animations.onClick(-1);
            Loading.buttons.style.opacity = "1";
            Loading.element.style.opacity = "0";
            Loading.done = true;
        } else if (Loading.animationReady && Loading.modelsReady) {
            Loading.text[0].style.display = Loading.text[2].style.display = "none";
            Loading.text[1].style.display = "";
        }
    }
}