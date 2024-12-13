let speedPar = 0;//gear rotate angle

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(0);
  //mouse control speed
  let mouseSpeed = map(mouseX, 0, width, 0.5, 3);
  //mouse control position
  if (mouseX > 100 && mouseX < 500 && mouseY > 100 && mouseY < 500) {
    speedPar += mouseSpeed;
}

  //each gear
  createGear(405, 492, 200, 80, 80, 10, 0.8, true, 100, 0.4, [100, 200], [100, 200], [200, 255]); // Purple gear
  createGear(200, 200, 100, 30, 25, 12, 1.4, false, 60, 0.6, [180, 255], [100, 200], [100, 150]); // Orange gear
  createGear(360, 140, 50, 15, 15, 10, 2.8, true, 40, 1, [150, 255], [150, 255], [150, 255]); // Sand gear
  createGear(280, -230, 260, 120, 140, 8, 0.5, true, 100, 0.4, [200, 255], [200, 255], [200, 255]); // White
  createGear(3, 420, 140, 50, 45, 14, 1, false, 60, 0.6, [100, 255], [100, 200], [50, 150]); // Tawny
  createGear(45, 218, 35, 10, 8, 16, 2.8, true, 40, 1, [255, 255], [215, 215], [0, 0]); // Gold
  
if (speedPar >= 359) {
    speedPar = 0;
}

  //gear rotate without control
  speedPar += 1;  
  
  if(speedPar >= 359){
    speedPar = 0;
  }
}

function createGear(xPos, yPos, radius, sizeRecW, sizeRecH, numRectangles, speed, clockWise, gearRadius, boltRadius, colorRangeR, colorRangeG, colorRangeB) {
//use map control color
let r = map(mouseX, 0, width, colorRangeR[0], colorRangeR[1]);
let g = map(mouseY, 0, height, colorRangeG[0], colorRangeG[1]);
let b = map(mouseY, 0, height, colorRangeB[0], colorRangeB[1]);

//draw rect
for (let i = 0; i < numRectangles; i++) {
  let angle = i * (360 / numRectangles);//caculate angle of each rect

  //caculate center position of each rect
  let x = xPos + cos(angle + speed * speedPar * (clockWise ? 1 : -1)) * radius;
  let y = yPos + sin(angle + speed * speedPar * (clockWise ? 1 : -1)) * radius;

  //move rect
  push();
  translate(x, y); // Move the drawing origin to the center of the rect
  //rotate rects, make rects match the gear
  rotate(angle + speedPar * speed * (clockWise ? 1 : -1)); 
    
  //set up color
  fill(r,g,b);
  noStroke();
  rect(0, 0, sizeRecW, sizeRecH);//draw rects on new position
  pop();
}

  //main gear
  push();
  
  translate(xPos, yPos); 
  rotate(speedPar * speed * (clockWise ? 1 : -1));
  
  fill(200);
  noStroke();
  ellipse(0, 0, radius * 1.65);

  //structures of the gear
  fill(110);
  noStroke();
  ellipse(0, 0, radius * 1.2);
  fill(130);
  ellipse(0, 0, radius * 1);
  fill(150);
  ellipse(0, 0, radius * 0.4);

  fill(255);
  ellipse(0, 0, radius * 0.25);
  fill(0);
  ellipse(0, 0, radius * 0.2);
  
  pop();
  
}
