const labelTimer = document.getElementById("timer");
const labelTime = document.getElementById("time");
const labelScore = document.getElementById("score");
const labelPosition = document.getElementById("position");

const btnPlayPause = document.getElementById("play");
const btnLapStop = document.getElementById("lap");

let timer;
let laps = [];

const startTimer = function () {
    let time = 0

    const tick = function () {
        const miliseconds = `${time % 100}`.padStart(2, 0);
        const seconds = `${Math.trunc(time / 100 % 60)}`.padStart(2, 0);
        const minutes = `${Math.trunc(time / 100 / 60 % 60)}`.padStart(2, 0); 
        const hours = `${Math.trunc(time / 100 / 60 / 60)}`.padStart(2, 0); 

        labelTimer.innerText = `${hours}:${minutes}:${seconds}.${miliseconds}`;
        time++
    }

    tick();
    timer = setInterval(tick, 10);
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
    if (timer) {
        clearInterval(timer);
        timer = null;
        labelTimer.innerText = '00:00.00'
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

    btnPlayPause.setAttribute('onclick', 'changeToPlay()');
    changeToStop();
}

const changeToPlay = function (){
    if (!timer){
        btnLapStop.style = `
            left: 0;
            transform: translate(0, -50%);`
        btnPlayPause.style = `
            left: 100%;
            transform: translate(-100%, -50%);`

        startTimer();
    }

    changeIcon(btnPlayPause, "pause");

    btnPlayPause.setAttribute('onclick', 'changeToPause()');
    changeToLap();
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