var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var scoreDisplay = document.getElementById("score");
let playButton = document.getElementById("play");
let playAgainButton = document.getElementById("playAgain");
let label = document.getElementById("label");
let bestScore = document.getElementById("bestScore");
let time = document.getElementById("time");
console.log(time);
var audioDie = new Audio('die.mp3');
var audioFlap = new Audio('flap.mp3');
var audioPoint = new Audio('point.mp3');
let second = 0;
let minutes = 0;
let milisecond = 0;

var birdPicture = new Image();
var wallet = new Image();
var pipeAbove = new Image();
var pipeBelow = new Image();
birdPicture.src = "bird.png";
wallet.src = "hinhnen.png";
pipeAbove.src = "ongtren.png";
pipeBelow.src = "ongduoi.png";
console.log("HÌnh nền", wallet.width);
var bird = {};
const milisecondOfSecond = 100
const secondOfMinute = 60
const ten = 10
setInterval(() => {
    milisecond++
    if (milisecond == milisecondOfSecond) {
        second++
        milisecond = 0
    }
    if (second == secondOfMinute) {
        minutes++;
        second = 0;
    }
    timeDisplay = `${minutes < ten ? "0" + minutes : minutes}:${second < ten ? "0" + second : second}:${milisecond < ten ? "0" + milisecond : milisecond}`;
}, 10);
function drawBird(e) {
    bird = {
        x: wallet.width / 2,
        y: wallet.height / 3
    }
}
function designGame(e) {
    score = 0
    scoreBefore = 0
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0,
        statusScore: false,
        statuspipe: false
    }
    tocDo = 2
}
function reset(e) {
    drawBird()
    designGame()
    second = 0;
    minutes = 0;
    milisecond = 0;
    timeDisplay = "00:00:00";
    time.innerHTML = "Time: " + timeDisplay;
}
function getHighScore() {
    maxScore = localStorage.getItem("highScore");
    if (maxScore === null) {
        maxScore = 0;
    } else {
        maxScore = parseInt(maxScore);
    }
    bestScore.innerHTML = `Best Score: ${maxScore}`
}
playButton.addEventListener("click", function (e) {
    playButton.style.display = "none"
    playGame();  
})
playAgainButton.addEventListener("click", function (e) {
    reset()
    playGame();
    label.style.display = "none"
})
wallet.onload = function () {
    drawBird()
    context.drawImage(wallet, 0, 0)
    context.drawImage(birdPicture, bird.x, bird.y)

    let maxScore = localStorage.getItem("highScore");
    if (maxScore === null) {
        maxScore = 0;
    } else {
        maxScore = parseInt(maxScore);
    }
    bestScore.innerHTML = `Best Score: ${maxScore}`
    getHighScore()
}
var pipeGap = 150
var gapToPipeBelow;
let maxScore = 0

designGame()
function playGame() {
    context.drawImage(wallet, 0, 0);
    context.drawImage(birdPicture, bird.x, bird.y);

    getHighScore()

    for (i = 0; i < pipe.length; i++) {
        context.drawImage(pipeAbove, pipe[i].x, pipe[i].y);
        gapToPipeBelow = pipeAbove.height + pipeGap;
        context.drawImage(pipeBelow, pipe[i].x, pipe[i].y + gapToPipeBelow);

        pipe[i].x -= tocDo;
        if (score > scoreBefore && score % 10 === 0) {
            console.log("trừ đi");
            tocDo += 1;
            scoreBefore = score;
        }
        if (pipe[i].x <= canvas.width / 2 && pipe[i].statuspipe == false) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeAbove.height) - pipeAbove.height,
                statusScore: false,
                statuspipe: false
            })
            pipe[i].statuspipe = true;
        }
        if (pipe[i].x <= 0) pipe.splice(0, 1)
        if (pipe[i].x < bird.x && pipe[i].statusScore == false) {
            score++;
            audioPoint.play();
            pipe[i].statusScore = true;
        };

        if (score > maxScore) {
            maxScore = score;
            localStorage.setItem("highScore", maxScore);
        }


        if (bird.y == 0 ||
            bird.y + birdPicture.height == canvas.height ||
            bird.x + birdPicture.width >= pipe[i].x &&
            bird.x <= pipe[i].x + pipeAbove.width
            && (bird.y <= pipe[i].y + pipeAbove.height ||
                bird.y + birdPicture.height >= pipe[i].y + gapToPipeBelow)
        ) {
            audioDie.play();
            label.style.display = "block";
            return;
        }
    }
    bird.y += 2;
    requestAnimationFrame(playGame)
    scoreDisplay.innerHTML = "Score: " + score;

    time.innerHTML = "Time: " + timeDisplay;
    bestScore.innerHTML = "Best Score: " + maxScore;
}
document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.code === "Spacebar") {
        audioFlap.play();
        bird.y -= 80;
    }
})