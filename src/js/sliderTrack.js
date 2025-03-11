import { assertHtmlElement } from "../util";

class SliderTrack{
    #track;
    #fillColor;
    #nofillColor;

    constructor(element){
        if(new.target === SliderTrack){
            throw new Error("Cannot instantiate an abstract class");
        }
        assertHtmlElement(element);
        this.#track = element;
        const style = getComputedStyle(this.#track);
        this.#fillColor = style.getPropertyValue('--fill-color');
        this.#nofillColor = style.getPropertyValue('--nofill-color');
    }

    toElement(){
        return this.#track;
    }

    get fillColor(){
        return this.#fillColor;
    }

    get nofillColor(){
        return this.#nofillColor
    }

    fill(){
        throw new Error("Not implemented abstract method");
    }
}

export default SliderTrack;