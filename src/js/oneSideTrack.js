import { assertBetween0And100 } from "./util.js";
import Track from "./track.js";

class OneSideTrack extends Track{
    fill(percent){
        assertBetween0And100(percent);
        const track = this.toElement();
        track.style.setProperty('--fill-percent', `${percent}%`);
    }
}

export default OneSideTrack;