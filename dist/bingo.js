"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = (function () {
    function App() {
        _classCallCheck(this, App);
    }

    App.prototype.init = function init() {
        /*let engine = new BallsCallSystem();        
        let t1 = new Ticket("t1", engine.ballStream);        
        // let t2 = new Ticket("t2", engine.ballStream);
        
        setTimeout(()=>{
            let t2 = new Ticket("t2", engine.ballStream);
        }, 5000);
        
        
        engine.startGame();
        */
        //============================================

        var engine = new BallsCallSystemReplay();
        var t1 = new Ticket("t1", engine.ballStream);

        setTimeout(function () {
            var t2 = new Ticket("t2", engine.ballStream);
        }, 5000);
    };

    return App;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOTAL_CALLS = 40;
var INTERVAL = 3000;

var BallsCallSystem = (function () {
    function BallsCallSystem() {
        _classCallCheck(this, BallsCallSystem);

        var numbersToCall = [];
        generateNumbers(numbersToCall, TOTAL_CALLS);

        var stream = Rx.Observable.interval(INTERVAL).map(function (value) {
            return numbersToCall[value];
        }).take(TOTAL_CALLS);

        this.published = stream.publish();
    }

    BallsCallSystem.prototype.startGame = function startGame() {
        this.published.connect();
    };

    _createClass(BallsCallSystem, [{
        key: "ballStream",
        get: function get() {
            return this.published;
        }
    }]);

    return BallsCallSystem;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOTAL_CALLS = 40;
var INTERVAL = 1000;

var BallsCallSystemReplay = (function () {
    function BallsCallSystemReplay() {
        _classCallCheck(this, BallsCallSystemReplay);

        var numbersToCall = [];
        generateNumbers(numbersToCall, TOTAL_CALLS);

        this.stream = Rx.Observable.interval(INTERVAL).map(function (value) {
            return numbersToCall[value];
        }).take(TOTAL_CALLS).shareReplay();
    }

    _createClass(BallsCallSystemReplay, [{
        key: "ballStream",
        get: function get() {
            return this.stream;
        }
    }]);

    return BallsCallSystemReplay;
})();
"use strict";

function generateNumbers(arr, totalNums) {
	var num = undefined;

	if (arr.length < totalNums) {
		num = checkDuplicate(generateRandomValue(), arr);
		if (num) arr.push(num);

		generateNumbers(arr, totalNums);
	}
}

function checkDuplicate(value, arr) {
	if (arr.indexOf(value) >= 0) return;

	return value;
}

function generateRandomValue() {
	return Math.trunc(Math.random() * 99) + 1;
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOTAL_TICKET_NUMBERS = 15;

var Ticket = (function () {
    function Ticket(id, obs) {
        _classCallCheck(this, Ticket);

        this.tid = id;
        this.totalNumsCalled = [];
        this.nums = [];
        generateNumbers(this.nums, TOTAL_TICKET_NUMBERS);
        console.log(this.nums);

        obs.subscribe(this.onData.bind(this), this.onError.bind(this), this.onComplete.bind(this));
    }

    Ticket.prototype.onData = function onData(value) {
        console.log("number called", value, this.tid);
        if (this.nums.indexOf(value) >= 0) {
            this.totalNumsCalled.push(value);
            console.log(value + " is present in ticket " + this.tid);
        }
    };

    Ticket.prototype.onError = function onError(err) {
        console.log("stream error:", err);
    };

    Ticket.prototype.onComplete = function onComplete() {
        console.log("total numbers called in " + this.tid + ": " + this.totalNumsCalled.length);
        console.log(this.totalNumsCalled);
    };

    return Ticket;
})();
