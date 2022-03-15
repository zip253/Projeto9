var caminho,ciclista;
var p1,p2,p3;
var imgcaminho,imgracer,imgracer2;

var imgpink,img2pink;
var imgyel,img2yel;
var imgred,img2red;
var imggo,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  imgcaminho = loadImage("Road.png");
  imgracer = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  imgracer2= loadAnimation("mainPlayer3.png");
  
  imgpink = loadAnimation("opponent1.png","opponent2.png");
  img2pink = loadAnimation("opponent3.png");
  
  imgyel = loadAnimation("opponent4.png","opponent5.png");
  img2yel = loadAnimation("opponent6.png");
  
  imgred = loadAnimation("opponent7.png","opponent8.png");
  img2red = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  imggo = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
caminho=createSprite(100,150);
caminho.addImage(imgcaminho);
caminho.velocityX = -5;

//creating boy running
ciclista  = createSprite(70,150);
ciclista.addAnimation("SahilRunning",imgracer);
ciclista.scale=0.07;
  
//set collider for mainCyclist

//mainCyclist.setCollission("rectangle",0,0,40,40);
ciclista.setCollider("rectangle",0,0,40,40);
//mainCyclist.setCollission("rectangle",0,0,40,40,50);
//mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(imggo);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   caminho.velocityX = -(6 + 2*distance/150);
  
   ciclista.y = World.mouseY;
  
   edges= createEdgeSprites();
   ciclista .collide(edges);
  
  //code to reset the background
  if(caminho.x < 0 ){
    caminho.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(ciclista)){
     gameState = END;
     p1.velocityY = 0;
     p1.addAnimation("opponentPlayer1",img2pink);
    }
    
    if(yellowCG.isTouching(ciclista)){
      gameState = END;
      p2.velocityY = 0;
      p2.addAnimation("opponentPlayer2",img2yel);
    }
    
    if(redCG.isTouching(ciclista)){
      gameState = END;
      p3.velocityY = 0;
      p3.addAnimation("opponentPlayer3",img2red);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    caminho.velocityX = 0;
    ciclista.velocityY = 0;
    ciclista.addAnimation("SahilRunning",imgracer2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    // if(keyDown("UP_ARROW")) {
    //   reset;
    // }

    // if(key("UP_ARROW")) {
    //   reset();
    // }

    // if(keyDown()) {
    //   reset();
    // }

    if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        p1 =createSprite(1100,Math.round(random(50, 250)));
        p1.scale =0.06;
        p1.velocityX = -(6 + 2*distance/150);
        p1.addAnimation("opponentPlayer1",imgpink);
        p1.setLifetime=170;
        pinkCG.add(p1);
}

function yellowCyclists(){
        p2 =createSprite(1100,Math.round(random(50, 250)));
        p2.scale =0.06;
        p2.velocityX = -(6 + 2*distance/150);
        p2.addAnimation("opponentPlayer2",imgyel);
        p2.setLifetime=170;
        yellowCG.add(p2);
}

function redCyclists(){
        p3 =createSprite(1100,Math.round(random(50, 250)));
        p3.scale =0.06;
        p3.velocityX = -(6 + 2*distance/150);
        p3.addAnimation("opponentPlayer3",imgred);
        p3.setLifetime=170;
        redCG.add(p3);
}

//function reset{
//  gameState = END;
//  gameOver.visible = false;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 0;
// }

//function reset{
//  gameState = PLAY;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroy();
//  yellowCG.destroy();
//  redCG.destroy();
  
//  distance = 0;
// }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  ciclista.addAnimation("SahilRunning",imgracer);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
 }

//function reset(){
//  gameState = END;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 50;
// }


