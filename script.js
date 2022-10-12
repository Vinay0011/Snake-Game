const canvas = document.querySelector("#game")
const ctx=canvas.getContext('2d')


class Snake{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

let snakeBody = []
let tailLength = 0;

let speed = 8;
let SpeedX = 0;
let SpeedY = 0;
let headX = 10;
let headY = 10;
let tileCount = 20;
let tileSize = (canvas.height)/20 - 2

let fruitX=5;
let fruitY=5;

let score = 0;

let fruitAudio = new Audio("apple.wav");
let gameverAudio = new Audio("gameOver.wav");

function startGame()
{
    clearScreen();
    makeSnake();
    moveSnake();
    checkFriuouitCollision();
    if(checkBoundary())
    {
        gameverAudio.play()
        ctx.font = "30px Arial";
        ctx.fillText("Game Over ...", 150, canvas.height/2);
        return ;
    }
    drawFruits();
    setTimeout(startGame,1000/speed)
}
startGame()

function clearScreen()
{
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.height,canvas.width)
}

function makeSnake()
{
    ctx.fillStyle='orange'
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);

    ctx.fillStyle='green'
    for(let i=0;i<snakeBody.length;i++)
    {
        let body = snakeBody[i]
        ctx.fillRect(body.x*tileCount,body.y*tileCount,tileSize,tileSize);
    }

    snakeBody.push(new Snake(headX,headY));
    while(snakeBody.length>tailLength)
    {
        snakeBody.shift();
    }
}

document.body.addEventListener("keydown",keydown);

function keydown(event){
    if(event.keyCode == 37)
    {
        if(SpeedX == 1) return ;
        SpeedX = -1;
        SpeedY = 0;
    }

    if(event.keyCode == 38)
    {
        if(SpeedY == 1) return;
        SpeedY = -1;
        SpeedX = 0;
    }

    if(event.keyCode == 39)
    {
        if(SpeedX == -1) return ;
        SpeedX = 1;
        SpeedY =0;
    }

    if(event.keyCode == 40)
    {
        if(SpeedY == -1) return;
        SpeedY = 1;
        SpeedX =0;
    }
}
function moveSnake()
{
    headX += SpeedX;
    headY += SpeedY;
}

function checkBoundary()
{
    if(headX > canvas.width/tileSize+3 ||  (headX <0) || headY>canvas.height/tileSize+3 || headY<0)
        return true;
    for(let i=0;i<snakeBody.length;i++)
    {
        let body = snakeBody[i]
        if(headX == body.x && headY == body.y)
            return true;
    }
    return false;
}

function drawFruits()
{
    ctx.fillStyle='red';
    ctx.fillRect(fruitX*tileCount,fruitY*tileCount,tileSize,tileSize);
}

function checkFriuouitCollision(){
    if(headX==fruitX && headY==fruitY)
    {
        score++
        tailLength++;
        fruitAudio.play();
        fruitX=Math.floor(Math.random()*20)
        fruitY=Math.floor(Math.random()*20)
    }
}





