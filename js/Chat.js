class Chat {
  constructor(x, y, text, font) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.text = text;
    this.font = font;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    rectMode(CENTER);
    fill(255);
    rect(0, 0, this.w, this.h);
    this.drawText();
    pop();
  }
  drawText() {
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    textFont(this.font);
    textSize(15);
    noStroke();
    fill(0);
    text(this.text, 0, 0, this.w, this.h);
    pop();
  }
  setSize() {
    if (this.text.length < 10) {
    }
  }
}
