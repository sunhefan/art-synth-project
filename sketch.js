var fft;
let fft2;

var bands = 1024; // resolution of the FFT
var spectrum, spectrum2;
var terrain = [];
var terrain2 = [];
let zoom = 20;
let peak = 80;
//let notes = ["A7","F6","G6","E6","D6"," "," "," "," "," "," "];
let notes = [
  ["A5", "C#5", "E5"],
  ["A5", "C5", "E5"],
  ["D5", "F#5", "A5"],
  ["G4", "B5", "D5"],
  ["E4", "G4", "B4"],
  ["C3", "E3", "G3"],
  ["F3", "A3", "C4"]
];

let keynotes = [
  ["C2", "E2", "G2"],
  ["F2", "A2", "C2"],
  ["A2", "C2", "E2"],
  ["B2", "D2", "F#2"],
  ["C3", "E3", "G3"],
  ["F3", "A3", "C3"],
  ["A3", "C3", "E3"],
  ["B3", "D3", "F#3"]
];


var lines = 3;
let duration;
let durationk;
let trigger;
var synth;
let synthkey;
let px = 0;
let notecounter = 10;

function setup() {
  createCanvas(800, 800);
  //frameRate(15);
  //file = new SoundFile(this, "03badnews.mp3");

  // file = new SoundFile(this, "popcorn.mp3");
  //terrain = new float [lines][bands];
  // create fft object
  fft = new p5.FFT(0.8, bands);
  fft2 = new p5.FFT(0.8, bands);


  synth = new p5.PolySynth();
  synthkey = new p5.PolySynth();
  //  synth.AudioVoice = 16;

  // fft.setInput(synth);
  fft2.setInput(synthkey);


  for (let y = 0; y < lines; y++) {
    terrain[y] = [];
    for (let x = 0; x < bands; x++) {
      terrain[y][x] = 0;
    }
  }

  for (let y = 0; y < lines; y++) {
    terrain2[y] = [];
    for (let x = 0; x < bands; x++) {
      terrain2[y][x] = 0;
    }
  }
  //strokeWeight(2);
  // setInterval(chooseNote, 120);
}

function draw() {
  background(50 );
  fill(frameCount % 300, 100, 200);

  var c = color(50);
  stroke(c);

 zoom = map(mouseX, 0, width, 2, 100);
  // translate(0, 0);
  //rotateZ(radians(rotZ));
  //-translate(0, -600);
  spectrum = fft.analyze();
  spectrum2 = fft2.analyze();

  for (let y = 0; y < terrain2.length; y++) {
    beginShape();
    vertex(0, ((height / lines) * y + 70));
    vertex(20, ((height / lines) * y + 70));
    for (let x = 0; x < spectrum2.length; x++) {
      //  stroke(255,255,map(x,0,bands/zoom,0,255))
      vertex(map(x, 0, bands / zoom, 20, width / 2), (map(terrain2[y][x], 0, 255, 0, -peak)) + ((height / lines) * y + 70));
    }
    vertex(0, ((height / lines) * y + 70));
    endShape();
  }


  for (let y = 0; y < terrain.length; y++) {
    beginShape();
    // vertex(0, ((height / lines) * y + 70));
    //vertex(10, ((height / lines) * y + 70));
    for (let x = 0; x < spectrum.length; x++) {
      //  stroke(255,255,map(x,0,bands/zoom,0,255))
      vertex(map(x, 0, bands / zoom, width / 2, width), (map(terrain[y][x], 0, 255, 0, -peak)) + ((height / lines) * y + 70));
    }
    vertex(width / 2, ((height / lines) * y + 70))
    endShape();
  }


  for (var y = lines - 1; y >= 0; y--) {
    //for (var i = 0; i < bands; i++) {
    terrain2[0] = spectrum2;
    if (y > 0) {
      if (y < lines) {
        terrain2[y] = terrain2[y - 1];
      }
    }
  }

  for (var y = lines - 1; y >= 0; y--) {
    //for (var i = 0; i < bands; i++) {
    terrain[0] = spectrum;
    if (y > 0) {
      if (y < lines) {
        terrain[y] = terrain[y - 1];
      }
    }
  }
}

function keyPressed() {
  chooseKeyNote();
}

function keyReleased() {
  synthkey.noteRelease();
}

function mousePressed() {
  chooseNote();
}

function mouseReleased() {
  synth.noteRelease();
}

function chooseNote() {
  // synth.noteRelease();
  let chordPicker =  floor(map(mouseX, 10, width, 0, notes.length));

  for (let i = 0; i < 3; i++) {
    synth.noteAttack(notes[chordPicker][i], i*0.8 , 0, duration);
  }
}

function chooseKeyNote() {
  // synth.noteRelease();
  let chordPicker2 = floor(random(keynotes.length));
  // console.log(chordPicker2);
  durationk = random(0.2, 1.0);
  //  play(note, [velocity], [secondsFromNow], [sustainTime])
  //synth.play(notes[floor(random(notes.length))], 0.5, .15, .1);
  //synth.triggerAttack(notes[floor(random(notes.length))], 0.3, 0, duration);
  for (let i = 0; i < 3; i++) {
    synthkey.noteAttack(keynotes[chordPicker2][i], i * 0.8, 0, durationk);
  }
}
