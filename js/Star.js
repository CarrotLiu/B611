class Star{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.alphaMax = floor(random(100, 255));
        this.alpha = this.alphaMax;
        this.freq = random(PI * 2);
        this.freq2 = random(5);
        // this.alpha1 = 255;
        // this.alpha2 = 255;
        // this.alpha3 = 255;
        this.size = floor(random(1, 5));
        // this.size1 = this.size + 1;
        // this.size2 = this.size - 3;
        // this.size3 = this.size - 6;
        // this.lifeSpan = floor(random(120, 360));
    }
    update(){
        this.alpha = map(sin(frameCount * 0.01 * this.freq2 + this.freq),-1, 1, 0, this.alphaMax);
        // this.size1 ++;
        // this.size2 ++;
        // this.size3 ++;
        // this.alpha1 -= 30;
        // this.alpha2 -= 20;
        // this.alpha3 -= 10;
    }
    display(){
        this.drawStar();
    }
    drawStar(){
        
        push();
        noStroke();
        
        translate(this.x, this.y);
        fill(255, this.alpha);
        circle(0, 0, this.size);
        pop();
    }
    // drawRipple(){
    //     push();
    //     translate(this.x, this.y);
    //     strokeWeight(3);
    //     noFill();
    //     stroke(255, this.alpha1);
    //     circle(0, 0, this.size1);
    //     stroke(255, this.alpha2);
    //     circle(0, 0, this.size2);
    //     stroke(255, this.alpha3);
    //     circle(0, 0, this.size3);
    //     pop();
    // }

}