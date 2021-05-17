class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    // Using an arrow function here to ensure "this" remains as the Timer object
    start = () => { 
        if (this.onStart) {
            this.onStart(this.timeRemaining); // <-- we pass in the inital timer setting so we know totalDuration for the offset animation in index.js
        }
        this.tick(); 
            // calling tick() manually before because setInterval takes a second to even start
        this.interval = setInterval(this.tick, 20); // reduced from 1000 to 20 for smoother animation of the circle SVG 
            // "interval" captures the "ID" of the setInterval so we can clear it in the pause functionality, we use "this" so we can use it in other methods
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.02; // reduced from 1 to 20ms to match the new setInterval every 50 ms in start()
            if (this.onTick) {
                this.onTick(this.timeRemaining);
                    // passing in this.timeRemaining so it can be used in index.js for the offset calculation formula
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
            // using parseFloat > parseInt for eventual use of decimals in our timer
    };

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(1);
            // added toFixed so we avoid weird rounding errors and repeating 9s on the timer clock
    };
}