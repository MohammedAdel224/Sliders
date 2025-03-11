import '../css/sliders.css'

import OneSideSlider from "./oneSideSlider.js";

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.one-side-slider').forEach((oneSideSlider) => {
        new OneSideSlider(oneSideSlider);
    });
});