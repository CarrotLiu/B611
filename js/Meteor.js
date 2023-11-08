class Meteor{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.spdX = 0;
        this.spdY = 0;
        this.alpha = 255;
        this.lifeSpan = floor(random(120, 360));
    }

    update(){
        this.spdX --;
        this.spdY --;
        this.x += this.spdX;
        this.y += this.spdY;
    }

    display(){
        this.drawMeteor();
    }

    drawMeteor(){
        push();
        translate(this.x, this.y);
        noStroke();
        fill(255, this.alpha);
        circle(0, 0, 10);
        stroke(255);
        pop();
    }

}