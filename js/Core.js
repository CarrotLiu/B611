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
    this.ifSelf = true;
    this.isHovering = false;
    this.ifClicked = false;
    this.isWriting = false;
    this.isReading = false;
    this.data = [];
    this.dataNum = 0;
    this.removedWriteDiv = null;
    this.removedReadDiv = null;

    this.colorIndex = ci;
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawCore();
    pop();
  }

  update(stopHover, achieveData) {
    this.dmouse = dist(
      this.x + this.coreX,
      this.y + this.coreY,
      mouseX,
      mouseY
    );
    if (this.ifFriend || this.ifSelf) {
      this.checkHover(stopHover);
    }
    this.coreX = map(sin(frameCount * 0.01), -1, 1, -60, 60);
    this.coreY = map(cos(frameCount * 0.01), -1, 1, -10, 0);
    this.checkAchieve(achieveData);
    this.checkClick();
  }
  drawCore() {
    push();
    noStroke();
    if (this.isHovering) {
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

  checkHover(stopHover) {
    if (this.dmouse <= 10 && !stopHover) {
      this.isHovering = true;
    } else {
      this.isHovering = false;
    }
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

  checkAchieve(achieveData) {
    if (achieveData) {
      for (let i = 0; i < achieveData.length; i++) {
        this.data[0] += achieveData[i];
        this.dataNum ++;
      }
    }
  }

  writeText() {
    if (!this.isWriting) {
      let writeAreaContainer = document.createElement("div");
      writeAreaContainer.id = "writeAreaContainer";
      let textArea = document.createElement("textarea");
      textArea.id = "textInputArea";
      let br = document.createElement("br");
      // console.log(textArea);
      if (this.data.length != 0) {
        textArea.value = this.data[0];
      } else {
        textArea.placeholder = "Write about the characteristics you possess";
      }
      textArea.style.width = "500px";
      textArea.style.height = "300px";
      // Create a submit button
      let submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.id = "button-submit";
      submitButton.addEventListener(
        "click",
        function () {
          let userInput = textArea.value;
          this.data[0] = userInput;
          this.dataNum ++;
          this.isWriting = false;
          this.ifClicked = false;

          let divToRemove = document.getElementById("writeAreaContainer");
          if (divToRemove) {
            this.removedWriteDiv = divToRemove;
            divToRemove.parentNode.removeChild(divToRemove);
          }
        }.bind(this)
      );

      if (this.removedWriteDiv) {
        this.removedWriteDiv.innerHTML = "";
        this.removedWriteDiv.appendChild(textArea);
        this.removedWriteDiv.appendChild(br);
        this.removedWriteDiv.appendChild(submitButton);
        document.body.appendChild(this.removedWriteDiv);
        this.removedWriteDiv = null;
      } else {
        writeAreaContainer.innerHTML = "";
        writeAreaContainer.appendChild(textArea);
        writeAreaContainer.appendChild(br);
        writeAreaContainer.appendChild(submitButton);
        document.body.appendChild(writeAreaContainer);
      }

      this.isWriting = true;
    }
  }

  readText() {
    if (!this.isReading) {
      // console.log(this.removedReadDiv);
      let readAreaContainer = document.createElement("div");
      readAreaContainer.id = "readAreaContainer";
      let userInputContent = document.createTextNode(this.data[0]);
      userInputContent.id = "userInput";
      let buttonContainer = document.createElement("div");
      buttonContainer.id = "buttonContainer";
      let backButton = document.createElement("button");
      backButton.textContent = "Back";
      backButton.id = "button-back";
      backButton.addEventListener(
        "click",
        function () {
          this.isReading = false;
          this.ifClicked = false;
          let divToRemove = document.getElementById("readAreaContainer");
          if (divToRemove) {
            this.removedReadDiv = divToRemove;
            divToRemove.parentNode.removeChild(divToRemove);
          }
        }.bind(this)
      );
      let reviseButton = document.createElement("button");
      reviseButton.textContent = "Revise";
      reviseButton.id = "button-revise";
      reviseButton.addEventListener(
        "click",
        function () {
          this.isReading = false;
          this.ifClicked = false;
          let divToRemove = document.getElementById("readAreaContainer");
          if (divToRemove) {
            this.removedReadDiv = divToRemove;
            divToRemove.parentNode.removeChild(divToRemove);
          }
          this.writeText();
        }.bind(this)
      );
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.id = "button-delete";
      deleteButton.addEventListener(
        "click",
        function () {
          this.isReading = false;
          this.ifClicked = false;
          this.data.splice(0, 1);
          this.dataNum = 0;
          let divToRemove = document.getElementById("readAreaContainer");
          if (divToRemove) {
            this.removedReadDiv = divToRemove;
            divToRemove.parentNode.removeChild(divToRemove);
          }
        }.bind(this)
      );

      if (this.removedReadDiv) {
        this.removedReadDiv.innerHTML = "";
        this.removedReadDiv.appendChild(userInputContent);
        buttonContainer.appendChild(backButton);
        buttonContainer.appendChild(reviseButton);
        buttonContainer.appendChild(deleteButton);
        this.removedReadDiv.appendChild(buttonContainer);
        document.body.appendChild(this.removedReadDiv);
        this.removedReadDiv = null;
      } else {
        readAreaContainer.innerHTML = "";
        document.body.appendChild(readAreaContainer);
        readAreaContainer.appendChild(userInputContent);
        buttonContainer.appendChild(backButton);
        buttonContainer.appendChild(reviseButton);
        buttonContainer.appendChild(deleteButton);
        readAreaContainer.appendChild(buttonContainer);
      }
      this.isReading = true;
    }
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


