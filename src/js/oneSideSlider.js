import { assertHtmlElement } from "./util.js";
import OneSideSliderTrack from "./oneSideSliderTrack.js";
import Slider from "./slider.js";

class OneSideSlider{
    #slider;
    #track;

    constructor(element){
        assertHtmlElement(element);
        const track = element.querySelector(".track");
        const slider = element.querySelector("input.slider[type=range]");
        this.#init(track, slider);
    }

    #init(track, slider){
        this.#track = new OneSideSliderTrack(track);
        this.#slider = new Slider(slider);
        this.#slider.addEventListener("input", ()=>{this.#fillTrack();});
        this.#fillTrack();
    }

    #fillTrack(){
        const percent = (this.#slider.value - this.#slider.min) / (this.#slider.max - this.#slider.min) * 100;
        this.#track.fill(percent);
    }
}

export default OneSideSlider;