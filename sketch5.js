let maxSize = 100;
let angleStep = 30;
let baseSize = 10; //initial size of the shape
let colors = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noStroke();
  
  //colors for dreamy gradient effect
  colors = [
    color(255, 255, 204, 150), //light yellow
    color(204, 229, 255, 150), //light blue
    color(255, 204, 229, 150), //light pink
    color(204, 255, 229, 150), //light green
    color(252, 167, 126, 150), //light peach
    color(102, 102, 255, 150), //light purple
    color(204, 153, 255, 150)  //light violet
  ];
}

function draw() {
  background(220, 220, 240);
  translate(width / 2, height / 2);
  
  //calculate distance from mouse to center
  let mouseDist = dist(mouseX, mouseY, width / 2, height / 2);
  //use frames as a time variable
  let time = frameCount * 2;
  //calculate a size factor based on the mouse's distance from the center
  let sizeFactor = map(mouseDist, 0, width / 2, 0.5, 1.5);
  
//loop through layers of shapes
for (let r = 0; r < 6; r++) {
  let radius = 80 + r * 50 + sizeFactor * 100;
    
  push();
  rotate(time * (3 + r * 0.2));//each layer with different rotate speed
    
  //nested loop control each layer's shapes and size 
  let layerShapes = int(map(sin(time * (0.1 + r * 0.05)), -1, 1, 6, 12));
  let layerSize = baseSize + sizeFactor * maxSize * sin(time + r);
  //size changes depending on time and mouse distance
    
for (let i = 0; i < layerShapes; i++) {
  let angle = i * (360 / layerShapes);
  push();
  rotate(angle);
  translate(radius, 0);
      
  //generate color gradient effects
  let col = lerpColor(colors[r % colors.length], colors[(r + 1) % colors.length], (sin(time + i * 0.1) + 1) / 2);
  
  fill(col);   
  
  //change shape
  if (r % 2 == 0) {
    rectMode(CENTER);
    rotate(time * 5 + i);
    rect(0, 0, layerSize * 1.2, layerSize * 1.2); //squares for even layers
  } else {
    ellipse(0, 0, layerSize * 0.8, layerSize); //ellipses for odd layers
    strokeWeight(1);
    stroke(255);
  }
    pop();
  }
    pop();
 
  }
}