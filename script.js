//board 
let board;
let boardWidth = 360;
let boardHeight = 576;
let context ;

//Movement
let moveX =0 ;
let moveY = 0;
let gravity = 0.4;

let initialMoveY = -8;

//doodler 
let doodlerRightImage;
let doodlerLeftImage;
let doodlerWidth =46;
let doodlerHeight = 46;
let doodlerX = boardWidth /2 - doodlerWidth-2;
let doodlerY = boardHeight *7 /8 - doodlerHeight ;

let doodler ={
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight
}


//platform 
let platformWidth = 60;
let platformHeight = 18;
let platformImage;
let platformArray = [];
//game score 
    let score = 0;
    let maxScore = 0;
// gameover 
let gameOver = false;
window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
    // doodler Right image 
    doodlerRightImage = new Image();
    doodlerRightImage.src = "./doodler-right.png";
     doodler.img = doodlerRightImage;
     doodlerRightImage.onload = function(){
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
     }
  // doodler left image
     doodlerLeftImage = new Image();
     doodlerLeftImage.src = "./doodler-left.png";
  // platform image
  platformImage = new Image();
  platformImage.src = "./platform.png";
  // create platforms
   placePlatform();

     requestAnimationFrame(updateGame);
     document.addEventListener("keydown", moveDoodler);

}

function updateGame(){
    requestAnimationFrame(updateGame);
    context.clearRect(0,0, boardWidth, boardHeight); //clear the board
    //console.log(updateGame);
    doodler.x += moveX;
    if(doodler.x > boardWidth){
        doodler.x = 0;
    }else if(doodler.x + doodler.width < 0){
           doodler.x = boardWidth;
    }
    moveY += gravity;
    doodler.y += moveY;
   // console.log( doodler.x);
  context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

   for(let i=0; i< platformArray.length; i++){
     let platform = platformArray[i];
     if(moveY < 0 && doodler.y < boardHeight *3/4){
        platform.y -= initialMoveY;
     }
     if(collisionPlatform(doodler, platform) && moveY >= 0){
        moveY = initialMoveY;
     }
     context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);

   }
   while(platformArray.length > 0 && platformArray[0].y >= boardHeight){
     platformArray.shift();
     newPlatform();
   }
  if(doodler.y > boardHeight){
    gameOver = true;
    document.getElementById("stratAgain").style.display = "block";
  }
   showScore();
   context.fillStyle = "black";
   context.fillText("Score: " + score , 10, 20);
   context.font = "16px Arial";
   if(gameOver){
     context.fillStyle = "red";
     context.fillText("Game Over! Press 'space' to Restart", boardWidth/7, boardHeight *7 /8);
   }

}
function moveDoodler(e){

    if(e.code == "ArrowLeft"){
        console.log("arrowLeft");
        moveX = -4;
        doodler.img =  doodlerLeftImage;
    }else if(e.code == "ArrowRight"){
        console.log("arrowRight");
        moveX = 4;
        doodler.img = doodlerRightImage;
    }else if(e.code == "Space" && gameOver){
        document.getElementById("stratAgain").style.display = "none";
     doodler = {
        img: doodlerRightImage,
        x: doodlerX,
        y: doodlerY,
        width: doodlerWidth,
        height: doodlerHeight
     }
     moveX = 0;
     moveY =0;
     score = 0;
     maxScore =0;
     gameOver = false;
     placePlatform(); 
 
    }
}
function placePlatform(){
    platformArray = [];
    let pltForm ={
        img: platformImage,
        x:boardWidth /2 -30,
        y: boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(pltForm);
   for(let i=0; i<6; i++){
    let rendomX = Math.floor(Math.random() * boardWidth *3 /4);
    pltForm ={
        img: platformImage,
        x:rendomX,
        y: boardHeight - 75 *i - 120,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(pltForm);
   }
 
}
function newPlatform(){
    let randomX = Math.floor(Math.random() * boardWidth *3/4);
    let pltForm ={
        img: platformImage,
        x:randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(pltForm);
}

function collisionPlatform(doodler, platform){
     return doodler.x < platform.x + platform.width &&
            doodler.x + doodler.width > platform.x &&
            doodler.y < platform.y + platform.height &&
            doodler.y + doodler.height > platform.y;
}
function showScore(){
   let point =Math.floor(Math.random() * 50);
     if(moveY < 0){
        maxScore += point;
        if(score < maxScore){
            score += maxScore;
        }
     }else if(moveY >=0){
        maxScore -= point;

     }
}

//for mobile functionality

function stratAgain(){
    document.getElementById("stratAgain").style.display = "none";
    doodler = {
        img: doodlerRightImage,
        x: doodlerX,
        y: doodlerY,
        width: doodlerWidth,
        height: doodlerHeight
    }
    moveX = 0;
    moveY = initialMoveY;
    score = 0;
    maxScore =0;
    gameOver = false;
    placePlatform();
}

function leftArrow(){ moveX = -4;}
function rightArrow() {moveX = 4;}