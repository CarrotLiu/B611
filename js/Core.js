class Core {
    constructor(x, y, layerNum, ci) {
      this.x = x;
      this.y = y;
      this.layerNum = layerNum;
      this.coreX = 0;
      this.coreY = 0;
  
      this.dmouse = dist(
        this.x + this.seedX,
        this.y + this.seedY,
        mouseX,
        mouseY
      );
      this.ifFriend = false;
      this.ifHovered = false;
      this.ifClicked = false;
  
      this.colorIndex = ci;
    }
  
    display() {
      push();
      translate(this.x, this.y);
      this.drawCore();
      pop();
    }
  
    update() {
      this.dmouse = dist(
        this.x + this.coreX,
        this.y + this.coreY,
        mouseX,
        mouseY
      );
      if (this.ifFriend) {
        this.checkHover();
      }
      this.coreX = map(sin(frameCount * 0.01), -1, 1, -60, 60);
      this.coreY = map(cos(frameCount * 0.01), -1, 1, -10, 0);
    }
    drawCore() {
      push();
      noStroke();
      if (this.ifHovered) {
        for (let i = 0; i < 100; i++) {
          fill(250, 30, 20, floor(map(i, 0, 99, 0, 5)));
          circle(
            this.coreX,
            this.coreY,
            floor(i * 0.5 + map(this.layerNum, 1, 8, 30, 45))
          );
          fill(250, 30, 20);
        }
      } else {
        let fluct2 = sin(PI / 2 + frameCount * 0.01);
        this.assignColor(fluct2);
      }
      circle(this.coreX, this.coreY, map(this.layerNum, 1, 8, 30, 45));
  
      pop();
    }
  
    checkHover() {
      if (this.dmouse <= 20) {
        this.hover();
      } else {
        this.ifHovered = false;
      }
    }
  
    hover() {
      this.ifHovered = true;
    }
  
    assignColor(fluct) {
      fill(
        map(
          fluct,
          -1,
          1,
          colorRange[this.colorIndex][0][0],
          colorRange[this.colorIndex][1][0]
        ),
        map(
          fluct,
          -1,
          1,
          colorRange[this.colorIndex][0][1],
          colorRange[this.colorIndex][1][1]
        ),
        map(
          fluct,
          -1,
          1,
          colorRange[this.colorIndex][0][2],
          colorRange[this.colorIndex][1][2]
        )
      );
    }
  }
  