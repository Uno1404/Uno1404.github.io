const canvas = document.getElementById("snake");
const contex = canvas.getContext("2d");
const atom = 32;
const fImg = new Image();
const hImg = new Image();
const bImg = new Image();
let dying = new Audio();
let eating = new Audio();
let snake = [];
let fly;
let score = 0;
let dir;
let speed;
speed = 100;
fly = {x : Math.floor(Math.random()*17+1) * atom, y : Math.floor(Math.random()*15+3) * atom}
snake[0] = {x : Math.floor(Math.random()*17+1) * atom, y : Math.floor(Math.random()*15+3) * atom}
hImg.src = "img/snake/headl_.svg";
fImg.src = "img/item_fly.svg";
bImg.src = "img/snake/body_.svg";
dying.src = "audio/dying.mp3";
eating.src = "audio/eating.mp3";
document.addEventListener("keydown",direction);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function direction(event){
    let key = event.keyCode;
    if(key == 37 && dir != "R"){
        dir = "L";
        hImg.src = "img/snake/headl_.svg";
    }
    else if(key == 38 && dir != "D"){
        dir = "U";
        hImg.src = "img/snake/headu_.svg";
    }
    else if(key == 39 && dir != "L"){
        dir = "R";
        hImg.src = "img/snake/headr_.svg";
    }
    else if(key == 40 && dir != "U"){
        dir = "D";
        hImg.src = "img/snake/headd_.svg";
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

async function draw(){
  contex.fillStyle = '#313E6C';//'#5a5e69';
      contex.fillRect(0,0,608,608);
      contex.fillStyle = '#8EC019';//'#7a7e6d';
      contex.fillRect(atom,3*atom,17*atom,15*atom);

    for(let i = 0; i < snake.length ; i++){
        if (i==0) contex.drawImage(hImg, snake[i].x, snake[i].y, atom, atom)
        else contex.drawImage(bImg, snake[i].x, snake[i].y, atom, atom)
      }
    contex.drawImage(fImg, fly.x, fly.y, atom, atom);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( dir == "L") snakeX -= atom;
    if( dir == "U") snakeY -= atom;
    if( dir == "R") snakeX += atom;
    if( dir == "D") snakeY += atom;

    if(snakeX == fly.x && snakeY == fly.y){
        score++;
        eating.play();
        fly = {
            x : Math.floor(Math.random()*17+1) * atom,
            y : Math.floor(Math.random()*15+3) * atom
        }
    }
    else snake.pop();

    let newHead = {x : snakeX, y : snakeY}

    if(snakeX < atom || snakeX > 17 * atom || snakeY < 3*atom || snakeY > 17*atom || collision(newHead,snake)){
        clearInterval(game);
        dying.play();
        contex.fillStyle = '#000000';
        for (var i = 0; i < 5*atom; i++) {
          await sleep(10);
          contex.fillRect(0,4*i,608,4*atom);
        }
        await sleep(100);
        alert("GAME OVER!\nTotal Score: " + score);
        document.location.reload();
    }
    snake.unshift(newHead);
    contex.fillStyle = "white";
    contex.font = "45px Arial";
    contex.fillText(score,atom,2.5*atom);
    contex.fillText(" x ",2.5*atom,2.5*atom);
    contex.drawImage(fImg, 4*atom, 1*atom, 2*atom, 2*atom);
    contex.font = "60px Arial";
    contex.fillText("SNAKE", 11.5*atom, 2.5*atom);
}

let game = setInterval(draw,speed);
