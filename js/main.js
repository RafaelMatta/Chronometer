const labelTimer = document.getElementById("timer");
const labelTime = document.getElementById("time");
const labelScore = document.getElementById("score");
const labelPosition = document.getElementById("position");

const btnPlayPause = document.getElementById("play");
const btnLapStop = document.getElementById("lap");

let globalTimer, lapTimer, lapScore;
let isTimePaused = false;
let laps = [];


const startTimer = function () {
    let time = 0, lapTime = 0;

    const tick = function () {
        const miliseconds = `${time % 100}`.padStart(2, 0);
        const seconds = `${Math.trunc(time / 100 % 60)}`.padStart(2, 0);
        const minutes = `${Math.trunc(time / 100 / 60 % 60)}`.padStart(2, 0); 
        const hours = `${Math.trunc(time / 100 / 60 / 60)}`.padStart(2, 0);
        
        return `${hours}:${minutes}:${seconds}.${miliseconds}`;
    }
    
    globalTimer = setInterval(() => {
        labelTimer.innerText = tick();
        if (!isTimePaused) time++;
    }, 10);
    
    lapTimer = setInterval(() => {
        lapScore = `+ ${tick()}`;
        if (!isTimePaused) lapTime++;
    }, 10);
}

const pauseTimer = function () {
    isTimePaused = !isTimePaused;
}

const stopTimer = function () {
    btnLapStop.style = `
    left: 50%;
    transform: translate(-50%, -50%);`
    
    btnPlayPause.style = `
    left: 50%;
    transform: translate(-50%, -50%);`

    resetTimer();
}

const resetTimer = function () {
    if (globalTimer) {
        clearInterval(globalTimer);
        clearInterval(lapTimer);
        globalTimer = null;
        labelTimer.innerText = '00:00.00'
        laps = [];
    }
}

const changeIcon = function (btn, icon) {
    btn.innerHTML = `
        <svg class="button__icon">
            <use xlink:href="assets/icons/icons.svg#${icon}"/>
        </svg>
    `
}

const changeToPause = function (){
    changeIcon(btnPlayPause, "play");
    pauseTimer();
    changeToStop();

    btnPlayPause.setAttribute('onclick', 'changeToPlay()');
}

const changeToPlay = function (){
    if (!globalTimer){
        btnLapStop.style = `
            left: 0;
            transform: translate(0, -50%);`
        btnPlayPause.style = `
            left: 100%;
            transform: translate(-100%, -50%);`

        startTimer();
    }

    changeIcon(btnPlayPause, "pause");
    pauseTimer();
    changeToLap();

    btnPlayPause.setAttribute('onclick', 'changeToPause()');
}

const changeToLap = function (){
    changeIcon(btnLapStop, "flag");

    btnLapStop.setAttribute('onclick', 'addLap()');
}

const changeToStop = function (){
    changeIcon(btnLapStop, "stop");

    btnLapStop.setAttribute('onclick', 'stopTimer()');
}

btnPlayPause.addEventListener("click", changeToPause());
btnLapStop.addEventListener("click", changeToLap());