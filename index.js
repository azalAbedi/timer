const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
            perimeter * timeRemaining / duration - perimeter
        );
            // the general formula of how much we should offset is as follows...
                // offset = ((perimeter * timeRemaining) / totalDuration) - perimeter
                    // START -> dasharray = perimeter and dashoffset = 0
                    // END -> dasharray = perimeter and dashoffset = -1 * perimeter
    },
    onComplete() {
        console.log('Timer is done!');
    }
});
