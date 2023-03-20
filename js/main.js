const labelTimer = document.getElementById("timer");
const divLaps = document.querySelector(".chronometer__laptimer")
const divTicks = document.getElementById("ticks")
const btnPlayPause = document.getElementById("play");
const btnLapStop = document.getElementById("lap");

let globalTimer, lapTimer;
let globalTimerTemplate, lapTimerTemplate;
let time = 0, lapTime = 0;
let isTimePaused = false;
let laps = [];

const addLap = function () {
    laps.push({ 
        score: lapTimerTemplate, 
        time: globalTimerTemplate
    });
    resetLapTimer();
    startLapTimer();
}

const resetLapTimer = function () {
    clearInterval(lapTimer);
    lapTime = 0;
    updateLaps();
}

const updateLaps = function () {
    divLaps.innerHTML = '';
    laps.forEach((lap, index) => {
        divLaps.innerHTML += `
        <div class="chronometer__lap">
            <div class="chronometer__place">
                <svg class="chronometer__icon">
                    <use xlink:href="assets/icons/icons.svg#flag">
                </svg>
                <p class="chronometer__position" id="position">${`${index + 1}`.padStart(2,0)}</p>
            </div>
            <p class="chronometer__score" id="score">${lap.score}</p>
            <p class="chronometer__time" id="time">${lap.time}</p>
        </div>
        `
    });
}

const tick = function (time) {
    const miliseconds = `${time % 100}`.padStart(2, 0);
    const seconds = `${Math.trunc(time / 100 % 60)}`.padStart(2, 0);
    const minutes = `${Math.trunc(time / 100 / 60 % 60)}`.padStart(2, 0); 
    const hours = `${Math.trunc(time / 100 / 60 / 60)}`.padStart(2, 0);
    
    return `${hours}:${minutes}:${seconds}.${miliseconds}`;
}

const startTimer = function () {
    startGlobalTimer();
    startLapTimer();
}

const startGlobalTimer = function () {
    globalTimer = setInterval(() => {
        if (!isTimePaused) time++;
        globalTimerTemplate = labelTimer.innerText = tick(time);
    }, 10);
}

const startLapTimer = function () {
    lapTimer = setInterval(() => {
        if (!isTimePaused) lapTime++;
        lapTimerTemplate = `+ ${tick(lapTime)}`;
    }, 10);
}

const pauseTimer = function () {
    isTimePaused = !isTimePaused;
}

const stopTimer = function () {
    btnLapStop.style = `
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);`
    
    btnPlayPause.style = `
    left: 50%;
    transform: translate(-50%, -50%);`

    resetTimer();
    divTicks.classList.toggle("chronometer__ticks--spin");
}

const resetTimer = function () {
    if (globalTimer) {
        clearInterval(globalTimer);
        globalTimer = null;
        labelTimer.innerText = '00:00:00.00';
        laps = [];
        time = 0;
        resetLapTimer();
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
    divTicks.style.animationPlayState = 'paused';

    btnPlayPause.setAttribute('onclick', 'changeToPlay()');
}

const changeToPlay = function (){
    if (!globalTimer){
        btnLapStop.style = `
            left: 0;
            opacity: 1;
            transform: translate(0, -50%);`
        btnPlayPause.style = `
            left: 100%;
            transform: translate(-100%, -50%);`

        divTicks.classList.toggle("chronometer__ticks--spin");
        startTimer();
    }

    divTicks.style.animationPlayState = 'running';

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