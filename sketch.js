let currentDecimal; // The current decimal number to be converted
let binaryOptions; // The binary representation the player is building
let score = 0; // The player's score
let maxBinaryLength; 
let playerAnswer = 0;
let binaryString;
let correctSound;
let clickSound;
let showValues = 1;

function preload() {
    correctSound = loadSound('success-1-6297.mp3');
    clickSound = loadSound('spunchy-taps-ui-5-183901.mp3');
}


function setup() {
  correctSound.setVolume(0.8);
  clickSound.setVolume(0.3);
  createCanvas(windowWidth, windowHeight);
  newRound();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function newRound() {
  currentDecimal = Math.floor(Math.random() * 64); // Adjust range as needed

  maxBinaryLength = 2;
  let maxVal = 4;
    while (maxVal <= currentDecimal) {
        maxBinaryLength *= 2;
        maxVal = maxVal**2;
    }

  binaryOptions = Array(maxBinaryLength).fill(0);
  binaryString = Array(maxBinaryLength).fill(0).join('');    
  playerAnswer = 0;
}

function draw() {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  background('#f5f5f5'); 

  textSize(32);
  fill('#333'); 
  text(`Decimal Number: ${currentDecimal}`, 50, 50);
  text(`Score: ${score}`, 50, 100);
  text(`Number: ${playerAnswer}`, 50, 300);
  text(`Binary String: ${binaryString}`, 50, 400);

  // Style binary choice buttons
  for (let i = 0; i < maxBinaryLength; i++) {
      let isSelected = binaryOptions[i];
      let x = 50 + i * 60; // Increase spacing
      fill(isSelected ? '#4CAF50' : '#FFFFFF');
      stroke('#333');
      rect(x, 150, 50, 50, 5); 
      if (showValues) {
        text(2**(maxBinaryLength-i-1), x, 250);
      }
      if (isSelected) {
          fill('#FFFFFF');
          text('1', x + 15, 185);
      } else {
          fill('#333');
          text('0', x + 15, 185);
      }
  }
}
function mousePressed() {
  let optionWidth = 50;
  let optionHeight = 50;
  let xStart = 50; // X-coordinate where options start
  let yStart = 150; // Y-coordinate where options start
  let spacing = 60; // Spacing between options

  for (let i = 0; i < maxBinaryLength; i++) {
      let x = xStart + i * spacing;
      let y = yStart;

      // Check if the mouse click is within the boundaries of the rectangle
      if (mouseX > x && mouseX < x + optionWidth && mouseY > y && mouseY < y + optionHeight) {
          binaryOptions[i] = binaryOptions[i] ? 0 : 1; // Toggle the option
          clickSound.play(); // Play click sound
          checkAnswer();
          break;
      }
  }
}


function checkAnswer() {
  binaryString = binaryOptions.join('');
  playerAnswer = parseInt(binaryString, 2);
  if (playerAnswer === currentDecimal) {
      score++;
      correctSound.play(); // Play sound for correct answer
      background('#d5ffd5'); 

      newRound(); // Start a new round
  } 
     /* else if (lives < 0) {
     score = 0; // Reset score if incorrect
      newRound(); // Start a new round 
    }*/
}
