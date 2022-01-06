var tower,tower_Image;
var door,door_Image,doorGroup;
var climber,climber_Image,climberGroup;
var ghost,ghost_Image;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";

function preload(){
  tower_Image=loadImage("tower.png");
  door_Image=loadImage("door.png");
  climber_Image=loadImage("climber.png");
  ghost_Image=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,10,10);
  tower.addImage("tower.png",tower_Image);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghost_Image);
  ghost.scale=0.3;
  
 
}

function draw(){
  background("black");
  
  if(gameState==="play"){
    
  if(tower.y>400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
 if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
 ghost.velocityY=ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState="end"
  }
  
  spawnDoor();
  drawSprites();
  }
  
  if(gameState==="end"){
    textSize(30);
    fill("red");
    text("game Over",300,300);
  }
}

function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(200,-60,10,10);
    door.addImage(door_Image)
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
    
    climber=createSprite(200,10,10,10);
    climber.x=door.x;
    climber.addImage(climber_Image);
    climber.velocityY=1;
    climberGroup.add(climber);
    climber.lifetime=800;
    
    invisibleBlock=createSprite(300,15,10,2);
    invisibleBlock.width=climber.width;
   // invisibleBlock.height=2;
    invisibleBlock.debug=true;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=800;
    invisibleBlockGroup.add(invisibleBlock);
    
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}