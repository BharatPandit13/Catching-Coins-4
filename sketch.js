var gameState = "intro";
var c = [];
var score = 0;
var timer = 0;

function preload() {
  c = loadImage("Cheese.png");
  m = loadAnimation("Mouse1.png", "Mouse2.png");
  i = loadImage("Starting.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  mouse = createSprite(915, 65, 30, 30);
  mouse.addAnimation("running", m);


  for (var i = 0; i < 100; i++) {
    var randX = Math.round(random(0, windowWidth))
    var randY = Math.round(random(0, windowHeight))
    c[i] = createSprite(randX, randY, 30, 30);
    c[i].addImage(c);
    c[i].scale = 0.1;
    drawSprites();
  }


}

function draw() {
  background(0);



  text(mouseX + ',' + mouseY, mouseX, mouseY);

  if (gameState === "intro") {
    for (var i = 0; i < 100; i++) {
      c[i].visible = false;
    }
    mouse.visible = false;
    introLevel();
  }

  if (gameState === "level1") {
    for (var i = 0; i < 100; i++) {
      c[i].visible = true;
    }
    mouse.visible = true;
    level1();
    timer = 750;
    timer = timer - frameCount;
    textSize(25);
    stroke("black")
    fill("yellow")
    strokeWeight(2);
    text("TIME: " + timer, 21, 26);
    text("SCORE: " + score, 21, 80);
    if (timer === 0) {
      gameState = "end";

    }
  }

  if (gameState === "end") {
    textSize(25);
    stroke("black")
    fill("yellow")
    strokeWeight(2);
    text("TIME: " + timer, 21, 26);
    text("SCORE: " + score, 21, 50);

    textSize(40);
    text("Press R to Restart Game", 704, 453);

if(keyDown("r")){
 location.reload();
}

  }
  drawSprites();
}

function introLevel() {
  image(i, 433, 206);

  textSize(50);
  stroke("yellow");

  strokeWeight(5);
  text("Help the Mouse eat as much cheese as possible", 722, 292);
  text("Press Space to Start", 734, 437);

  if (keyDown("space")) {
    gameState = "level1";
  }
}

function level1() {
  if (keyDown(UP_ARROW)) {
    mouse.y -= 10;
  }
  else if (keyDown(DOWN_ARROW)) {
    mouse.y += 10;
  }
  else if (keyDown(LEFT_ARROW)) {
    mouse.x -= 10;
  }
  else if (keyDown(RIGHT_ARROW)) {
    mouse.x += 10;
  }
  for (var i = 0; i < 100; i++) {
    if (mouse.isTouching(c[i])) {
      // c[i].visible = false;
      c[i].destroy();
      score = score + 1;
    }

  }
}

