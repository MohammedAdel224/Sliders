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
        const trackLength = this.#track.width;
        const thumbTrackLength = this.#track.width - this.#slider.thumbWidth;
        const percent = (this.#slider.value - this.#slider.min) / (this.#slider.max - this.#slider.min);
        const offset = (trackLength - thumbTrackLength) / (2 * trackLength); 
        const adjustedPercent = thumbTrackLength / trackLength * percent + offset;
        this.#track.fill(adjustedPercent * 100);
    }
}

export default OneSideSlider;