import Slider from "./slider.js";
import { toPixel } from "./util.js";

class Thumb{
    #slider

    constructor(slider){
        this.#assertSlider(slider);
        this.#slider = slider;
    }

    #assertSlider(object){
        if(!(object instanceof Slider)){
            throw new TypeError("Expected a Slider, but received " + typeof object);
        }
    }

    get width(){
        const style = getComputedStyle(this.#slider.toElement());
        const thumbWidth = style.getPropertyValue('--thumb-width');
        return parseFloat(toPixel(thumbWidth));
    }
}

export default Thumb;