// import {io} from "socket.io-client";

// const socket = io("http://localhost:3000")
// socket.on("connect", ()=>{

// })

// socket.emit("data", 10, "hi", {a:"a"})
// import * as p5 from "../lib/p5.js"
// import * as p5sound from "../lib/p5.sound.min.js"
// import {Core} from "./Core.js";
// import {Prince} from "./Prince.js";

// import {Meteor} from "./js/Meteor.js";
// let Meteor = require("./Meteor.js");

let playlist = [];
let ifPlaying = false;
let font = "IM Fell DW Pica";

let freq;
let friend = false;

let meteor;
let stars = [];

let sceneIndex = 0;

let colorStem = [
  [56, 130, 60], // green
  [250, 80, 80], //pink
  [120, 150, 190], //blue
];

let colorRange = [
  [
    [91, 179, 24],
    [244, 206, 10],
  ],
  [
    [255, 234, 221],
    [255, 102, 102],
  ],
  [
    [130, 170, 227],
    [234, 253, 252],
  ],
];
let canvas;
let currentLayer = 1;
let maxLayerNum = 2;

let prince;
let prince2;
let seeds = [];
let seeds2 = [];
let cores = [];

let dataNum = 0;
let coreDataNum = 0;
let stopHover = false;
let achieveData = [];
function preload() {
  playlist[0] = loadSound("assets/LagFyrirOmmu.weba");
  // playlist[1] = loadSound("assets/ThisPlaceIsAShelter.weba");
  // playlist[2] = loadSound("assets/spring.m4a");
  // playlist[3] = loadSound("assets/autumn.m4a");
  // playlist[4] = loadSound("assets/winter.m4a");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  freq = random(PI, 2 * PI);
  // meteor = new Meteor();
  prince = new Prince(500, height / 2 + 60, 0);
  prince2 = new Prince(width - 500, height / 2 + 80, freq);
  for (let i = 0; i < 150; i++) {
    stars.push(new Star(random(0, width), random(0, height)));
  }
  for (let r = currentLayer; r > 0; r--) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      seeds.push(
        new Seed(
          300,
          height / 2,
          r,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0,
          0
        )
      );
    }
  }
  cores.push(new Core(300, height / 2, currentLayer, 0, 0));

  for (let r = currentLayer; r > 0; r--) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      seeds2.push(
        new Seed(
          width - 300,
          height / 2,
          r,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0,
          freq
        )
      );
    }
  }
  cores.push(new Core(width - 300, height / 2, currentLayer, 0, freq));

  playlist[0].play();
}

function draw() {
  if (!playlist[0].isPlaying()) {
    playlist[0].loop();
  }
  background(0);

  if (sceneIndex == 0) {
  } else if (sceneIndex == 1) {
  }
  // let guideBtn = document.createElement("guide");
  // guideBtn.id = "button-guide";
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].display();
  }

  push();
  translate(prince.x + 130, prince.y - 60);
  noStroke();
  rectMode(CENTER);

  fill(255);
  rect(0, 0, textWidth("this is test hhhh") + 60, 50, 20);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(20);
  noStroke();
  fill(0);
  text("this is test hhhh", 0, 0);
  pop();

  drawStem(
    map(sin(frameCount * 0.01), -1, 1, -60, 60),
    map(cos(frameCount * 0.01), -1, 1, -10, 0),
    300,
    height / 2,
    0
  );
  if (friend) {
    drawStem(
      map(sin(frameCount * 0.01 + freq), -1, 1, -60, 60),
      map(cos(frameCount * 0.01 + freq), -1, 1, -10, 0),
      width - 300,
      height / 2,
      0
    );
  }

  if (keyIsPressed) {
    if (keyCode == 39 || keyCode == 37) {
      //ArrowRight / ArrowLeft
      prince.ifIdle = false;
      prince.ifWalk = true; // => this.ifWalk

      if (prince.walkCount <= 60) {
        prince.walkCount++;
      }
    }
    if (friend) {
      if (key == "a" || key == "d") {
        //ArrowRight / ArrowLeft
        prince2.ifIdle = false;
        prince2.ifWalk = true; // => this.ifWalk

        if (prince2.walkCount <= 60) {
          prince2.walkCount++;
        }
      }
    }
  } else {
    prince.ifWalk = false;
    prince.ifIdle = true;
    prince.walkCount = 0;
    prince.clothX = 0;
    if (friend) {
      prince2.ifWalk = false;
      prince2.ifIdle = true;
      prince2.walkCount = 0;
      prince2.clothX = 0;
    }
  }

  prince.update();
  prince.display(cores[0].dataNum);
  if (friend) {
    prince2.update();
    prince2.display(cores[1].dataNum);
  }

  if (seeds.length == 0) {
    currentLayer = 1;
    dataNum = 0;
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + currentLayer * 3)) {
      seeds.push(
        new Seed(
          width / 2 - 100,
          height / 2,
          currentLayer,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0
        )
      );
    }
  } else {
    for (let i = 0; i < seeds.length; i++) {
      dataNum += seeds[i].data.length;
      if (!stopHover) {
        if (seeds[i].isWriting || seeds[i].isReading) {
          stopHover = true;
          // console.log("stop!");
        }
      } else {
        // console.log(document.getElementById("writeAreaContainer"));
        if (
          document.getElementById("writeAreaContainer") == null &&
          document.getElementById("readAreaContainer") == null
        ) {
          stopHover = false;
        }
        if (seeds[i].achievedData.length != 0) {
          achieveData.push(seeds[i].achievedData[0]);
          seeds[i].achievedData.splice(0, 1);
        }
      }
    }

    if (dataNum == seeds.length) {
      if (currentLayer == maxLayerNum) {
        for (let i = 0; i < seeds.length; i++) {
          seeds[i].ifFly = true;
        }
      } else {
        currentLayer++;
        for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + currentLayer * 3)) {
          seeds.push(
            new Seed(
              width / 2 - 100,
              height / 2,
              currentLayer,
              i,
              random(0, 0.003),
              random(0.001, 0.002),
              0
            )
          );
        }
      }
    }
    dataNum = 0;
  }
  for (let i = 0; i < seeds.length; i++) {
    seeds[i].update(stopHover);
    seeds[i].display();
    if (!seeds[i].ifFly) {
      seeds[i].lastCoreX = seeds[i].coreX;
      seeds[i].lastCoreY = seeds[i].coreY;
      seeds[i].lastSeedX = seeds[i].seedX;
      seeds[i].lastSeedY = seeds[i].seedY;
    }
    if (seeds[i].flyDone) {
      seeds.splice(i, 1);
    }
  }
  if (friend) {
    for (let i = 0; i < seeds.length; i++) {
      seeds2[i].update(stopHover);
      seeds2[i].display();
    }
  }

  cores[0].update(stopHover, achieveData);
  cores[0].display();
  if (friend) {
    cores[1].update(stopHover, achieveData);
    cores[1].display();
  }

  //draw ground
  // push();
  // noStroke();
  // fill("#B0926A");
  // rect(0, height - 30, width, 30);
  // pop();
  achieveData = [];
}

function drawStem(x, y, transX, transY, colorIndex) {
  push();
  translate(transX, transY);
  strokeWeight(5);
  stroke(
    colorStem[colorIndex][0],
    colorStem[colorIndex][1],
    colorStem[colorIndex][2]
  );
  noFill();
  bezier(x, y, 0, 150, 0, 500, 0, 500);
  pop();
}

//http://127.0.0.1:5501/B611/
function keyPressed() {
  if (keyCode == 38) {
    //ArrowUp
  }
  if (keyCode == 40) {
    //ArrowDown
  }

  if (keyCode == 70) {
    // //f
    // for (let i = 0; i < seeds.length; i++) {
    //   seeds[i].ifFriend = true;
    // }
    // for (let i = 0; i < cores.length; i++) {
    //   cores[i].ifFriend = true;
    // }
  }
  if (keyCode == 220) {
    // |\、
    friend = true;
  }

  // if (keyCode == 66) {
  //   //b
  //   for (let i = 0; i < seeds.length; i++) {
  //     seeds[i].ifFriend = false;
  //     seeds[i].isHovering = false;
  //   }
  //   for (let i = 0; i < cores.length; i++) {
  //     cores[i].ifFriend = false;
  //     cores[i].isHovering = false;
  //   }
  // }

  if (keyCode == 9) {
    //tab
    for (let i = 0; i < seeds.length; i++) {
      if (seeds[i].data.length == 0) {
        // console.log("test");
        seeds[i].data[0] = "this is a test";
        break;
      }
    }
  }
  // if (key === "s") {
  // saveGif("prince-1.1", 3);
  // }
}

function mousePressed() {
  for (let i = 0; i < seeds.length; i++) {
    if (seeds[i].isHovering && !seeds[i].isWriting) {
      seeds[i].ifClicked = true;
    }
  }
  for (let i = 0; i < cores.length; i++) {
    if (cores[i].isHovering && !cores[i].isReading) {
      cores[i].ifClicked = true;
    }
  }
}
