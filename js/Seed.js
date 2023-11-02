class Seed {
  constructor(x, y, layer, sdPos, dirx, diry, ci) {
    this.x = x;
    this.y = y;
    this.coreX = 0;
    this.coreY = 0;
    this.seedX = 0;
    this.seedY = 0;
    this.lastCoreX = 0;
    this.lastCoreY = 0;

    this.layerNum = layer;
    this.seedPos = sdPos;

    this.xSpd = 0;
    this.ySpd = 0;
    this.dirx = dirx;
    this.diry = diry;
    this.angle = 0;
    this.flyAngle = 0;

    this.dmouse = dist(
      this.x + this.seedX,
      this.y + this.seedY,
      mouseX,
      mouseY
    );
    this.hideX = 0;
    this.hideY = 0;
    
    this.ifFriend = false;
    this.ifSelf = true;

    this.isHovering = false;
    this.isWriting = false;
    this.isReading = false;
    this.data = [];

    this.ifFly = false;
    this.flyDone = false;

    

    this.colorIndex = ci;
  }

  update() {
    //get mouse pos
    this.dmouse = dist(
      this.x + this.seedX + this.coreX,
      this.y + this.seedY + this.coreY,
      mouseX,
      mouseY
    );
    //fly
    this.checkFly();
    if (this.ifFly) {
      this.fly();
      this.seedX += this.xSpd;
      this.seedY += this.ySpd;
    } else {
      if (this.ifFriend) {
        this.checkHover();
      } else {
        this.checkHide();
      }
      this.coreX = map(sin(frameCount * 0.01), -1, 1, -60, 60);
      this.coreY = map(cos(frameCount * 0.01), -1, 1, -10, 0);
      this.seedX =
        sin((PI / 2) * (this.layerNum + 1) + this.seedPos) *
          (40 + this.layerNum * 20) +
        this.hideX;
      this.seedY =
        cos((PI / 2) * (this.layerNum + 1) + this.seedPos) *
          (40 + this.layerNum * 20) +
        this.hideY;
    }
    //write or read
    this.checkClick();
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawSeedStem();
    this.drawSeed();
    pop();
  }

  drawSeed() {
    push();
    if (this.ifFly) {
      translate(this.lastCoreX + this.seedX, this.lastCoreY + this.seedY);
    } else {
      translate(this.coreX + this.seedX, this.coreY + this.seedY);
    }
    let fluct1 = sin((PI / 2) * (this.layerNum + 1) + this.seedPos);
    if (this.isHovering) {
      push();
      noStroke();
      for (let i = 0; i < 100; i++) {
        fill(250, 30, 20, floor(map(i, 0, 99, 0, 5)));
        circle(0, 0, floor(i * 0.5 + this.layerNum));
        fill(250, 30, 20);
        circle(0, 0, 20);
      }
      pop();
    } else {
      push();
      this.assignColor(fluct1);
      noStroke();
      if (this.data.length != 0) {
        push();
        fill(255, 255, 255, 60);
        circle(
          0,
          0,
          5 +
            map(
              sin(this.seedPos + frameCount * 0.05),
              -1,
              1,
              3,
              6 + this.layerNum * 3.5
            )
        );
        pop();
      }
      circle(
        0,
        0,
        map(
          sin(this.seedPos + frameCount * 0.05),
          -1,
          1,
          3,
          6 + this.layerNum * 3.5
        )
      );
      pop();
    }

    pop();
  }

  drawSeedStem() {
    if (this.seedX > 0) {
      this.angle = PI / 2 + atan(this.seedY / this.seedX);
    } else {
      this.angle = -PI / 2 + atan(this.seedY / this.seedX);
    }

    push();
    if (this.ifFly) {
      translate(this.lastCoreX + this.seedX, this.lastCoreY + this.seedY);
    } else {
      translate(this.coreX + this.seedX, this.coreY + this.seedY);
    }

    stroke(255, 100);
    strokeWeight(map(sin(this.seedPos + frameCount * 0.05), -1, 1, 0.01, 2));
    rotate(this.angle + this.flyAngle);
    if (this.ifFly) {
      line(
        0,
        0,
        0,
        this.lastCoreX,
        this.lastCoreY,
        this.seedX + this.lastCoreX,
        this.seedY + this.lastCoreY
      );
    } else {
      line(
        0,
        0,
        0,
        dist(
          this.coreX,
          this.coreY,
          this.seedX + this.coreX,
          this.seedY + this.coreY
        )
      );
    }
    pop();
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

  checkHide() {
    if (this.dmouse <= 20) {
      this.hide();
    } else {
      this.hideX = 0;
      this.hideY = 0;
    }
  }

  hide() {
    this.hideX = map(this.dmouse, 0, 20, 10, 0);
    this.hideY = map(this.dmouse, 0, 20, 10, 0);
  }

  checkHover() {
    if (this.dmouse <= 10) {
      this.hover();
    } else {
      this.isHovering = false;
    }
  }

  hover() {
    this.isHovering = true;
  }

  checkClick() {
    if (this.ifClicked) {
      if (this.data.length != 0) {
        this.readText();
      } else if (this.ifSelf) {
        this.writeText();
      }
    }
  }

  writeText() {
    if (!this.isWriting) {
      let textAreaContainer = document.createElement("div");
      textAreaContainer.id = "textAreaContainer";
      let textArea = document.createElement("textarea");
      textArea.id = "textInputArea";
      textArea.placeholder =
        "Write about the characteristics you hope to possess";
      textArea.style.width = "500px";
      textArea.style.height = "550px";
      // Create a submit button
      let submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.addEventListener(
        "click",
        function () {
          let userInput = textArea.value;

          this.data.push(userInput);
          alert("Your texts: " + userInput);
          this.ifClicked = false;
          this.isWriting = false;
          document.getElementById("textAreaContainer").remove();
        }.bind(this)
      );
      textAreaContainer.innerHTML = "";
      document.body.appendChild(textAreaContainer);
      textAreaContainer.appendChild(textArea);
      textAreaContainer.appendChild(submitButton);
      this.isWriting = true;
    }
  }

  readText() {
    if (!this.isReading) {
      let textAreaContainer = document.createElement("div");
      textAreaContainer.id = "textAreaContainer";
      let newContent = document.createTextNode(this.data);
      textAreaContainer.appendChild(newContent);
      let submitButton = document.createElement("button");
      submitButton.textContent = "Back";
      submitButton.addEventListener("click", function () {
        this.ifClicked = false;
        this.isReading = false;
      });
      this.isReading = true;
    }
  }

  checkFly() {
    if (
      this.layerNum == 5 &&
      this.seedPos + (2 * PI) / (11 + this.layerNum * 3) >= 2 * PI
    ) {
      //check the last seed of the 5th layer of dandelion
      if (this.data.length != 0) {
        //if it contains data, then all the seeds of the dandelion contain data
        this.ifFly = true;
        if (
          this.x + this.seedX + this.lastCoreX > windowWidth + 50 ||
          this.x + this.seedX + this.lastCoreX < -50 ||
          this.y + this.seedY + this.lastCoreY > windowHeight + 50 ||
          this.y + this.seedY + this.lastCoreY < -50
        ) {
          this.flyDone = true;
        }
      }
    }
  }

  fly() {
    this.xSpd += random(-0.01, 0.01) + random(0, this.dirx);
    this.ySpd += random(-0.01, 0.01) - random(0, this.diry);
    this.flyAngle = map(noise(sin(frameCount * 0.01)), 0, 1, -PI / 30, PI / 30);
  }
}
