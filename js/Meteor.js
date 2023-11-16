// import chroma from "chroma-js"
class Meteor{
    constructor(){
        this.x = round(random(0, window.innerWidth));;
        this.y = -10;
        this.xv = round(random([-3,-2,2,3]));
	    this.yv = random(0.5, 1.5);
        this.r = round(random(1, 3));
        this.tail = [];
        this.tailLength = round(random(50, 60));
        this.startColor = "#fce1b4";
        this.endColor = [255, 255, 255, 0];
        this.alpha = 255;
        this.lifeSpan = floor(random(120, 360));
    }

    update(){
        this.x += this.xv;
		this.y += this.yv;
    }

    display(){
        this.drawMeteor();
        this.update();
		this.history();
		this.drawTail();
    }

    drawMeteor(){
        circle(this.x, this.y, this.r);
		fill(this.startColor);
		noStroke();
    }

    drawTail(){
        const colorScale = chroma
            .scale([this.endColor, this.startColor])
						.mode("lch")
            .colors(this.tail.length);

		//draw each circle for the tail
		for(i = this.tail.length - 1; i > 0; i--){
			circle(this.tail[i].x, this.tail[i].y, this.tail[i].r);
			fill(colorScale[i]);
			noStroke();
			
			//calculate the proper numer to reduce radius to 0
			const radiusReducer = this.tail[i].r / this.tailLength;
			this.tail[i].r -= radiusReducer;
		}
    }
    history(){
        if(this.tail.length > this.tailLength) {
			this.tail.shift();
		}
		this.tail.push({x: this.x, y: this.y, r: this.r});
    }

}
