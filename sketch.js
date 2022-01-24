var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var over, overImg;
var gameState = 0;
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  overImg = loadImage("gameOver.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300,300,300);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = 1;
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);
  over = createSprite(260,200,100,100);
  over.addImage("ov", overImg);
  over.visible = false;
  
  //create coin group and climber group
  climbersGroup = createGroup();
  coinGroup = createGroup();
  
}

function draw(){
  background('blue');  
  drawSprites();
  fill("yellow")
  textSize(25);
  text("Score: "+ score, 250,30);
  
  if (gameState == 0) {    
    if(ocean.y > 270){
      ocean.y = 150;
    }
    spawnCoin();    
  }
    
  if(keyDown("space")){
    frog.velocityY = -2;
  }
  else{
    frog.velocityY = 2;
  }
  if(keyDown("left")&&frog.x>60){
    frog.x -=5;

  }
  if(keyDown("right")&&frog.x<500){
    frog.x +=5;

  }
  if(frog.isTouching(climbersGroup)){
    frog.velocityX = 0;
    frog.velocityY = 0;
  }
  if(frog.isTouching(coinGroup)){
    score = score + 1;
    coinGroup.destroyEach();
  }
  if(frog.y>450){
    gameState = 1;
    
  }

  if (gameState == 1){
    
    ocean.velocityY = 0;
    climbersGroup.destroyEach();
    coinGroup.destroyEach();  
    over.visible = true;  

  }
}
// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 200 === 0) {
    climber = createSprite(Math.round(random(50,400)),80,70,80);
    climber.addImage('climber',climberImg);
    climber.setVelocity(0,2);
    climber.scale = 0.5;
    climber.lifetime = 250;
    climbersGroup.add(climber);

    coin = createSprite(climber.x, 50,70,80);
    coin.addImage('coin',coinImg);
    coin.setVelocity(0,2);
    coin.scale = 0.1;
    coin.lifetime = 250;
    coinGroup.add(coin);
    //make the x position of the coin and climber the same
   
  }
}
