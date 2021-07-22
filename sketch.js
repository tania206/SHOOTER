var player, playerImgr, playerImgl;

var player_bullet, pbulletImg, bulletState;

var enemy, enemyImgr, enemyImgl;

var enemy_bullet, enemybulletImg, enemybulletState;

var bg, bgImage1;

var b1, b2, b3, b4, b5, b6, b7, b8, b9;

var s, jumplimit1;

var playerDirection;

let ground;
function preload() {
  playerImgr = loadImage("Images/player_right0.png");
  playerImgl = loadImage("Images/player_left0.png");
  pbulletImg = loadImage("Images/player_bullet0.png");
  enemyImgl = loadImage("Images/enemy_left0.png");
  enemyImgr = loadImage("Images/enemy_right0.png");
  enemybulletImg = loadImage("Images/enemy_bullet0.png");
  bg = loadImage("Images/bg2.jpg");
}

function setup() {
  createCanvas(1250, 570);

  //states
  s = "true";

  jumplimit1 = 0;

  bulletState = "false";
  enemybulletState = "false";

  //player
  player = createSprite(80, 300, 20, 20);
  player.addImage(playerImgr);
  player.setCollider("rectangle", 0, 4, 21, 25);

  //player bullet
  player_bullet = createSprite(200, 200, 15, 15);
  player_bullet.addImage("player bullet", pbulletImg);
  player_bullet.setCollider("rectangle", 0, 0, 15, 15);
  player_bullet.visible = false;
  player_bullet.scale = 0.6;

  ground = createSprite(0, 500, 100000, 10);
  // ground.addImage("bg", bg);
  ground.visible = false;
}

function draw() {
  background(0);
  image(bg, 0, -25, 1200, 600);

  if(image> 1250){
    image.x = 1100
  }

  //gravity
  player.velocityY = player.velocityY + 0.4;

  console.log(camera.position.x);
  //calling functions
  playermovement_and_shoot();
  drawSprites();
}

function playermovement_and_shoot() {
  player.collide(ground);

  //right
  if (keyDown("d")) {
    player.addImage(playerImgr);
    playerDirection = "right";
    player.x = player.x + 2.5;
    camera.position.x = camera.position.x + 2.5;
  }

  //left
  if (keyDown("a")) {
    player.addImage(playerImgl);
    playerDirection = "left";
    player.x = player.x - 2.5;
    camera.position.x = camera.position.x - 2.5;
  }

  //jump
  if (keyDown("space") && jumplimit1 < 10) {
    player.velocityY = -9;
    s = "true";
  }

  //shoot
  if (keyDown("w") && bulletState === "false") {
    player_bullet.x = player.x;
    player_bullet.y = player.y;
    if (playerDirection === "right") {
      // player.addImage(playerImgr);
      player_bullet.velocityX = 7;
    }
    if (playerDirection === "left") {
      // player.addImage(playerImgl);
      player_bullet.velocityX = -7;
    }
    player_bullet.visible = true;
    bulletState = "true";
  }

  //other jump stuff
  if (s === "true" && jumplimit1 < 40) {
    jumplimit1 = jumplimit1 + 1;
  }
  if (jumplimit1 === 40) {
    s = "false";
  }
  if (s === "false" && jumplimit1 != 0) {
    jumplimit1 = jumplimit1 - 1;
  }

  //bullet reset
  if (player_bullet.x > 600 || player_bullet.x < 0) {
    player_bullet.x = 200;
    player_bullet.y = 200;
    player_bullet.velocityX = 0;
    player_bullet.visible = false;
    bulletState = "false";
  }

  //text(crouchstate1,100,100);
}
