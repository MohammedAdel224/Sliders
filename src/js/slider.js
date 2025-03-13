import { assertHtmlElement, toPixel } from "./util.js"

class Slider{
    #slider;

    constructor(element){
        assertHtmlElement(element);
        this.#slider = element;
    }

    toElement(){
        return this.#slider;
    }

    addEventListener(type, listener){
        this.#slider.addEventListener(type, listener);
    }

    setValue(value){
        this.#slider.value = value;
    }

    get value(){
        return this.#slider.value;
    }

    get min(){
        return this.#slider.min | 0;
    }

    get max(){
        return  this.#slider.max | 100;
    }

    get width(){
        const style = getComputedStyle(this.#slider);
        const width = style.getPropertyValue('width');
        return width ? parseFloat(width) : this.#slider.clientWidth;
    }

    get thumbWidth(){
        const style = getComputedStyle(this.#slider);
        const thumbWidth = style.getPropertyValue('--thumb-width');
        return parseFloat(toPixel(thumbWidth));
    }
}

export default Slider;