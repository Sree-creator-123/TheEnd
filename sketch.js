var monkey , monkey_running, bg, bgImg, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var fruit, obstacle;
var score, survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bgImg = loadImage("1111.jpg");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500);
  
  bg = createSprite(250, 250, 100, 100);
  bg.addImage("bg", bgImg);
  bg.scale = 2;
  bg.velocityX = -5;
  
  monkey = createSprite(50, 425, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(250, 500, 500, 50);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}


function draw() {
  background(255);
  
  if(bg.x < 0) {
    bg.x = bg.width/2;
  }
  
    if(keyDown("space") && monkey.y > 425) {
      monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
  
  
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score ++;
    }
  
  switch(score) {
    case 10: monkey.scale = 0.15;
            break;
    case 20: monkey.scale = 0.2;
            break;
    case 30: monkey.scale = 0.25;
            break;
    case 40: monkey.scale = 0.3;
            break;
  }
    
    if(obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.1;
      score = score - 5;
    }

  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
  fruits();
  
  obstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 400, 50);
}

function fruits() {
  if(frameCount % 100 == 0) {
    fruit = createSprite(530, 250, 50, 50);
    fruit.addImage("fruit", bananaImage);
    fruit.scale = 0.1;
    fruit.y = Math.round(random(200, 350));
    fruit.velocityX = -2;
    fruit.lifetime = 265;
    FoodGroup.add(fruit);
  }
}

function obstacles() {
  if(frameCount % 300 == 0) {
    obstacle = createSprite(550, 450, 50, 50);
    //obstacle.addImage("obstacles", obstacleImage);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 275;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
}




