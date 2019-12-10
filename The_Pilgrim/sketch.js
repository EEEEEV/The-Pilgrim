/*
Text style
More motivative to collect the blockes and build the tower
Sprite?(p5.play.js)
Block tail
Sound
*/

let x, y
let speed
let distance
let blocks = []
let tail = []
let lifespan = 1000;
let blockcount = 0;
let shakecountdown = 30;
let towerlevel = 1;
let camerazoom = 1;
let player;
let blocksp;
let blocksps = [];
let playerX, playerY
let healthBarWidth = 300;

let x1 = 100,
  y1 = 100,
  angle1 = 0.0,
  segLength = 50;

let towersp, towerani

function preload() {
  // towersp = ['towersp/t1.png', 'towersp/t2.png', 'towersp/t3.png', 'towersp/t4.png', 'towersp/t5.png', 'towersp/t6.png','towersp/t7.png','towersp/t8.png','towersp/t9.png']

  // towerani = loadAnimation('towersp/t1.png', 'towersp/t2.png', 'towersp/t3.png', 'towersp/t4.png', 'towersp/t5.png', 'towersp/t6.png','towersp/t7.png','towersp/t8.png','towersp/t9.png');
  towersp = createSprite(windowWidth / 2, windowHeight / 2);
  towerani = towersp.addAnimation('normal', 'towersp/t1.png', 'towersp/t2.png', 'towersp/t3.png', 'towersp/t4.png', 'towersp/t5.png', 'towersp/t6.png', 'towersp/t7.png', 'towersp/t8.png', 'towersp/t9.png');
  towersp.scale = 0.12
  //by default an animation plays but you may not want that
  towerani.playing = false;

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(0);

  fill(200)
  //fill(255)
  textSize(30)
  x = 20
  y = 20
  speed = 5

  

  // //create array of brick on map
  // for (i = 0; i < 10; i++) {
  //   block = new Blocks(random(0, width), random(0, height))
  //   blocks.push(block)
  //   //block.generate()

  // }

  blocksps = new Group()
  for (i = 0; i < 10; i++) {
    blocksp = createSprite(random(0, width), random(0, height));
    blocksp.collide(towersp);
    blocksp.addAnimation('normal', 'block1.png', 'block2.png');
    blocksp.scale = 0.2
    blocksps.add(blocksp)

  }

  //generateBlockSp()

  // player = createSprite(100, 20);
  // player.addAnimation('normal', 'testSp1.png', 'testSp2.png');
  // player.scale = 0.25

  stretchyPlayer()
  

  //player.debug = true;

}

let running = true

function generateBlockSp() {
  for (i = 0; i < blocks.length; i++) {
    blocksp = createSprite(blocks[i].x, blocks[i].y);

    blocksp.addAnimation('normal', 'block1.png', 'block2.png');
    blocksp.scale = 0.2
    blocksps.push(blocksp)
  }
  //blocksp.debug = true;

}

function stretchyPlayer(){
  stretchy = createSprite(400, 200, 10, 10);
  stretchy.draw = function() {

    //the center of the sprite will be point 0,0
    //"this" in this function will reference the sprite itself
    fill(237, 205, 0);

    //make the ellipse stretch in the sprite direction
    //proportionally to its speed
    push();
    rotate(radians(this.getDirection()));
   
    ellipse(0, 0,  50+this.getSpeed()*0.3, 50-this.getSpeed()*0.3);
    pop();

    //this.deltaX and this.deltaY are the position increment
    //since the last frame, move the face image toward the direction
    //image(face, this.deltaX*2, this.deltaY*2);
  };

  stretchy.maxSpeed = 5;


}

function mousePressed() {
  //camera.zoom = 0.5
  loop()
  //running = !running // flip the boolean
  console.log("pressed")
  //lifespan = 1000

}

function draw() {


  if (running == false) {
    return
  }
  clear
  noStroke()
  removeElements()

  background('#E7EECE');

  isOver()

  //playerMove()

  //ellipse(x, y, 40, 40)




  textBox = createImg(
    'textBox.png',
    'textbox'
  );
  textBox.position(width / 2, height / 2)
  textBox.size(795, 543)
  textBox.hide()
  textBox.center()






  // player.attractionPoint(500, mouseX, mouseY);
  // player.maxSpeed = 5;

  //update block
  for (i = 0; i < blocks.length; i++) {
    blocks[i].show()
    if (blocks[i].update(x, y)) {
      //follow player
      tail.push(blocks[i])
      //remove from map
      blocks.splice(i, 1)
      //score
      //blockcount++
      //spawn new block on map
      block = new Blocks(random(0, windowWidth), random(0, windowHeight))
      blocks.push(block)
    }
  }
  // for (i = 0; i < blocksps.length; i++) {
  //   blocksps[i].showsp()
  //   if (blocksps[i].spcollide(player,blocksps[i].blocksp)) {
  //     //follow player
  //     tail.push(blocksps[i])
  //     //remove from map
  //     blocksps.splice(i, 1)
  //     //spawn new block on map
  //     blocksp = new Blocks(random(0, windowWidth), random(0, windowHeight))
  //     blocksps.push(blocksp)
  //   }
  // }

  //update block
  for (i = 0; i < blocksps.length; i++) {

    if (stretchy.overlap(blocksps[i])) {

      console.log("collide")
      //follow player
      tail.push(blocksps[i])
      //remove from map
      blocksps[i].remove()
      //spawn new block on map
      blocksp = createSprite(random(0, width), random(0, height))
      blocksp.collide(towersp);
      blocksp.addAnimation('normal', 'block1.png', 'block2.png');
      blocksp.scale = 0.2
      
      blocksps.add(blocksp)
      drawSprites(blocksps);
    }
  }

  drawTail()

  //draw tower
  rectMode(CENTER)
  rect(width / 2, height / 2, 200, 200)

  stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

  fill(231,100,100,120)
  ellipse(width / 2, height / 2,400)


  drawSprites();
  drawHealthBar()

  

  //update HP
  distLife = dist(width / 2, height / 2, stretchy.position.x,stretchy.position.y)
  if (distLife < 200) {
    lifespan++
    if (lifespan >= 1000) lifespan = 1000
  } else {
    lifespan -= 2
  }

  //text
  // hptext = createDiv("HP " + lifespan)
  // hptext.position(10, 30)
  // hptext.style('color', '#FFFFFF')
  scoretext = createDiv("TRIBUTE: " + blockcount)
  scoretext.position(windowWidth/2, 120)
  scoretext.center('horizontal');
  scoretext.style('color', '#000000')

  continuetext = createDiv("Press to continue")
  continuetext.position(width / 2, height / 5 * 4)
  continuetext.style('color', '#FFFFFF')
  continuetext.style('font-size', "40px")
  //continuetext.style('text-align:center')
  continuetext.hide()

  if(stretchy.collide(towersp)){
    for (i = 0; i < tail.length; i++) {
      blockcount++
      tail.splice(i, 1)
    }
    isTowerTall()
  }

  //generateBlockSp()
  // towerani = animation(towersp, 500, 150);
  // towerani.scale = 0.1

  //collision, submit block, check towerheight
  if (x >= width / 2 - 100 && x <= width / 2 + 100 && y >= height / 2 - 100 && y <= height / 2 + 100) {
    for (i = 0; i < tail.length; i++) {
      blockcount++
      tail.splice(i, 1)
    }
    //print(tail)

    isTowerTall()
  }

}

function safeArea(){
    filter(BLUR, 3);
    ellipse(width / 2, height / 2,400)
}

function playerMove() {

  ellipse(x, y, 20, 20)
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x -= speed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x += speed;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y -= speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y += speed;
  }

  //border
  if (x <= 0) x = 0
  else if (x >= windowWidth) x = windowWidth
  if (y <= 0) y = 0
  else if (y >= windowHeight) y = windowHeight
}

function isOver() {
  if (lifespan <= 0) {
    //fill(255)
    dietext = createDiv("LIFE ENDED")
    dietext.position(windowWidth/2-20, 90)
    dietext.center('horizontal');
    dietext.style('color', '#000000')
    //dietext.center('horizontal');
    //dietext.style('font-size', "40px")
    //dietext.style('text-align:center')
    //console.log("die")
    blockcount = 0
    running = !running
  }
}

function isTowerTall() {

  if (blockcount / 9 > towerlevel) {
    camera.zoom = camerazoom - 0.05
    camerazoom -= 0.05
    towerlevel++
    lifespan = 1000
    //resizeCanvas(windowWidth, windowHeight);
    textBox.show()
    continuetext.show()
    towerani.nextFrame();

    noLoop()
  }


  // if (blockcount >= 5) {
  //   //shakecount
  //   push
  //   frameRate(12)
  //   canvas.position(random(-100, 100), random(-100, 100))
  //   pop
  //   shakecountdown--
  //   if (shakecountdown <= 0) {
  //     canvas.position(0, 0)
  //     running = !running
  //   }
  // }
}

function drawHealthBar() {
  // Make it borderless:
  noStroke();
  fill(236, 240, 241);
  rectMode(CORNER);
  //rect(100,100, healthBarWidth, 5);
  // if (lifespan > 800) {
  //   fill(46, 204, 113);
  // } else if (lifespan > 500) {
  //   fill(230, 126, 34);
  // } else {
  //   fill(231, 76, 60);
  // }
  fill(0,255*lifespan/1000,0)
  rectMode(CENTER);
  rect(windowWidth/2,100, healthBarWidth*(lifespan/1000), 10);
}

function drawTail() {
  dx = x - x1;
  dy = y - y1;
  angle1 = atan2(dy, dx);
  x1 = x - cos(angle1) * segLength;
  y1 = y - sin(angle1) * segLength;
  for (i = 0; i < tail.length; i++) {
    //print(tail)
    tail[i] = new Blocks(x1, y1)
    tail[i].show()
    //segLength += i
  }

  //console.log("hi")
  //segment(x, y, angle1);
  //ellipse(x1, y1s, 20, 20);
}



function updateSpeed() {
  distance = dist(width / 2, height / 2, x, y)
  //speed *= distance
  //console.log(distance)

}
