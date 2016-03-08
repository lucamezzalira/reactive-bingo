import {generateNumbers} from "RandomNumberGenerator";
import Rx from "rx-lite";

const TOTAL_CALLS = 40;
const INTERVAL = 1000;

class BallsCallSystemReplay {
    constructor(){
        let numbersToCall = [];
        generateNumbers(numbersToCall, TOTAL_CALLS);	
        
        this.stream = Rx.Observable
                        .interval(INTERVAL)
                        .map((value) => {return numbersToCall[value]})
                        .take(TOTAL_CALLS)
                        .shareReplay();
    }
    
    get ballStream(){
        return this.stream;
    }
    
}

export default BallsCallSystemReplay;