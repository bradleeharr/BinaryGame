
let isGameStarted = false;
let showValues = false;
let showSettings = false;

let startBinaryButton;
let startHexButton;
let settingsButton;

let sounds;
let fonts;
let game;

function preload() {
  sounds = new Sounds();
  fonts = new Fonts();
} 

function setup() {
  sounds.setVolume(1);
  let cnv = createCanvas(400, 600);
  cnv.parent('canvasContainer'); 
  windowResized();
}

function titleButtons() {
  let button1X = width/2-buttonW/2 - 80;
  let button1Y = height/2+50;
  let button2X = width/2-buttonW/2 + 80;
  let button2Y = height/2+50;
  let button3X = width/2-buttonW;
  let button3Y = height/2+180;
  
  startBinaryButton = new Button(button1X, button1Y, buttonW, buttonH, 'Binary');
  startHexButton = new Button(button2X, button2Y, buttonW, buttonH, 'Hex');
  settingsButton = new Button(button3X, button3Y, 2*buttonW, buttonH, 'Settings');
  settingsWindow = new Settings(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth*0.99, windowHeight*0.99);
  titleButtons();
}

function draw() {
  if (!isGameStarted && !showSettings) {
    drawTitleScreen();
  }
  else if (!isGameStarted && showSettings) {
    settingsWindow.draw();
  }
   else if (isGameStarted) {
    game.drawGame();
  }
}


function mousePressed() {
  if (!isGameStarted && !showSettings) {
    if (startBinaryButton.isClicked(mouseX, mouseY)) {
        isGameStarted = true;
        game = new BinaryGame(sounds, showValues);
        game.newRound();
    }
    if (settingsButton.isClicked(mouseX, mouseY)) {
      showSettings = true;
      console.log("Settings");
    }
  } 
  else if (!isGameStarted && showSettings) {
    showSettings = false;
  }
  else {
    game.mousePressed(mouseX, mouseY);  
  }

  if (game.gameEnd === true) {
    isGameStarted = false;
    console.log("TEST");
  }
}



