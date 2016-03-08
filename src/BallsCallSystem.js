import {generateNumbers} from "RandomNumberGenerator";
import Rx from "rx-lite";

const TOTAL_CALLS = 40;
const INTERVAL = 3000;

class BallsCallSystem {
    constructor(){
        let numbersToCall = [];
        generateNumbers(numbersToCall, TOTAL_CALLS);	
        
        let stream = Rx.Observable
                        .interval(INTERVAL)
                        .map((value) => {return numbersToCall[value]})
                        .take(TOTAL_CALLS);
                        
        this.published = stream.publish();
    }
    
    startGame(){
       this.published.connect();                            
    }
    
    get ballStream(){
        return this.published
    }
    
}

export default BallsCallSystem;