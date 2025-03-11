import { assertBetween0And100 } from "./util.js";
import SliderTrack from "./sliderTrack.js";

class OneSideSliderTrack extends SliderTrack{
    fill(percent){
        assertBetween0And100(percent);
        const track = this.toElement();
        track.style.background = `linear-gradient(to right, ${this.fillColor} ${percent}% , ${this.nofillColor} ${percent}%, ${this.nofillColor})`;
    }
}

export default OneSideSliderTrack;