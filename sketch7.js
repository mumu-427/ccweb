let levels = 3;
let numCellsPerLevel = 25;
let innerRadius = 50;
let cellHeight = 40;
let cellWidth = 20;
let randomCell = { level: 0, index: 0 };
let lastFlashTime = 0;
let flashInterval = 5000; //5 seconds
let levelRadiusOffsets = [50, 100, 150, 200, 250];
let gameState = "start";
let scanAngle = 0; //scanning angle for the red triangle
let targetClicks = 3; //required clicks to enter maze page
let clickCount = 0; //player clicks on red cells
let alarmOn = false; //alarm state
let alarmSound;
let mazeSize = 13;
let mazeSizeX = 17;
let mazeSizeY = 13;
let cellSize = 40; //maze grid size
let playerPos = { x: 0, y: 0 };
let targetPos 
//= { x: mazeSizeX - 1, y: mazeSizeY - 1 };

let backgroundImage;
let walls = [];
let screenFlash = false;
let flashTime = 0;
let oldMaze = [];
let mazeUpdateTime = 2000;
let mazeTimer = 0
let mazeState = false;

let buttonPosX = 330;
let buttonPosY = 240;

function preload() {
  alarmSound = loadSound("alarm.mp3"); //make sure you have alarm sound file
  backgroundImage = loadImage("jail1.png"); //load jail.jpg
  guardImage = loadImage("guard.png"); //load guard.png
  arrowImage = loadImage("arrow.png") //load arrow.png
  bgMusic = loadSound("background.mp3");
}

function setup() {
  
    if (bgMusic) {
    bgMusic.loop(); // background music loop
  }

  
  createCanvas(600, 400);
  angleMode(DEGREES);
  frameRate(30);
  playerPos = { x: Math.floor(random(1, mazeSizeX - 1)),
                y:Math.floor(random(1, mazeSizeY - 1)) };
  targetPos = { 
        x: Math.floor(random(1, mazeSizeX - 1)), 
        y: Math.floor(random(1, mazeSizeY - 1)) };
  setupMaze();
  
}

function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "game") {
    gameScreen();
  } else if (gameState === "maze") {
    mazeScreen();
    if (playerPos.x === targetPos.x && playerPos.y === targetPos.y) {
    gameState = "start";
    alert("You caught the prisoner! Game Over.");
     //reset maze
  }
  }
}

//starting page
function startScreen() {
  //background(200);
  background(backgroundImage);
  push();
  let jailerX = frameCount % width;
  stroke(0);
  fill("red");
  ellipse(jailerX, height / 2 + 90, 30, 30);
  fill(0);
  rect(jailerX - 60, height / 2 + 75, 30, 30);
  pop();
  
  push();
  fill(255);
  textSize(22);
  textAlign(CENTER);
  textStyle(BOLD); 
  text("Catch the Escape", width / 2+30, height / 2 - 80);

  fill(92, 92, 92);
  rectMode(CENTER);
  stroke(1);
  rect(buttonPosX, buttonPosY, 90, 40, 10);
  fill(255);
  textSize(20);
  text("START", buttonPosX, buttonPosY +8);
  playerPos = { x: Math.floor(random(1, mazeSizeX - 1)),
                y:Math.floor(random(1, mazeSizeY - 1)) };
  targetPos = { 
        x: Math.floor(random(1, mazeSizeX - 1)), 
        y: Math.floor(random(1, mazeSizeY - 1)) };
  pop();
  textSize(16);
  fill(255);
  text("Click the button", width / 2-25 , height / 2 +150);
  text("to start the game", width / 2-30, height / 2 +170);
  
  push();
  scale(0.09);
  image(guardImage, 330, 1550);
  pop();
}

function mousePressed() {
  if (gameState === "start" && mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 + 30 && mouseY < height / 2 + 70) {
    gameState = "game";
    loop();
  } else if (gameState === "game") {
    checkCellClick();
  }
}

//Capture page
function gameScreen() {
  
  background(0);
  push();
  //applyMonitorFilter();

  if (millis() - flashTime > random(1000, 3000)) {
    screenFlash = true;
    flashTime = millis();
  }
  if (screenFlash) {
    applyScreenFlash();
    screenFlash = false;
  }
  
  translate(width / 2, height / 2);
  fill(255,60);
  ellipse(0, 0, innerRadius * 2+15);

  // Draw cells
  for (let level = 0; level < levels; level++) {
    let levelRadius = innerRadius + (level + 1) * 50;

    for (let i = 0; i < numCellsPerLevel; i++) {
      let angle = map(i, 0, numCellsPerLevel, 0, 360);
      let x = cos(angle) * levelRadius;
      let y = sin(angle) * levelRadius;

      push();
      translate(x, y);
      rotate(angle + 90);

      if (level === randomCell.level && i === randomCell.index && alarmOn) {
        fill(255, 0, 0);
      } else {
        fill(180);
      }

      rectMode(CENTER);
      rect(0, 0, cellWidth, cellHeight);
      fill(255);
      rect(0, 0, cellWidth * 0.7, cellHeight * 0.4);
      stroke(0);
      for (let j = -1; j <= 1; j++) {
        line(j * cellWidth * 0.3, -cellHeight * 0.2, j * cellWidth * 0.3, cellHeight * 0.2);
      }
      pop();
    }
  }

  //Rotate the scanning triangle with gradient
  push();
  rotate(scanAngle/1.2);
  
  let startColor = color(255, 0, 0, 60);
  let endColor = color(255, 0, 0, 0);
  for (let i = 0; i < innerRadius * 3; i += 5) {
  let interpolatedColor = lerpColor(startColor, endColor, i / (innerRadius * 2));
  fill(interpolatedColor);

  //for (let i = 0; i < 20; i++) {
    //let alpha = map(i, 0, 20, 150, 0);
    //fill(255, 0, 0, alpha);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(innerRadius * 3 + i, -innerRadius + i);
    vertex(innerRadius * 3 + i, innerRadius - i);
    endShape(CLOSE);
  }
  pop();
  scanAngle += 2;

  let now = millis();
  if (now - lastFlashTime > flashInterval) {
    randomCell = { 
      level: floor(random(0, levels)), 
      index: floor(random(0, numCellsPerLevel)) 
    };
    lastFlashTime = now;
    alarmOn = true;
    if (!alarmSound.isPlaying()) alarmSound.play();
  }

  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("Click red cells", 0, height / 2-205 );
  text("to stop the alarm", 0, height / 2-190 );
  applyMonitorFilter()
  pop();
}

function checkCellClick() {
  let cellAngle = 360 / numCellsPerLevel;
  let levelRadius = innerRadius + levelRadiusOffsets[randomCell.level];
  let cellX = width / 2 + cos(map(randomCell.index, 0, numCellsPerLevel, 0, 360)) * levelRadius;
  let cellY = height / 2 + sin(map(randomCell.index, 0, numCellsPerLevel, 0, 360)) * levelRadius;

  if (dist(mouseX, mouseY, cellX, cellY) < cellWidth && alarmOn) {
    alarmOn = false;
    clickCount++;
    alarmSound.stop();
    if (clickCount >= targetClicks) {
      gameState = "maze";
      //playerPos = { x: 0, y: 0 };
    }
  }
}

//maze page
function setupMaze() {
  walls = new Array(mazeSizeX);
  oldMaze = new Array(mazeSizeX)
  for (let i = 0; i < mazeSizeX; i ++) {
    walls[i] = new Array(mazeSizeY);
    oldMaze[i] = new Array(mazeSizeY);
    for (let j = 0; j < mazeSizeY; j ++) {
      walls[i][j] = false; //random to create wall cube
      oldMaze[i][j] = false; //
    }

    
  }
  for (let i = 0; i < mazeSizeX; i += int(random(1,3))) {
    for (let j = 0; j < mazeSizeY; j += int(random(1,3))) {
      walls[i][j] = random() > 0.7 ? true : false;
      oldMaze [i][j]= walls [i][j]
    }
  }
  walls[playerPos.x][playerPos.y] = false; //make sure start point no wall
  walls[targetPos.x][targetPos.x] = false; 

  changeMaze();
}

function mazeScreen() {
  background(0);
  applyMonitorFilter();


  if (millis() - flashTime > random(1000, 3000)) {
    screenFlash = true;
    flashTime = millis();
}
  if (screenFlash) {
    applyScreenFlash();
    screenFlash = false;

}
  
  translate(-0, -40); //100,10
  scale(0.7);
  
  if (int(millis() - mazeTimer) >= mazeUpdateTime) {
    mazeTimer = millis(); //update maze
    mazeState = !mazeState;
    //changeMaze();
  }
  
  // reveal different maze pattern
  if (mazeState) {
    console.log(2)
    for (let i = 0; i < mazeSizeX; i++) {
      for (let j = 0; j < mazeSizeY; j++) {
        if (walls[i][j]) {
          fill(255);
          rect(i * cellSize + 100, j * cellSize + 100, cellSize, cellSize);
        } else {
          fill(0);
          rect(i * cellSize + 100, j * cellSize + 100, cellSize, cellSize);
        }
      }
    }
  } else {
    console.log(1)
    for (let i = 0; i < mazeSizeX; i++) {
      for (let j = 0; j < mazeSizeY; j++) {
        if (oldMaze[i][j]) {
          fill(255);
          rect(i * cellSize + 100, j * cellSize + 100, cellSize, cellSize);
        } else {
          fill(0);
          rect(i * cellSize + 100, j * cellSize + 100, cellSize, cellSize);
        }
      }
    }
}
      
    push();
    scale(0.09);
    image(arrowImage, 7850, 5850);
    pop();
  
  fill("grey"); //guard
  rectMode(CENTER)
  rect(playerPos.x * cellSize + 100, playerPos.y * cellSize + 100, cellSize, cellSize);
  fill("red"); //prisoner
  //ellipseMode(CENTER)
  ellipse(targetPos.x * cellSize + 100, targetPos.y * cellSize + 100, cellSize * 1, cellSize * 1);
applyMonitorFilter();
//   if (playerPos.x === targetPos.x && playerPos.y === targetPos.y) {
//     gameState = "start";
//     alert("You caught the prisoner! Game Over.");
//      //reset maze
//   }
  
}

function changeMaze() {
  let x = 0;
  let y = 0;
  
   for (let i = 0; i < mazeSizeX; i ++) {
    for (let j = 0; j < mazeSizeY; j ++) {
      if(walls[i][j]){
        x = i+int(random(-2,2));
        y = j+int(random(-2,2));
        x = (x<0||x>mazeSizeX-1) ? i:x;
        y = (y<0||y>mazeSizeY-1) ? j:y;
        oldMaze[i][j] = false;
        oldMaze[x][y] = true;
      }
    }
  }
  oldMaze[targetPos.x][targetPos.y] = false; 
}

function keyPressed() {
  if (gameState === "start" && key === 's') {
    gameState = "game";
  } else if (gameState === "game" && key === ' ') {
    gameState = "maze";
  } else if (gameState === "maze") {
    let newX = playerPos.x;
    let newY = playerPos.y;
    if (keyCode === UP_ARROW && playerPos.y > 0) newY--;
    else if (keyCode === DOWN_ARROW && playerPos.y < mazeSizeY - 1) newY++;
    else if (keyCode === LEFT_ARROW && playerPos.x > 0) newX--;
    else if (keyCode === RIGHT_ARROW && playerPos.x < mazeSizeX - 1) newX++;

    if(mazeState){
    if (!walls[newX][newY]) { //move only in wall-free positions
      playerPos.x = newX;
      playerPos.y = newY;
    }
    }else{
      if (!oldMaze[newX][newY]) { //move only in wall-free positions
      playerPos.x = newX;
      playerPos.y = newY;
    }
  }
  }
}

// function setupMaze() {
//   walls = [];
//   for (let i = 0; i < mazeSize; i++) {
//     walls[i] = [];
//     for (let j = 0; j < mazeSize; j++) {
//       walls[i][j] = random() > 0.7 ? true : false;
//     }
//   }
//   walls[0][0] = false;
//   walls[mazeSize - 1][mazeSize - 1] = false;
// }
// function applyMonitorFilter() {
//   loadPixels();
//   for (let i = 0; i < pixels.length; i += 4) {
//     pixels[i] = pixels[i] * 0.9;
//     pixels[i + 1] = pixels[i + 1] * 0.95;
//     pixels[i + 2] = pixels[i + 2] * 1.05;
//   }
//   updatePixels();
// }

function applyMonitorFilter() {
  push();
  rectMode(CORNER)
  resetMatrix(); //reset position
let stripeHeight = 2;
for (let y = 0; y < height; y += stripeHeight * 2) {
  fill(0, 50);
  noStroke();
  rect(0, y, width, stripeHeight); //pattern
}

  //noise
  loadPixels();
for (let i = 0; i < pixels.length; i += 4) {
let noiseAmount = random(-20, 20);
  pixels[i] += noiseAmount;
  pixels[i + 1] += noiseAmount;
  pixels[i + 2] += noiseAmount;
}
  updatePixels();
  
  pop();
}

function applyScreenFlash() {
  push();
  rectMode(CORNER)
  fill(255, 255, 255, 50);
  rect(0, 0, width, height);
  pop();
}

// function mousePressed(){
//   console.log(mouseX, mouseY)
// }
