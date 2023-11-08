class Star{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.alpha = 255;
        this.size = 10;
        this.lifeSpan = floor(random(120, 360));
    }
    update(){
        this.size ++;
    }
    display(){
        this.drawMeteor();
    }
    drawStar(){
        push();
        translate(this.x, this.y);
        fill(255, this.alpha);
        circle(0, 0, 10);
        pop();
    }
    drawRipple(){
        push();
        translate(this.x, this.y);
        noFill();
        stroke(255, this.alpha);
        strokeWeight(3);
        circle(0, 0, this.size);
        pop();
    }
}