import { assertHtmlElement } from "./util.js";

class Track{
    #track;

    constructor(element){
        if(new.target === Track){
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

export default Track;