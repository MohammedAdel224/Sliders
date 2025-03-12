import { assertBetween0And100 } from "./util.js";
import SliderTrack from "./sliderTrack.js";

class OneSideSliderTrack extends SliderTrack{
    fill(percent){
        assertBetween0And100(percent);
        const track = this.toElement();
        track.style.setProperty('--fill-percent', `${percent}%`);
    }
}

export default OneSideSliderTrack;