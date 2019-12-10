function Blocks(x, y){
    this.x = x;
    this.y = y;
    this.blocksp = blocksp
    this.generate = function(){
        blocksp = createSprite(x, y);
        blocksp.addAnimation('normal', 'block1.png','block2.png');
        blocksp.scale = 0.2
        //blocksp.debug = true;

    }

    this.showsp = function(){
        drawSprites();
    }

    this.access = function(){
        return blocksp
    }

    this.show = function(){
        noStroke()
        rect(x,y,20,20)

        
    }
    this.update = function(circleX, circleY){
        hit = collideRectCircle(x,y,20,20,circleX,circleY,20);
        return hit;
        //print("colliding? " + hit);
        // if(hit){
        //     destroy()
        // }
    }
    this.spcollide = function(player,sp){
        //this.blocksp = blocksp;
        collide = player.overlap(sp);
        return collide;
        //print("colliding? " + hit);
        // if(hit){
        //     destroy()
        // }
    }
    
  
  
  }