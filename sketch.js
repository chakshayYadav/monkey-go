var monkey, monkey_running;
var ground,groundImage;

var scene,sceneImage;


var banana, bananaG, bananaImage;
var stone, stoneG, stoneImage;

var gameOver;
var score=0;


function preload(){
  sceneImage=loadImage("jungle.jpg");
  
  monkey_running  =  loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
   monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  scene=createSprite(0,0,800,400);
  scene.addImage(sceneImage);
  scene.scale=1.5;
  scene.x=scene.width/2;
  scene.velocityX=-4;
  

  
 bananaG = new Group();
 stoneG = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  if(scene.x<100){
    scene.x=scene.width/2;
  }
  
  
    if(bananaG.isTouching(monkey)){
      bananaG.destroyEach();
    score = score + 3;
    }
  
  
    switch(score){
        case 10: monkey.scale=0.13;
                break;
        case 20: monkey.scale=0.15;
                break;
        case 30: monkey.scale=0.17;
                break;
        case 40: monkey.scale=0.19;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(stoneG.isTouching(monkey)){ 
        monkey.scale=0.08;
     
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
     banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -7;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    bananaG.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    stone = createSprite(800,350,10,40);
    stone.velocityX = -6;
    stone.addImage(stoneImage);
    
    //assign scale and lifetime to the obstacle     
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each obstacle to the group
    stoneG.add(stone);
  }
}


  
