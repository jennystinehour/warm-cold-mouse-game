
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width,
 rectMode, line, CENTER, loop, noLoop
 */

let backgroundColor, spherePosition, rectPosition
let distance, temp
let gameOver


function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains an object
  spherePosition = {
    "x": 100,
    "y": 100,
  }
  
  respawnRect()
  gameOver = false
}

function draw() {
  background(backgroundColor, 20,100);
  
  //draw the sphere at mouse position
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  rectMode(CENTER)
  
  //
  let distance1 = computeDistance(rectPosition, spherePosition)
  //text(`The circle and sphere are ${distance1} units apart.`, 20, 20);
  
  //line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  
  text(computeCategory(), 20, 40)
}

// This code runs every time the mouse is clicked
function mouseMoved() {
  spherePosition.x = mouseX;
  spherePosition.y = mouseY;
}

//compute the distance between two points
function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x
  let deltaY = point1.y - point2.y
  distance = sqrt((deltaX**2) + (deltaY**2))
  return Math.round(distance)
}

//changes bg color and hint depending on the distance between the mouse and rec
function computeCategory() {
if (distance > 200) {
    //colder
    backgroundColor = 180
    return "Colder"
  }
  else if (distance > 100) {
    backgroundColor = 100
    return "Warmer"
  }
  else if (distance > 20) {
    backgroundColor = 50
    return "Warmmmmm"
  }
  else if (distance < 20) {
    backgroundColor = 0
    gameOver = true
    restartGame()
    return "HOT"
  }
}

//send game over screen and respawn rec
function restartGame() {
  if (gameOver){
    
    noLoop()
    text("YOU FOUND IT! Press a key to play again", width/2, height/2)
    rect(rectPosition.x, rectPosition.y, 20, 20);
    respawnRect()
  } 
  }

//press any key to restart game
function keyPressed() {
  if (gameOver) {
    gameOver = false
    loop()
  }
}

//respawn the rec at random location
function respawnRect() {
  rectPosition = {
    "x": random(width),
    "y": random(height)
  } 
}
