class Seed {
    constructor(x, y, i, l, dirx, diry, dia, ci) {
      this.x = x;
      this.y = y;
      this.xSpd = 0;
      this.ySpd = 0;
      this.angle = i;
      this.l = l;
      this.dirx = dirx;
      this.diry = diry;
      this.dia = dia;
  
      this.ifFly = false;
      this.alpha = 255;
      this.changeA = 0;
  
      this.colorIndex =ci;
    }
  
    update() {
      this.x += this.xSpd;
      this.y += this.ySpd;
      this.alpha -= this.changeA;
    }
  
    display() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      this.drawSeed(this.l, this.dia, this.alpha);
      pop();
    }
  
    whetherfly() {
      if (mouseIsPressed) {
        this.ifFly = true;
      }
      if (this.iffly == true) {
        this.fly(this.dirx, this.diry);
      }
    }
  
    fly(dirx, diry) {
      this.xSpd += random(-0.01, 0.01) + random(0, dirx);
      this.ySpd += random(-0.01, 0.01) - random(0, diry);
      this.changeA = 0.235;
    }
  
    drawSeed(l, dia, a, ci) {
      push();
      strokeWeight(3);
      stroke(colorStem[ci][0], colorStem[ci][1], colorStem[ci][2], a);
      line(0, 0, 0, l);
      noStroke();
      fill(
        map(fluct, -1, 1, colorRange[ci][0][0], colorRange[ci][1][0]),
        map(fluct, -1, 1, colorRange[ci][0][1], colorRange[ci][1][1]),
        map(fluct, -1, 1, colorRange[ci][0][2], colorRange[ci][1][2]),
        a
      );
      circle(0, l, dia);
      pop();
    }
  }
  