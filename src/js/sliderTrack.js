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

    toElement(){
        return this.#track;
    }

    fill(){
        throw new Error("Not implemented abstract method");
    }
}

export default SliderTrack;