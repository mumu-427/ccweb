//A collapsable gray cup with a lid but without a handle. It has three layers and has a smooth, rubbery, and contemporary feel to it. Let me know if it doesn't make sense!

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  
  push();
  strokeWeight(0);
  translate(200,200);
  
  blendMode(DARKEST);
  fill(255, 60, 60);
  quad(-200,-200,200,30,200,200,30,200);
  fill(133, 105, 105);
  triangle(-200,-200,200,-150,200,100,);
  fill(133, 105, 105);
  triangle(-200,-200,100,200,-150,200,);
  
  blendMode(DIFFERENCE);
  fill(133, 105, 105);
  triangle(-200,-200,200,-200,200,-70);
  fill(133, 105, 105);
  triangle(-200,-200,-70,200,-200,200);
  pop();
  
  push();
  translate(0,22);
  //noStroke();
  strokeWeight(0);
  
  fill(140,140,140);
  quad(135,180,265,180,250,300,150,300);
  ellipse(200, 300, 100, 45);
  fill(180,180,180)
  quad(178,263,188,265,190,315,180,313);
  
  fill(160,160,160)
  quad(135,180,265,180,260,240,140,240);
  ellipse(200, 240, 120, 41);
  fill(200,200,200)
  quad(168,202,178,204,180,253,170,251);
  
  fill(180,180,180)
  quad(126,120,274,120,267,180,133,180);
  ellipse(200, 180, 134, 38);
  fill(220,220,220)
  quad(158,139,168,141,170,190,160,188);
  
  fill(200,200,200);
  ellipse(200, 120, 148, 35);
  
  fill(160,160,160);
  ellipse(200, 120, 128, 23);
  fill(191, 241, 255);
  ellipse(200, 123, 88, 15);
  ellipse(188, 124, 88, 15);
  ellipse(212, 124, 88, 15);
  
  push();
  translate(200,60);
  rotate(PI*20/180);
  fill(200,200,200);
  rect(-80, -10 , 160, 10);
  ellipse(0, -10, 160, 32);
  
  fill(230,230,230)
  ellipse(0, 0, 160, 30);
  fill(170,170,170)
  ellipse(0, 0, 140, 18);
  pop();
  
  noFill();
  stroke(245,245,245);
  strokeWeight(8);
  strokeJoin(ROUND);

  beginShape();
  vertex(145, 75);
  vertex(200, 90);
  vertex(200, 122);
  endShape();
  
  pop();
  
}