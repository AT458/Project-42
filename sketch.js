var backImage, backgr;
var player, player_running;
var ground, ground_img;
var bananaImg, FoodGroup;
var obstacleImg, ObstacleGroup;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  backImage = loadImage("Images/jungle.jpg");

  player_running = loadAnimation("Images/Monkey_01.png", "Images/Monkey_02.png", "Images/Monkey_03.png", "Images/Monkey_04.png",
  "Images/Monkey_05.png", "Images/Monkey_06.png", "Images/Monkey_07.png", "Images/Monkey_08.png", "Images/Monkey_09.png",
  "Images/Monkey_10.png");

  bananaImg = loadImage("Images/banana.png");
  obstacleImg = loadImage("Images/stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width/2;
  ground.visible = false;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState === PLAY){

    if(backgr.x < 100) {
      backgr.x = backgr.width/2;
    }

    if(keyDown("space")) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);

    spawnFood();
    spawnObstacle();
  }

  drawSprites();
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(600, 250, 40, 10);
    obstacle.y = random(120, 200);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.05;
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    
    player.depth = obstacle.depth + 1;
    ObstacleGroup.add(obstacle);
  }
}