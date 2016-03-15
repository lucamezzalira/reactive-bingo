import BallsCallSystem from "BallsCallSystem";
import BallsCallSystemReplay from "BallsCallSystemReplay";
import Ticket from "Ticket";
import Rx from "rx-lite";

class App {
    constructor(){
    }
    
    init(){
        /*let engine = new BallsCallSystem();        
        let t1 = new Ticket("t1", engine.ballStream);        
       // let t2 = new Ticket("t2", engine.ballStream);
        
        setTimeout(()=>{
            let t2 = new Ticket("t2", engine.ballStream);
        }, 5000);
        
        
        engine.startGame();
*/
       //============================================

       
        let engine = new BallsCallSystemReplay();
        let t1 = new Ticket("t1", engine.ballStream);
        
        setTimeout(function() {
            let t2 = new Ticket("t2", engine.ballStream);
        }, 5000);
        
    }
}

export default App;