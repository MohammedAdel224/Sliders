import Slider from "./slider.js";
import { toPixel } from "./util.js";

class Thumb{
    #slider

    constructor(slider){
        this.#assertSlider(slider);
        this.#slider = slider;
        this.#updateCSSUnitVariable("--thumb-height", "--thumb-height-unit");
        this.#updateCSSUnitVariable("--thumb-width", "--thumb-width-unit");
    }

    #assertSlider(object){
        if(!(object instanceof Slider)){
            throw new TypeError("Expected a Slider, but received " + typeof object);
        }
    }

    #updateCSSUnitVariable(variable, unitVariable){
        const style = getComputedStyle(this.#slider.toElement());
        const value = style.getPropertyValue(variable).trim();
        let unit = value.match(/[a-z%]+$/); 
        unit = unit ? unit[0] : "px";
        this.#slider.toElement().style.setProperty(unitVariable, `1${unit}`);
    }

    get width(){
        const style = getComputedStyle(this.#slider.toElement());
        const thumbWidth = style.getPropertyValue('--thumb-width');
        return parseFloat(toPixel(thumbWidth));
    }
}

export default Thumb;