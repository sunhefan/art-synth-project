'use strict';

'use strict';
// let wave;
// let button;
// let slider;
// let playing =false;
// let env;
//
//
// function setup() {
//   createCanvas(400, 400);
//
//   env =new p5.Env();
//   env.setADSR(0.08, 0.1, 0.5, 1);
//   env.setRange(1.2,0);
//
//
//   wave = new p5.Oscillator();
//   // slider = createSlider(100,1200,440);
//
//   wave.setType('triangle');
//   wave.start();
//   wave.freq(400);
//   wave.amp(env); //change from 0 to env
//
//   button =createButton('play/pause');
//   button.mousePressed(toggle);
//
// }
//
// function draw() {
//
//   // wave.freq(slider.value());
//
//   if (playing){
//
//     background(25, 250, 247 );
//   } else{
//     background(50);
//   }
// }
//
// function toggle(){
//   env.play();
//   // if(!playing){
//   //   wave.amp(0.8,1);
//   //   playing =true;
//   // } else {
//   //   wave.stop();
//   //   wave.amp(0.8,1);
//   //   playing=false;
//   // }
// }

let osc;
let waveFormSelect;
let pNoise;

let button1;
let button2;
let button3;
let button4;
let button5;


let mySound1;
let mySound2;
let mySound3;
let mySound4;
let mySound5;

let env;
let wave;
let playing =false;



function preload(){
  soundFormats('mp3','ogg');
  mySound1=loadSound('assets/song1.mp3');
  mySound2=loadSound('assets/song2.mp3');
  mySound3=loadSound('assets/song3.mp3');
  mySound4=loadSound('assets/song4.mp3');
  mySound5=loadSound('assets/song5.mp3');
}


function setup(){


  env =new p5.Env();
   env.setADSR(0.08, 0.1, 0.8, 1);
   env.setRange(1.2,0);

wave = new p5.Oscillator();

mySound1.setVolume(0.8);
mySound1.play();

mySound2.setVolume(0.8);
mySound2.play();
mySound3.setVolume(0.8);
mySound3.play();
mySound4.setVolume(0.8);
mySound4.play();
mySound5.setVolume(0.8);
mySound5.play();



wave.setType('triangle');
  wave.start();
  wave.freq(100);
  wave.amp(env);

button1 =createButton('play');
button1.mousePressed(toggle);

button2 = createButton('play2');
button2.mousePressed(toggle2);

button3 = createButton('play3');
button3.mousePressed(toggle3);

button4 = createButton('play4');
button4.mousePressed(toggle4);

button5 = createButton('play5');
button5.mousePressed(toggle5);

// createCanvas(windowWidth,windowHeight);
createCanvas(600,600);
osc= new p5.Oscillator();
//create a dropdown menu to change osc Type
createSpan('Select Waveform: ')
waveFormSelect= createSelect();

waveFormSelect.option('sine');
waveFormSelect.option('sawtooth');
waveFormSelect.option('square');
waveFormSelect.option('triangle');
waveFormSelect.changed(setWaveForm);

// button =createButton('play');
// button.mousePressed(toggle);

}


function toggle(){

  mySound1.play();
}

function toggle2(){

  mySound2.play();
}

function toggle3(){

  mySound3.play();
}

function toggle4(){

  mySound4.play();
}

function toggle5(){

  mySound5.play();
}

function setWaveForm(){
  osc.setType(waveFormSelect.value());
}

function draw (){

  pNoise = noise(frameCount / 20)*50;
  osc.freq(map(mouseX,0,width,60,1200) + pNoise);

  // osc.amp(map(mouseY, 0, height, .2, 0));
  osc.amp(map (sin(frameCount/20), -1, 1, 1, 0.2));
}

function mousePressed(){
    osc.start();

}

function mouseReleased(){
  osc.stop();
}

// function keyTyped() {
//   if (key === 'a') {
//
//   } else if (key === 'b') {
//     value = 0;
//   }
//
// }
