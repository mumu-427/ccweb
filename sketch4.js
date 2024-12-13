let tailAngle = 0;//horse's tail swings angle
let tailSpeed = 0.03;//control the speed of the horse's tail
let showTopPart = false;//control top part and flowers
let angle = 0;

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(255, 250, 190);
  noStroke();
  fill(124, 94, 71);
  rect(0, 272, 400, 340);
  
  push();//middle line
  stroke(0);
  strokeWeight(6);
  line(0, 275, 400, 275);
  pop();
  
  //bottom part
  //horse butt
  push();
  scale(0.8);
  translate(-100,370);
  
  noFill(220);
  stroke(255);
  
  //tail move
  let tailOffset = sin(tailAngle) * 10; //calculate move distance
  tailAngle += tailSpeed;
  
  bezier(300 + tailOffset, 30, 310 + tailOffset, 50, 340 + tailOffset, 40, 350 + tailOffset, 10);
  bezier(350 + tailOffset, 10, 360 + tailOffset, -20, 430 + tailOffset, -20, 450 + tailOffset, 50);
  bezier(450 + tailOffset, 50, 458 + tailOffset, 70, 460 + tailOffset, 85, 480 + tailOffset, 100);
  bezier(450 + tailOffset, 70, 460 + tailOffset, 85, 460 + tailOffset, 85, 480 + tailOffset, 100);
  bezier(450 + tailOffset, 70, 460 + tailOffset, 95, 460 + tailOffset, 105, 480 + tailOffset, 120);
  bezier(450 + tailOffset, 90, 460 + tailOffset, 105, 460 + tailOffset, 105, 480 + tailOffset, 120);
  bezier(450 + tailOffset, 90, 460 + tailOffset, 105, 460 + tailOffset, 135, 480 + tailOffset, 150);
  bezier(440 + tailOffset, 90, 460 + tailOffset, 105, 460 + tailOffset, 135, 480 + tailOffset, 150);
  bezier(440 + tailOffset, 90, 450 + tailOffset, 125, 450 + tailOffset, 155, 490 + tailOffset, 180);
  bezier(440 + tailOffset, 140, 450 + tailOffset, 165, 460 + tailOffset, 170, 490 + tailOffset, 180);
  bezier(440 + tailOffset, 140, 450 + tailOffset, 165, 450 + tailOffset, 190, 490 + tailOffset, 210);
  bezier(430 + tailOffset, 200, 430 + tailOffset, 195, 450 + tailOffset, 190, 490 + tailOffset, 210);
  bezier(430 + tailOffset, 200, 430 + tailOffset, 205, 440 + tailOffset, 220, 470 + tailOffset, 220);
  bezier(410 + tailOffset, 200, 430 + tailOffset, 205, 440 + tailOffset, 220, 470 + tailOffset, 220);
  bezier(410 + tailOffset, 200, 420 + tailOffset, 215, 440 + tailOffset, 225, 460 + tailOffset, 230);
  bezier(380 + tailOffset, 150, 400 + tailOffset, 215, 430 + tailOffset, 225, 460 + tailOffset, 230);
  bezier(380 + tailOffset, 150, 380 + tailOffset, 160, 378 + tailOffset, 160, 385 + tailOffset, 180);
  bezier(360 + tailOffset, 100, 360 + tailOffset, 160, 378 + tailOffset, 160, 385 + tailOffset, 180);
  bezier(300 + tailOffset, 57, 340 + tailOffset, 60, 360 + tailOffset, 70, 360 + tailOffset, 100);
  
  push();
  //left leg
  bezier(220,60,200,70,210,120,230,140);
  bezier(230,140,240,150,240,160,245,180);
  bezier(245,180,255,220,255,240,245,300);
  bezier(275,147,270,220,270,220,270,300);
  fill(254, 228, 206);
  stroke(124, 94, 71);
  quad(245,300,270,300,265,320,235,320);
  quad(235,320,265,320,270,325,265,330);
  quad(235,320,265,330,260,343,220,345);
  
  pop();
  
  push();
  //right leg
  bezier(285,175,295,200,295,240,290,310);//down
  bezier(315,170,310,190,310,260,315,310);
  
  bezier(230,60,220,70,230,120,270,140);
  bezier(270,140,280,150,280,150,285,170);
  bezier(310,80,300,100,300,140,310,160);
  bezier(285,170,280,190,330,190,310,160);
  fill(254, 228, 206);
  stroke(124, 94, 71);
  quad(290,310,315,310,310,330,280,330);
  quad(280,330,310,330,315,335,310,340);
  quad(280,330,310,340,308,350,265,353);
  
  pop();
  
  //butt
  fill(124, 94, 71);
  beginShape();
  vertex(200,0)
  bezierVertex(220,-40,280,-20,300,0);
  bezierVertex(320,20,320,30,310,80);
  bezierVertex(300,100,300,100,260,100);
  bezierVertex(200,95,190,35,200,0);
  endShape(CLOSE);
  
  pop();
  
  //show top part or flowers
  if (showTopPart) {
    drawTopPart();
  } else {
    drawFlowers();
  }

  drawVase(0.8);//keep vase size
}

function drawTopPart() {
  push();
  translate(-80, -20);

  noFill();
  stroke(0);
  strokeWeight(1);
  fill(44, 26, 128);
  beginShape();
  vertex(180, 180);
  bezierVertex(180, 160, 180, 120, 200, 90); 
  bezierVertex(230, 50, 300, 120, 210, 120);
  bezierVertex(205, 125, 200, 150, 200, 180);
  line(180, 180, 200, 180);
  endShape(CLOSE);
  
  //decoration
  push();
  stroke(255);
  strokeWeight(3);
  line(193,110,203,115);
  line(190,120,200,125);
  line(188,130,198,135);
  line(186,140,196,145);
  line(184,150,194,155);
  pop();
  
  //left eye
  noFill();
  ellipse(200, 60, 15, 15);
  fill(0);
  ellipse(200, 60, 7, 7);
  line(202, 68, 205, 84);
  line(193, 55, 188, 50);
  line(195, 53, 190, 48);

  //right eye
  push();
  translate(20, -5);
  noFill();
  stroke(0);
  strokeWeight(1);
  ellipse(200, 60, 15, 15);
  fill(0);
  ellipse(200, 60, 7, 7);
  line(202, 68, 203, 83);
  line(193, 55, 188, 50);
  line(195, 53, 190, 48);
  pop();

  //mouth
  stroke(255);
  strokeWeight(2);
  noFill();
  arc(235, 108, 10, 7, 0, PI);

  //
  push();
  stroke(34, 139, 34);
  strokeWeight(1);
  bezier(170,170,190,160,150,140,120,165);
  bezier(210,170,190,160,230,140,260,165);
  pop();
  
  
  angle += 0.05;
  //left
  push();
  translate(120, 175);
  rotate(angle);
  flower(0, 0, color(255, 255, 0), color(252, 167, 126), 5, 20, 15, 0);
  pop();
  
  //right
  push();
  translate(260, 175);
  rotate(angle);
  flower(0, 0, color(255, 255, 0), color(252, 167, 126), 5, 20, 15, 0);
  pop();
  
  
  pop(); 
}

function drawFlowers() {
  push();
  scale(0.8);
  flower(130, 120, color(255, 255, 0), color(252, 167, 126), 5, 35, 15, 80);
  flower(170, 142, color(255, 255, 0), color(209, 111, 126), 5, 25, 15, 40);
  flower(105, 122, color(255, 255, 0), color(209, 111, 126), 5, 20, 10, 60);
  flower(140, 75, color(255, 255, 0), color(100, 149, 237), 6, 30, 20, 110);
  flower(160, 110, color(255, 255, 0), color(148, 199, 122), 4, 20, 10, 80);
  flower(120, 150, color(255, 255, 0), color(148, 199, 122), 6, 20, 10, 80);
  flower(150, 160, color(255, 255, 0), color(225, 202, 235), 6, 20, 10, 80);
  flower(80, 150, color(255, 255, 0), color(100, 149, 237), 4, 25, 10, 0);
  flower(80, 70, color(255, 255, 0), color(100, 149, 237), 4, 10, 5, 0);
  flower(100, 90, color(255, 255, 0), color(225, 202, 235), 4, 15, 5, 0);
  flower(190, 100, color(255, 255, 0), color(252, 167, 126), 4, 12, 5, 0);
  pop();
}

function flower(x, y, coreColor, petalColor, petalCount, petalSize, coreSize, stemLength) {
  stroke(34, 139, 34);
  strokeWeight(2);
  line(x, y, x, y + stemLength);

  noStroke();
  fill(petalColor);
  let angle = TWO_PI / petalCount;
  let petalDistance = coreSize / 2;

  for (let i = 0; i < petalCount; i++) {
    let petalX = x + cos(angle * i) * petalDistance;
    let petalY = y + sin(angle * i) * petalDistance;
    ellipse(petalX, petalY, petalSize, petalSize);
  }

  fill(coreColor);
  ellipse(x, y, coreSize, coreSize);
}

//vase
function drawVase(scaleFactor) {
  push();
  scale(0.8);
  translate(140, 180);

  fill(173, 216, 230);
  stroke(255, 250, 190);
  strokeWeight(1);

  beginShape();
  vertex(-40, 0);
  bezierVertex(-15, 20, -15, 40, -50, 50);
  bezierVertex(-100, 65, -100, 95, -50, 110);
  bezierVertex(-15, 120, -15, 140, -40, 160);
  vertex(40, 160);
  bezierVertex(15, 140, 15, 120, 50, 110);
  bezierVertex(100, 95, 100, 65, 50, 50);
  bezierVertex(15, 40, 15, 20, 40, 0);
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  //change when click on the vase
  if (mouseX > 100 && mouseX < 180 && mouseY > 180 && mouseY < 220) {
    showTopPart = !showTopPart;
  }
}
