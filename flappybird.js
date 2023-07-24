var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var scoredisplay = document.getElementById("score");
let playButton = document.getElementById("play");
let playAgainButton = document.getElementById("playAgain");
let label = document.getElementById("label");
let bestScore = document.getElementById("bestScore");
let time = document.getElementById("time");
console.log(time);

let second = 0;
let minutes = 0;
let milisecond = 0;

var hinhchim = new Image();
var hinhnen = new Image();
var ongtren = new Image();
var ongduoi = new Image();
hinhchim.src = "bird.png";
hinhnen.src = "hinhnen.png";
ongtren.src = "ongtren.png";
ongduoi.src = "ongduoi.png";
console.log("HÌnh nền", hinhnen.width);
var bird = {};

setInterval(() => {
    milisecond++
    if(milisecond == 100){
        second++
        milisecond = 0
    }
    if(second == 60) {
        minutes++;
        second = 0;   
    }
    timeDisplay = `${minutes < 10 ? "0" + minutes : minutes}:${second < 10 ? "0" + second : second}:${milisecond < 10 ? "0" + milisecond : milisecond}`;
}, 10);
function vechim(e){
    bird ={
        x: hinhnen.width/3,
        y: hinhnen.height/3
    }
}
function thietlap(e){
    score = 0
    scoreBefore = 0
    ong = [];
    ong[0] = {
    x:canvas.width,
    y:0,
    statusScore: false,
    statusOng: false
}
    tocDo = 2
}
function reset(e) {
    vechim()
    thietlap()
    second = 0;
    minutes = 0;
    milisecond = 0;
    timeDisplay = "00:00:00";
    time.innerHTML = "Time: " + timeDisplay;
}
function getHighScore(){
    maxScore = localStorage.getItem("highScore");
    if (maxScore === null) {
        maxScore = 0;
    } else {
        maxScore = parseInt(maxScore);
    }
    bestScore.innerHTML = `Best Score: ${maxScore}` 


}
playButton.addEventListener("click", function(e) {
    play();
    playButton.style.display = "none"
    // playButton.classList.add("hide")
})
playAgainButton.addEventListener("click", function(e){
    reset()
    play();
    label.style.display = "none"
})
hinhnen.onload = function() {
    vechim()
    context.drawImage(hinhnen,0,0)
    context.drawImage(hinhchim,bird.x,bird.y)

    let maxScore = localStorage.getItem("highScore");
    if (maxScore === null) {
        maxScore = 0;
    } else {
        maxScore = parseInt(maxScore);
    }
    bestScore.innerHTML = `Best Score: ${maxScore}` 
    getHighScore() 
}
var khoangcachgiuahaiong = 150
var khoangcachdenongduoi;
let maxScore = 0

thietlap()
function play(){
    context.drawImage(hinhnen,0,0);
    context.drawImage(hinhchim,bird.x,bird.y);

    getHighScore()

    for(i=0;i<ong.length;i++){
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        khoangcachdenongduoi = ongtren.height + khoangcachgiuahaiong;
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        
        ong[i].x -= tocDo;
        if(score > scoreBefore && score % 10 === 0 ){
            console.log("trừ đi");
            tocDo += 1;
            scoreBefore = score;            
        }
        if(ong[i].x <= canvas.width / 2 && ong[i].statusOng == false) {
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height,
                statusScore: false,
                statusOng: false
            })
            ong[i].statusOng = true;
        }                 
        if(ong[i].x <= 0)ong.splice(0,1)
        // console.log("Ong x, i", ong[i].x,);
        if(ong[i].x < bird.x && ong[i].statusScore == false ){
            score++;
            ong[i].statusScore = true;
        };

        if(score > maxScore){
            maxScore = score;
            localStorage.setItem("highScore", maxScore);
        }
        

        if(bird.y == 0 ||
        bird.y + hinhchim.height == canvas.height||
        bird.x + hinhchim.width >= ong[i].x && 
        bird.x <= ong[i].x + ongtren.width
        && (bird.y <= ong[i].y + ongtren.height||
        bird.y + hinhchim.height >= ong[i].y + khoangcachdenongduoi)    
        ){
            label.style.display = "block";
            return;
        } 
    }
    bird.y+=2;
    requestAnimationFrame(play)
    scoredisplay.innerHTML = "Score: " + score;

    time.innerHTML = "Time: " + timeDisplay;
    bestScore.innerHTML = "Best Score: " + maxScore;
}
document.addEventListener("keydown",function(e){
    if(e.code === "Space" || e.code === "Spacebar"){
        bird.y-= 80;
    }
})



