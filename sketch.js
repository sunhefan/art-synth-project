'use strict';

let song1;
let song2;
let song3;
let song4;
var extraScale = 0;

function preload() {
  song1 = loadSound("assets/song1.mp3");
  song2 = loadSound("assets/song1.mp3");
  song3 = loadSound("assets/song1.mp3");
  song4 = loadSound("assets/song1.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


}

function draw() {
  background(55);

}
function keyTyped() {
  extraScale = 1;
  if (key == "a") {
    song1.play();
  }
  else if (key == "l") {
    song2.play();
  }
  else if (key == "s") {
    song3.play();
  }
  else {
    song4.play();
  }
}
