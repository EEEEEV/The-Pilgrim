/*
Text style
More motivative to collect the blockes and build the tower
Sprite?(p5.play.js)
Block tail
Sound
*/



let tail = []
let lifespan = 1000;
let blockcount = 0;
let towerlevel = 1;
let blocksp;
let blocksps = [];
let healthBarWidth = 300;
let img, ldimg
let camerascale = 1
let startbtn
let towersp, towerani

let running = false

let vid, vid2
let newG = true

function preload() {
    towersp = createSprite(windowWidth / 2, windowHeight / 2);
    towerani = towersp.addAnimation('normal', 'towersp/tw1.png', 'towersp/tw2.png', 'towersp/tw3.png', 'towersp/tw4.png', 'towersp/tw5.png', 'towersp/tw6.png', 'towersp/tw7.png', 'towersp/tw8.png', 'towersp/tw9.png');
    towersp.scale = 0.12 * camerascale
    //by default an animation plays but you may not want that
    towerani.playing = false;
    textsp = createSprite(windowWidth / 2, windowHeight / 2);
    textani = textsp.addAnimation('normal','textsp/text8.png', 'textsp/text1.png', 'textsp/text2.png', 'textsp/text3.png', 'textsp/text4.png', 'textsp/text5.png', 'textsp/text6.png', 'textsp/text7.png','textsp/text8.png');
    textsp.scale = 0.1
    textani.playing = false;
    bgm = loadSound('bgm.mp3')
    //bgm.loop()
    ldimg = loadImage('startPage.jpg')
    loadFont('OratorStd.otf');
}

function setup() {

    prepareGame()
   
    //bgm.onended(bgmLoop)
    stretchyPlayer()
    blocksps = new Group()
    for (i = 0; i < 10; i++) {
        blocksp = createSprite(random(10, windowWidth-10), random(10, windowHeight-10));
        blocksp.collide(towersp);
        blockani = blocksp.addAnimation('normal', 'block3.png', 'block4.png');
        blockani.frameDelay = 40
        blocksp.scale = 0.25 * camerascale
        blocksps.add(blocksp)
    }

    myButton = new Clickable(); //Create button
    myButton.color = "#E3E3E3"; //Background color of the clickable
    myButton.cornerRadius = 5; //Corner radius of the clickable
    myButton.strokeWeight = 4; //Stroke width of the clickable
    myButton.stroke = "#801A11"; //Border color of the clickable
    myButton.text = " START"; //Text of the clickable
    myButton.textColor = "#801A11"; //Color of the text
    myButton.textSize = 36; //Size of the text
    myButton.textFont = "OratorStd"; //Font of the text
    myButton.width = 160;
    myButton.height = 60;
    myButton.locate(windowWidth / 2 - myButton.width / 2, windowHeight / 3 * 2); //Position Button
    myButton.onPress = function () {
        changeBG()
        //console.log('pressed11')
    }

    showMute()
}

function showMute() {
    muteArea = createDiv("MUTE")
    muteArea.style('color', '#5E5E5E')
    muteArea.style('font-size', "30px")
    muteArea.position(10, windowHeight - 35)
    muteArea.style('font-family', 'OratorStd');

}

function prepareGame() {

    blockcount = 0
    lifespan = 1000;
    towerlevel = 1;
    running = false

    canvas = createCanvas(windowWidth, windowHeight);
    background('#110D0C');

    fill(200)
    imageMode(CENTER)
    image(ldimg, windowWidth / 2, windowHeight / 2, windowHeight * 1.5, windowHeight);


    // starttext = createDiv("Press anywhere to start")
    // starttext.style('color', '#5B5B5B')
    // starttext.style('font-size', "30px")
    // starttext.position(windowWidth / 2, height / 10 * 9)
    // starttext.center('horizontal');
    // starttext.style('font-family', 'Chalkduster');

    //freeze = false;

    vid = createVideo('before.mp4');
    vid.size(windowWidth, windowHeight);
    vid.position(0, 0)
    vid.onended(startGame)
    vid.hide()

}

function startGame() {
    setTimeout(function () {
        running = true
        freezing = false
    }, 3000)
}

function changeBG() {
    //running = true
    bgm.loop()
    //bgm.play()
    vid.show()
    vid.play()
    newG = false
    //vid.loop();
    //console.log('play1')
}

function fakeStart() {
    changeBG()
}

function mousePressed() {
    freeze = false;
    if (mouseX >= 0 && mouseX <= 100 && mouseY >= windowHeight - 50 && mouseY <= windowHeight) {
        if (bgm.isPlaying()) {
            // .isPlaying() returns a boolean
            bgm.pause();
        } else {
            bgm.play();
        }
    }
    //running = !running // flip the boolean
    //console.log("pressed")
    //
}

function bgmLoop(){
    bgm.play()
}

function draw() {

    
    if (newG == true) {
        myButton.draw()
    }
    if (running == false) {
        return
    }
    clear
    noStroke()
    removeElements()

    //background('#E7EECE');
    background('#1E1F1C')
    
    isOver()
    //update block
    for (i = 0; i < blocksps.length; i++) {

        if (stretchy.overlap(blocksps[i])) {

            //console.log("collide")
            //follow player
            tail.push(blocksps[i])
            //remove from map
            blocksps[i].remove()
            //spawn new block on map
            blocksp = createSprite(random(10, windowWidth-10), random(10, windowHeight-10))
            blocksp.collide(towersp);
            blockani = blocksp.addAnimation('normal', 'block3.png', 'block4.png');
            blockani.frameDelay = 40
            blocksp.scale = 0.25 * camerascale

            blocksps.add(blocksp)
            drawSprites(blocksp);
        }
    }

    safeArea()

    blocksps.scale = 0.2 * camerascale

    //draw tower
    towersp.scale = 0.12 * camerascale
    //towersp.debug = true
    drawSprites();
    drawHealthBar()

    continuetext = createDiv("press to continue")
    continuetext.style('color', '#B5B48C')
    continuetext.style('font-size', "30px")
    continuetext.position(windowWidth / 2, height / 10 * 9)
    continuetext.center('horizontal');

    continuetext.style('font-family', 'OratorStd');


    if (freeze == false) {

        scoretext = createDiv("TRIBUTE: " + blockcount)
        scoretext.position(windowWidth / 2, 60)
        scoretext.center('horizontal');
        scoretext.style('color', '#74F84B')
        scoretext.style('font-family', 'OratorStd');

        loadtext = createDiv("LOAD: " + tail.length)
        loadtext.position(windowWidth / 2, 80)
        loadtext.center('horizontal');
        loadtext.style('color', '#74F84B')
        loadtext.style('font-family', 'OratorStd');

        stretchy.maxSpeed = 5 - tail.length * 0.1;
        stretchy.velocity.x = (mouseX - stretchy.position.x) / 10;
        stretchy.velocity.y = (mouseY - stretchy.position.y) / 10;

        continuetext.hide()
        textsp.visible = false
        //update HP
        distLife = dist(width / 2, height / 2, stretchy.position.x, stretchy.position.y)
        if (distLife < 200 * camerascale) {
            lifespan++
            if (lifespan >= 1000) lifespan = 1000
        } else {
            lifespan -= 2
        }
    } else {
        stretchy.velocity.x = 0
        stretchy.velocity.y = 0

    }

    if (stretchy.collide(towersp)) {
        for (i = 0; i < tail.length; i++) {
            blockcount++
            tail.splice(i, 1)
        }
        isTowerTall()
        //print(towerlevel)
    }

    showMute()
}


function gameEnd() {
    removeElements()
    //freeze = true
    running = false

    fill(0)
    rectMode(CORNER)
    rect(0, 0, windowWidth, windowHeight)

    vid2 = createVideo('after.mov');
    vid2.size(windowWidth, windowHeight);
    vid2.position(0, 0)
    vid2.pause();
    //vid2.currentTime = 0;
    setTimeout(function () {
        vid2.play();
    }, 2000);

    vid2.onended(end)

}


function end() {
    //console.log('end')
    endtext = createDiv("refresh to restart")
    endtext.position(windowWidth / 2 - 30, windowHeight / 4 * 3)
    endtext.center('horizontal');
    endtext.style('color', '#B5B48C')
    endtext.style('font-family', 'OratorStd');
    refresh = createButton('refresh')
    refresh.position(windowWidth / 2, windowHeight / 4 * 3 + 20);
    refresh.mousePressed(changeB);
    refresh.center('horizontal');
}

function changeB() {
    window.location.reload(1)
}

function safeArea() {
    //fill(231, 100, 100, 20)
    fill(255, 0, 0, 80)
    ellipse(width / 2, height / 2, 400 * camerascale)
}



function isOver() {
    if (lifespan <= 0) {
        //fill(255)
        dietext = createDiv("LIFE ENDED")
        dietext.position(windowWidth / 2 - 20, 100)
        dietext.center('horizontal');
        dietext.style('color', '#CC1212')
        dietext.style('font-family', 'OratorStd');

        blockcount = 0

        running = false
        end()

    }
}

function isTowerTall() {
    if (blockcount >= 81) {
        gameEnd()
        return;

    }
    if (blockcount / 9 > towerlevel) {
        // camera.zoom = camerazoom - 0.05
        // camerazoom -= 0.05
        camerascale = camerascale * 0.95
        towerlevel++
        lifespan = 1000
        //resizeCanvas(windowWidth, windowHeight);
        //textBox.show()
        continuetext.show()
        towerani.nextFrame();
        //textsp.depth = 0;
        textsp.depth = allSprites.maxDepth() + 1
        //console.log(allSprites.minDepth + allSprites.maxDepth)
        textsp.visible = true
        //drawSprites(textsp)

        textsp.scale = 0.35
        textani.playing = false;
        textani.nextFrame();

        freeze = true;
        //noLoop()
    }


}

function drawHealthBar() {
    // Make it borderless:
    noStroke();
    fill(236, 240, 241);
    rectMode(CORNER);
    fill(0, 255 * lifespan / 1000, 0)
    rectMode(CENTER);
    rect(windowWidth / 2, 50, healthBarWidth * (lifespan / 1000), 10);
}

function stretchyPlayer() {
    stretchy = createSprite(400, 200, 10, 10);
    stretchy.draw = function () {
        fill(182, 202, 18);
        push();
        rotate(radians(this.getDirection()));
        ellipse(0, 0, (50 + this.getSpeed()) * camerascale, (50 - this.getSpeed()) * camerascale);
        pop();
        fill(255, 0, 0)
        ellipse(this.deltaX * 3, this.deltaY * 3, 40 * camerascale)

    };

    stretchy.maxSpeed = 5 - tail.length * 0.1;
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
