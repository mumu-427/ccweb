let shadowData = [];
let currentDay = 0;
let numDays = 7;
let currentHour = 12;
let speedFactor = 1;//SHADOW move speed

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  //generate 7 days shadow data
  for (let i = 0; i < numDays; i++) {
    shadowData.push(generateShadowDataForDay());
  }
}

function draw() {
  //background(35, 86, 237);
  //background(0);
  for (let y = 0; y < height; y++) {
    let lerpAmount = map(y, 0, height, 0, 2.5); 
    let bgColor = lerpColor(color(35, 86, 237), color(255, 250, 245), lerpAmount); 
    stroke(bgColor);
    line(0, y, width, y);
  }
  
  //show SHADOW in curent day
  displayShadowForDay(currentDay, currentHour);
  
  //show current time
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text(`Day ${currentDay + 1}, Hour: ${currentHour}:00`, width / 2, height - 400);

  lightEffects();
  
  if (frameCount % 400 === 0) {
    currentDay = (currentDay + 1) % numDays;//every 5 second to next day
  }
}

//generate SHADOW data for one day
function generateShadowDataForDay() {
  let data = [];
  for (let h = 6; h <= 24; h++) {
    let shadowLength = map(h, 6, 24, 200, 50);//simulate shadow length over time
    data.push({hour: h, shadowLength: shadowLength});
  }
  return data;
}

//show SHADOW data in one day
function displayShadowForDay(day, hour) {
  let data = shadowData[day];
  
  for (let i = 0; i < data.length; i++) {
    let shadow = data[i];
    let x = width / 2;
    let y = height / 2 - 450;
    
    //adjust SHADOW changes to the current time
    let lenFactor = map(sin(frameCount * 0.01 * speedFactor + i), -2, 1, 1.6, 3.0);
    let length = shadow.shadowLength * lenFactor;

    //gradientColor
    let gradientColor = map(shadow.hour, 6, 18, 150, 255);
    fill(255, gradientColor, 200, 150 - (i * 10));

    //SHADOW
    noStroke();
    ellipse(x, y + length, length, length * 0.4);
  }
}

//mouseDragged control time text change 
function mouseDragged() {
  currentHour = int(map(mouseX, 0, width, 6, 18));
  
  //adjust the SHADOW movement speed according to the mouse movement speed
  let speedChange = abs(mouseX - pmouseX);
  speedFactor = map(speedChange, 0, 50, 0.5, 2);
}

function lightEffects() {
  push();
  //shadow shapes
  fill(0, 0, 0, 20);
  strokeWeight(0);
  let shadowX = map(mouseX, 0, width, 200, 400);
  let shadowY = constrain(map(mouseY, 0, 200, 140, 240), 0, 400);
  
  //change size with mouse move
  let sizeFactor = map(mouseY, height , height/ 2 - 100, 1, 2);
  sizeFactor = constrain(sizeFactor, 1, 2);

  for (i = 240; i > 69; i -= 20) { 
    ellipse(
      (((width / 2) - shadowX) + width / 2),
      (((height / 2) - shadowY) + height / 2),
      i * sizeFactor,
      (i * 0.5) * sizeFactor
    );
  }

  //main circle
  fill(173, 216, 230, 80);
  ellipse(width / 2, height / 2 - 100, 260, 120);
  fill(255, 255, 255, 50);
  ellipse(width / 2, height / 2 - 102, 250, 110);
  fill(255, 255, 255, 50);
  ellipse(width / 2, height / 2 - 104, 240, 100);
  
  //highlight
  noStroke();
  let lightX = constrain(mouseX, 220, 380);
  let lightY = constrain(mouseY, 160, 240);
  push();
  fill(255, 255, 255, 90);
  ellipse(lightX, lightY, 60, 30);
  fill(255, 255, 255, 60);
  ellipse(lightX, lightY, 50, 20);
  fill(255, 255, 255, 70);
  ellipse(lightX, lightY, 30, 10);

  //light
  fill(255, 255, 255, 50);
  strokeWeight(0);
  let lightCircleX = constrain(mouseX, -100, width + 100);
  let lightCircleY = constrain(mouseY, 0, height / 2 -60);
  for (i = 100; i > 19; i -= 20) {
    ellipse(lightCircleX, lightCircleY, i, i);
  }
  pop();
  pop();
}

