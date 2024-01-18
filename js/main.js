
let gameState = "TITLE";

let startBinaryButton;
let startHexButton;
let settingsButton;

let sounds;
let fonts;
let settings;
let game;


function preload() {
  sounds = new Sounds();
  fonts = new Fonts();
  settings = new Settings();
  
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
  settingsWindow = new SettingsWindow(0, 0, width, height, settings, sounds);
}

function windowResized() {
  resizeCanvas(windowWidth*0.99, windowHeight*0.99);
  titleButtons();
  game?.resize();
}

function draw() {
  if (gameState === "TITLE") {
    drawTitleScreen();
  }
  else if (gameState === "SETTINGS") {
    settingsWindow.draw();
  }
   else if (gameState === "GAME") {
    game.drawGame();
  }
}


function mousePressed() {
  if (gameState === "TITLE") {
    if (startBinaryButton.isClicked(mouseX, mouseY)) {
      game = new BinaryGame(sounds, settings);
      gameState = "GAME";
    }
    if (startHexButton.isClicked(mouseX, mouseY)) {
      game = new HexGame(sounds, settings); 
      gameState = "GAME";
    }
    if (settingsButton.isClicked(mouseX, mouseY)) {
      gameState = "SETTINGS";
    }
  } 
  else if (gameState === "SETTINGS") {
    if (settingsWindow.isClicked(mouseX, mouseY)) {
      gameState = "TITLE";
    }
  }
  else if (gameState === "GAME") 
  {
    game.mousePressed(mouseX, mouseY);  
    if (game.gameEnd === true) {
      gameState = "TITLE";
      console.log("TEST");
    }
  }
  else {
    text("Error, invalid game state. Please refresh the page.", 0, 0);
  }


}



