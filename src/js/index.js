import '../css/sliders.css'

import OneSideSlider from "./oneSideSlider.js";

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.one-side-slider').forEach((oneSideSlider) => {
        try{
            new OneSideSlider(oneSideSlider);
        }
        catch(error){
            console.error(error);
        }
    });
});