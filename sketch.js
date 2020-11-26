var background1;
var gravity = 0.3;
var score = 0;
var door = [];

var doors;
var points = 0;
var you_lose,you_win;
var loser;

var gameState = "START";
function preload() {
background1 = loadImage("tower.png");
ghost = loadImage("ghost-standing.png");
door = loadImage("door.png");
sound = loadSound("spooky.wav");
jumper = loadImage("ghost-jumping.png");
coins = loadImage("netclipart.com-falling-coins-clipart-437662.png")
you_lose =loadImage("you-lose-comic-speech-bubble-cartoon-clipart-vector_csp38170951.jpg");
you_win = loadImage("you-win-text-sign-explosion-blast-as-game-symbol-comic-humor-winner-competition-vector-flat-cartoon-image-166212481.jpg");
climber1 = loadImage("climber.png");
}

function setup() {
createCanvas(400,400);
  backer = createSprite(200,-200);
backer.addImage(background1);
backer.velocityY = 2;
  
ghoster = createSprite(180,200,50,50);
ghoster.addImage(ghost);
ghoster.scale = 0.3;



coinG = new Group();
doorG = new Group();
climberG = new Group();
invirG = new Group();
loser = createSprite(200,200);
loser.addImage(you_lose);
loser.scale = 1.2;
loser.visible = 0;

winner = createSprite(200,240);
winner.addImage(you_win);
winner.scale = 0.3;
winner.visible = 0;
  
sound.play();
sound.setVolume(0.5);
}

function draw() {
background(0);

drawSprites();
  ghoster.setCollider("rectangle",0,20,30,30)
  if (gameState === "START"){
   score = score + floor(getFrameRate()/30);
if (backer.y > backer.height/2){
  backer.y = -200;
}
  if (ghoster.y>400){
    ghoster.destroy();
sound.stop();
    backer.visible = 0;

    score = 0;
    points = 0;
        loser.visible = 1;
    gameState = "STOP";
  }
  if (ghoster.y < 0){
    ghoster.destroy();
 sound.stop();
   
    loser.visible = 1;
     score = 0;
    points = 0;
    gameState = "STOP";
  }
 
     fill("white") 
  text("TIME SPENT: " + score,300,30)
  text("SCORE: " + points,50,30);
  text("HOPE THAT YOU ENJOY THE GAME!!!",100,10);
if (keyWentDown("space")){
 
  ghoster.velocityY = -2;
ghoster.addImage(jumper);
}
  if (keyWentUp("space")){
    ghoster.addImage(ghost);
  }
  if (keyWentDown(RIGHT_ARROW)){
    ghoster.velocityX = 2;
    
  }
   if (keyWentUp(RIGHT_ARROW)){
   ghoster.velocityX = 0;
  }
  if (keyWentDown(LEFT_ARROW)){
    ghoster.velocityX = -2;
    
  }
   if (keyWentUp(LEFT_ARROW)){
   ghoster.velocityX = 0;
  }
ghoster.velocityY += gravity;
  

  
  

  if (World.frameCount % 50 === 0){
    rand =floor(random(1,3));
    x =random(100,300);
    y = random(100,200);
    if (rand === 1){
    doors = createSprite(x,y,10,10);
    doors.addImage(door);
    doors.velocityY = 2;
    doorG.add(doors);
     ghost.depth = door.depth;
      ghost.depth+= 1;
    var climber = createSprite(x,y+ 60,10,10);
      climber.addImage(climber1);
      climber.scale =0.5;
climber.velocityY = 2;
      climberG.add(climber);
      climber.debug = 1;
    
      var invir = createSprite(x,y+ 20,50,2);
      invir.velocityY = 2;
      invirG.add(invir);
      invir.debug = 1;
   
    }
    if (rand === 2){
     
      var coin = createSprite(random(100,300),random(100,200),10,10);
      coin.addImage(coins);
      coin.scale = 0.03;
      coin.velocityY = 2;
      
    coinG.add(coin);
    }
  }
  }
  if (gameState === "STOP"){
      coinG.destroyEach();
      doorG.destroyEach();
      ghoster.destroy();
      backer.destroy();
      loser.visible = 1;
      sound.stop();
    }
  if (points > 10){
        ghoster.destroy();
sound.stop();
    backer.visible = 0;
 brail = 1000000; 
    score = 0;
    points = 0;
    winner.visible = 1;
    gameState = "STOP";
  }

  if (gameState === "START"){
  if (coinG.isTouching(ghoster)){
    points = points + 1;
    coinG.destroyEach();
    
  }
    if (ghoster.isTouching(climberG)){
     points = 0;
    gameState = "STOP";
    }
    if (invirG.isTouching(ghoster)){
      ghoster.collide(invirG)
      
    }
  }

}
