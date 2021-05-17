class Timer {
    constructor(durationInput, startButton, pauseButton) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    // Using an arrow function here to ensure "this" remains as the Timer object
    start = () => { 
        this.tick(); 
            // calling tick() manually before because setInterval takes a second to even start
        this.interval = setInterval(this.tick, 1000); 
            // "interval" captures the "ID" of the setInterval so we can clear it in the pause functionality, we use "this" so we can use it in other methods
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        console.log('tick');
    };
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);
