var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState="play";
var spookySound;
var score;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup= new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostImage);
  
  spookySound.loop();
  
  score=0;
}

function draw(){
  background("black");
  if(gameState==="play"){
 
    score=score+Math.round(getFrameRate()/240);
    fill("yellow");
    textSize(25);
    text("SCORE:" + score,550,30);
      
  if(tower.y>400){
    tower.y=300;
  }
 
  
  if(keyDown("left_arrow")){
    ghost.x-=3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x+=3;
  }
  
   
  if(keyDown("space")){
    ghost.velocitY=-5;
  }
  ghost.velocityY= ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="end";
  } 
  spawnDoor();
  drawSprites();
}

if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("GAME OVER",230,250);
}
}

function spawnDoor(){
  
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.x= Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climberGroup.add(climber);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlock.lifetime=800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

