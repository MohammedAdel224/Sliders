import { assertHtmlElement } from "./util.js";

class SliderTrack{
    #track;

    constructor(element){
        if(new.target === SliderTrack){
            throw new Error("Cannot instantiate an abstract class");
        }
        assertHtmlElement(element);
        this.#track = element;
    }

    get width(){
        const style = getComputedStyle(this.#track);
        const width = style.getPropertyValue('width');
        return width ? parseFloat(width) : this.#track.clientWidth;
    }
    
    toElement(){
        return this.#track;
    }

    fill(){
        throw new Error("Not implemented abstract method");
    }
}

export default SliderTrack;