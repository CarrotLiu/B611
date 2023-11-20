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

let btnx, btny;
let chatx, chaty;

let chat;

let textIndex = 0;
let texts = ["Who am I? Where am I?", 
"Hello?",
"Hello, Little Prince, glad you finally notice me again.", 
"I'm Dande, the inner you.",
"What do you mean by the 'inner me'?", 
"I am your real self, the self without any disguise.",
"You cultivated me, and I grew with you. You were the master of me, and we were both glowing with beautiful colors.",
"However, it's been a long time since you paid attention to me.",
"My core used to store all the character traits you possessed, which made you as you.",
"My seeds composed your ideal self, which stores all the character traits that you desired but did not possess.",
"Now, all the traits are lost, and the color fades.",
"Can you talk to me, just like you did before, to restore our color?"
];

let friendReq = "Can I be your friend?";

let switchText = false;

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
  prince = new Prince(width / 2 + 100, height / 2 + 60, 0);
  prince2 = new Prince(width - 500, height / 2 + 80, freq);
  btnx= prince.x - 60;
  btny = prince.y - 100;
  chat = new Chat(prince.x + 135, prince.y - 120, "this is test hhhh", font);
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

  
  // let guideBtn = document.createElement("guide");
  // guideBtn.id = "button-guide";
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].display();
  }
  
  // push();
  // translate(prince.x + 130, prince.y - 60);
  // noStroke();
  // rectMode(CENTER);

  // fill(255);
  // rect(0, 0, textWidth("this is test hhhh") + 60, 50, 20);
  // textAlign(CENTER, CENTER);
  // textFont(font);
  // textSize(20);
  // noStroke();
  // fill(0);
  // text("this is test hhhh", 0, 0);
  // // console.log(textWidth("this is test hhhh"))
  // pop();

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
          300,
          height / 2,
          currentLayer,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0,
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
              300,
              height / 2,
              currentLayer,
              i,
              random(0, 0.003),
              random(0.001, 0.002),
              0,
              0
            )
          );
        }
        // console.log(currentLayer, seeds);
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
  if (sceneIndex == 0) {
    if(textIndex == 0 || textIndex == 1 || textIndex == 4){
      chatx = prince.x + 135;
      chaty = prince.y - 120;
      btnx= prince.x + 120;
      btny = prince.y + 130;
    } else{
      chatx = cores[0].x - 130;
      chaty = cores[0].y - 135;
      btnx= cores[0].x - 100;
      btny = cores[0].y + 130;
    }

    if(textIndex == 0){
      chat.text = texts[textIndex];
      chat.update(chatx, chaty);
      chat.display();
      drawButton(btnx, btny);
      push();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(20);
      textFont(font);
    } else{
      if(dist(prince.x, height / 2, 0, height / 2) <= 500){
        chat.text = texts[textIndex];
        chat.update(chatx, chaty);
        chat.display();
        drawButton(btnx, btny);
        push();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
        textFont(font);

      }else{
        text("Press Left / Right Arrow Button to move the prince", width / 2, 60);
      }
    }
    
    if(textIndex == 11){   
      text("Click the core of Dande to write about your character traits and story", width / 2, 60);
      text("Click the seeds of Dande to write about the character traits you desire", width / 2, 100);
      pop();
    } else if(textIndex == 7){
      push();
      fill(255, 10, 10, map(sin(frameCount * 0.05), -1, 1, 0, 255));
      translate(cores[0].x, cores[0].y);
      circle(cores[0].coreX, cores[0].coreY, floor(map(cores[0].layerNum, 1, 8, 30, 45)));
      pop();
    } else if(textIndex == 8){
      for(let i = 0; i < seeds.length; i ++){
        push();
        translate(seeds[i].x + seeds[i].coreX + seeds[i].seedX, seeds[i].y + seeds[i].coreY + seeds[i].seedY);
        fill(255, 10, 10, map(sin(frameCount * 0.05), -1, 1, 0, 255));
        circle(0, 0, seeds[i].size);
        pop();
      }
    }
    
  } else if (sceneIndex == 1) {
  
  }

  //draw ground
  // push();
  // noStroke();
  // fill("#B0926A");
  // rect(0, height - 30, width, 30);
  // pop();
  achieveData = [];
}

function drawButton(x, y){
  push();
  noStroke();
  fill(255);
  circle(x, y, 10);
  strokeWeight(1);
  noFill();
  circle(x, y, 50);
  if(dist(mouseX, mouseY, btnx, btny) < 20){
    stroke(255);
    circle(x, y, 50);
  }else{
    // stroke(255, map(sin(frameCount * 0.02 / 3), -1, 1, 0, 255));
    // circle(x, y, 30);
    stroke(255, map(sin(frameCount * 0.02 + PI * 2 / 3), -1, 1, 0, 255));
    circle(x, y, 40);
    stroke(255, map(sin(frameCount * 0.02 + PI), -1, 1, 0, 255));
    circle(x, y, 50);
  }
  strokeWeight(1);
  noFill();
  circle(x, y, 50);
  pop();
  if(dist(mouseX, mouseY, x, y) < 20){
    for (let i = 0; i < 80; i++) {
      noStroke();
      fill(255, 10 - floor(map(i, 0, 99, 5, 0)));
      circle(x, y, i * 0.35);
    }
  }
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
  if(dist(mouseX, mouseY, btnx, btny) < 20){
    switchText = true;
    if(textIndex < 11){
      textIndex ++; 
    } else{
      textIndex = 0;
    }
    
  }
}

