/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/util.js
function toPixel(value, context = document.documentElement) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = value;
    context.appendChild(div);
    let pixels = div.offsetWidth;
    context.removeChild(div);
    return `${pixels}px`;
}

function assertHtmlElement(object){
    if(!(object instanceof Element)){
        throw new TypeError("Expected an HTML element, but received " + typeof object);
    }
}

function assertBetween0And100(number){
    if (typeof number !== "number" || isNaN(number)) {
        throw new Error("Invalid input: Value must be a number.");
    }
    if (number < 0 || 100 < number) {
        throw new Error("Invalid input: Number must be between 0 and 100.");
    }
}
;// ./src/js/track.js


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

/* harmony default export */ const track = (Track);
;// ./src/js/oneSideTrack.js



class OneSideTrack extends track{
    fill(percent){
        assertBetween0And100(percent);
        const track = this.toElement();
        track.style.setProperty('--fill-percent', `${percent}%`);
    }
}

/* harmony default export */ const oneSideTrack = (OneSideTrack);
;// ./src/js/thumb.js



class Thumb{
    #slider

    constructor(slider){
        this.#assertSlider(slider);
        this.#slider = slider;
    }

    #assertSlider(object){
        if(!(object instanceof js_slider)){
            throw new TypeError("Expected a Slider, but received " + typeof object);
        }
    }

    get width(){
        const style = getComputedStyle(this.#slider.toElement());
        const thumbWidth = style.getPropertyValue('--thumb-width');
        return parseFloat(toPixel(thumbWidth));
    }
}

/* harmony default export */ const thumb = (Thumb);
;// ./src/js/slider.js



class Slider{
    #slider;
    #thumb;

    constructor(element){
        assertHtmlElement(element);
        this.#slider = element;
        this.#thumb = new thumb(this);
    }

    #updateCSS
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
        return this.#thumb.width;
    }
}

/* harmony default export */ const js_slider = (Slider);
;// ./src/js/oneSideSlider.js




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
        this.#track = new oneSideTrack(track);
        this.#slider = new js_slider(slider);
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

/* harmony default export */ const js_oneSideSlider = (OneSideSlider);
;// ./src/js/index.js




document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.one-side-slider').forEach((oneSideSlider) => {
        try{
            new js_oneSideSlider(oneSideSlider);
        }
        catch(error){
            console.error(error);
        }
    });
});
/******/ })()
;