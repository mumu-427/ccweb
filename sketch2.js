let eyeX1 = 180; //left
let eyeY1 = 225; //left
let eyeX2 = 220; //right
let eyeY2 = 225; //right
let pupilRadius = 2; //pupilRadius
let eyeRadius = 4; //pupil movement range

let flies = [];

function setup() {
  createCanvas(400, 400);
  background(255, 205, 222); 
  noStroke();
  fill(210, 247, 173);
  ellipse(200, 400, 500, 220);
}

//fly
function mousePressed() {
  let fly = {
    x: mouseX,
    y: mouseY,
    color: [random(255), random(255), random(255)]
  };
  flies.push(fly);
}

function draw() {
  clear();
  
  background(255, 205, 222);
  fill(210, 247, 173);
  noStroke();
  ellipse(200, 400, 500, 220);

//fly  
for (let i = 0; i < flies.length; i++) {
let fly = flies[i];
  fill(fly.color);
  ellipse(fly.x, fly.y, 5, 8);

  noFill();
  stroke(0);
  strokeWeight(1);
  ellipse(fly.x + 5, fly.y - 5, 5, 8);//left
  ellipse(fly.x - 5, fly.y - 5, 5, 8);//right
  noStroke();
}
  
  push();
  translate(0, -40);
  
  //pop
  fill(156, 106, 47); // brown
  noStroke();

  //pop body
  ellipse(200, 280, 200, 70); //down
  ellipse(200, 240, 150, 70); //medium
  ellipse(200, 200, 100, 50); //top
  triangle(150, 200, 200, 160, 250, 200);
  
  //leg&feet
  stroke(2);
  line(180, 314, 180, 340);
  line(220, 314, 220, 340);
  
  let shoseHeight = mouseX;
  let shoseWidth = mouseY;
  let shoseSize = random(shoseWidth/4, shoseWidth/8);
  
  noStroke();//left
  fill(0);
  ellipse(173, 340, height/15, shoseSize/10);
  
  noStroke();//right
  fill(0);
  ellipse(227, 340, height/15, shoseSize/10);
  
  //eyelash
  noFill();
  stroke(0);
  strokeWeight(1.5);
  arc(178, 215, 10, 10, HALF_PI, PI + QUARTER_PI); //left
  arc(176, 208, 30, 30, HALF_PI, PI - QUARTER_PI); //left
  arc(222, 215, 10, 10, 0 - HALF_PI, HALF_PI); //right
  arc(224, 208, 30, 30, QUARTER_PI, HALF_PI); //right
  
  //eyes
  fill(0); //black
  ellipse(eyeX1, eyeY1, 10, 15); //left
  ellipse(eyeX2, eyeY2, 10, 15); //right
  
  //pupil move
  Pupil(eyeX1, eyeY1); //left
  Pupil(eyeX2, eyeY2); //right
  
function Pupil(eyeX, eyeY) {
let dx = mouseX - eyeX;
let dy = mouseY - eyeY;
let distance = sqrt(dx * dx + dy * dy);

  //Limit the range of pupil movement
  if (distance > eyeRadius) {
    dx = dx * eyeRadius / distance;
    dy = dy * eyeRadius / distance;
}

  //pupil(Radius control the maximum range)
  fill(255);
  noStroke();
  ellipse(eyeX + dx, eyeY + dy, pupilRadius * 2, pupilRadius * 2);
}
  
  //blusher
  let popHeight = mouseX;
  let popWidth = mouseY;
  let Size = random(popWidth / 4, popWidth / 8);
  
  noStroke();//left
  fill(255, 205, 222);
  ellipse(160, 240, height / 15, Size);
  
  noStroke();//right
  fill(255, 205, 222);
  ellipse(240, 240, height / 15, Size);
  
  // smile
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(200, 250, 10, 15, 0, PI); 
  
  //flower
  push();
  noStroke();
  fill(122, 165, 242);
  ellipse(145, 134, 10, 10);
  ellipse(154, 139, 10, 10);
  ellipse(154, 149, 10, 10); 
  ellipse(145, 154, 10, 10);
  ellipse(136, 149, 10, 10);
  ellipse(136, 139, 10, 10);
  
  fill(255, 204, 0);
  ellipse(145, 144, 10, 10);
  
  noFill();
  stroke(80, 140, 76);
  strokeWeight(1.5);
  arc(155, 160, 20, 60, HALF_PI, PI); 
  
  pop();
  
}
