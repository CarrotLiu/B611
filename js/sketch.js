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
let seeds = [];
let cores = [];

let dataNum = 0;
let coreDataNum = 0;
let stopHover = false;
let achieveData =[];
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
  // meteor = new Meteor();
  prince = new Prince(width / 2 + 100, height / 2 + 60);
  for(let i = 0; i < 150; i ++){
    stars.push(new Star(random(0, width), random(0, height)));
  }
  for (let r = currentLayer; r > 0; r--) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      seeds.push(
        new Seed(
          width / 2 - 100,
          height / 2,
          r,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0
        )
      );
    }
  }
  cores.push(new Core(width / 2 - 100, height / 2, currentLayer, 0));

  playlist[0].play();
}

function draw() {
  if(!playlist[0].isPlaying()){
    playlist[0].loop();
  }
  background(5);
  // if(meteor.x > window.innerWidth + 100 ||
  //   meteor.x < -100 || 
  //   meteor.y > window.innerHeight + 100
  // ){
  //   meteor = new Star(100, 100);
  // } else {
  //     meteor.display();
  // }
  if(sceneIndex == 0){

    // let startBtn = document.createElement("start");
    // startBtn.id = "button-start";
  } else if(sceneIndex == 1){

  }
  // let guideBtn = document.createElement("guide");
  // guideBtn.id = "button-guide";
  for(let i = 0; i < stars.length; i++){
    stars[i].update()
    stars[i].display();
  }
  drawStem(
    map(sin(frameCount * 0.01), -1, 1, -60, 60),
    map(cos(frameCount * 0.01), -1, 1, -10, 0),
    width / 2 - 100,
    height / 2,
    0
  );
  if (keyIsPressed) {
    if (keyCode == 39 || keyCode == 37) {
      //ArrowRight / ArrowLeft
      prince.ifIdle = false;
      prince.ifWalk = true; // => this.ifWalk

      if (prince.walkCount <= 60) {
        prince.walkCount++;
      }
    }
  } else {
    prince.ifWalk = false;
    prince.ifIdle = true;
    prince.walkCount = 0;
    prince.clothX = 0;
  }

  prince.update();
 
  prince.display(cores[0].dataNum);
  
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
    for(let i = 0; i < seeds.length; i ++){
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
    

    if(dataNum == seeds.length){
      if(currentLayer == maxLayerNum){
        for (let i = 0; i < seeds.length; i++) {
          seeds[i].ifFly = true;
        }
        
      } else{
        currentLayer ++;
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
    dataNum= 0;
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
  for (let i = 0; i < cores.length; i++) {
    cores[i].update(stopHover, achieveData);
    cores[i].display();
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
    //f
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = true;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = true;
    }
  }
  
  if (keyCode == 66) {
    //b
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = false;
      seeds[i].isHovering = false;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = false;
      cores[i].isHovering = false;
    }
  }

  if(keyCode == 68){
    for(let i = 0; i < seeds.length; i ++){
      if(seeds[i].data.length == 0){
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
