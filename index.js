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
            this.onStart();
        }
        this.tick(); 
            // calling tick() manually before because setInterval takes a second to even start
        this.interval = setInterval(this.tick, 1000); 
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
            this.timeRemaining = this.timeRemaining - 1;
            if (this.onTick) {
                this.onTick();
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
            // using parseFloat > parseInt for eventual use of decimals in our timer
    };

    set timeRemaining(time) {
        this.durationInput.value = time;
    };
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('Timer started');
    },
    onTick() {
        console.log('Timer just ticked down');
    },
    onComplete() {
        console.log('Timer is done!');
    }
});
