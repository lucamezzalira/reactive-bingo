import Rx from "rx-lite";
import {generateNumbers} from "./RandomNumberGenerator";

const TOTAL_TICKET_NUMBERS = 15;

class Ticket {
    constructor(id, obs){        
        this.tid = id;
        this.totalNumsCalled = [];
        this.nums = [];
        generateNumbers(this.nums, TOTAL_TICKET_NUMBERS);
        console.log(this.nums);
        
        obs.subscribe(this.onData.bind(this), this.onError.bind(this), this.onComplete.bind(this));
    }
    
    onData(value){
        console.log("number called", value, this.tid);
        if(this.nums.indexOf(value) >= 0){
            this.totalNumsCalled.push(value);
            console.log(value + " is present in ticket " + this.tid);
        }  
    }
    
    onError(err){
        console.log("stream error:", err);
    }
    
    onComplete(){
        console.log("total numbers called in " + this.tid + ": " + this.totalNumsCalled.length);
        console.log(this.totalNumsCalled);
    }
    
}

export default Ticket;