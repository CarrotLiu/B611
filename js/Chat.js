class Chat {
  constructor(x, y, text, font) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.text = text;
    this.font = font;
  }

  update(otherx, othery){
    this.x = otherx;
    this.y = othery;
  }

  display() {
    this.setSize();
    push();
    translate(this.x, this.y);
    noStroke();
    rectMode(CENTER);
    fill(255);
    rect(0, 0, this.w, this.h, 20);
    this.drawText();
    // console.log(this.x, this.y, this.w, this.h);
    pop();
  }
  drawText() {
    push();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textFont(this.font);
    textSize(15);
    noStroke();
    fill(0);
    text(this.text, 0, 0, 160, this.h - 20);
    pop();
  }
  setSize() {
    
    if (textWidth(this.text) < 150) {
      this.w = textWidth(this.text) + 50;
      this.h = 50;
    } else {
      this.w = 200;
      this.h = floor(textWidth(this.text) / 123) * 18 + 50;
    }
  }
}
