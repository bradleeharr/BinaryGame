let currentDecimal; // The current decimal number to be converted
let binaryOptions; // The binary representation the player is building
let score = 0; // The player's score
let maxBinaryLength; 
let playerAnswer = 0;
let binaryString;

let showValues = 1;
let lives = 3;

/* Sounds */
let correctSound;
let incorrectSound;
let clickSound;

/* Font */
let font;
let font_bold;
let font_oblique;
let largeFontSize;
let smallFontSize;

let isGameStarted = false;


function preload() {
    //correctSound = loadSound('sound/success-1-6297.mp3');
    //incorrectSound = loadSound('sound/negative_beeps-6008.mp3');
    //clickSound = loadSound('sound/decidemp3-14575.mp3');

    font = loadFont('fonts/FallingSky-JKwK.otf')
    font_bold = loadFont('fonts/FallingSkyBold-zemL.otf')
    font_oblique = loadFont('fonts/FallingSkyBlackOblique-j37y.otf')

} 


function setup() {
  //correctSound.setVolume(0.5);
  //incorrectSound.setVolume(0.4);
  //clickSound.setVolume(0.1);
  let cnv = createCanvas(400, 600);
  cnv.parent('canvasContainer'); 
  windowResized()
  newRound();
}

function windowResized() {
  resizeCanvas(windowWidth*0.99, windowHeight*0.99);

}


function newRound() {
  currentDecimal = Math.floor(Math.random() * 256 ) + 1; // Adjust range as needed

  maxBinaryLength = 2;
  let maxVal = 4;
    while (maxVal <= currentDecimal) {
        maxBinaryLength *= 2;
        maxVal = maxVal**2;
    }

  binaryOptions = Array(maxBinaryLength).fill(0);

  bits = currentDecimal.toString(2).split('').map(Number);
  padding = Array(maxBinaryLength - bits.length).fill(0);

  binaryAnswer = padding.concat(bits);
  binaryString = Array(maxBinaryLength).fill(0).join('');  
  playerAnswer = 0;
}


function drawInfo() {
  textAlign(CENTER);
  background(BLACK);
  fill(WHITEG); 
  textSize(32);
  text(`Make the Decimal Number: ${currentDecimal}`, width/2, height/2 - 250);
  text(`Lives: ${lives}/3`, width/2 + 200, height/2 - 350);
  text(`Score: ${score}`, width/2 - 200, height/2 - 350);
  textSize(80);
  fill(WHITE);
  text(`${playerAnswer}`, width/2, height/2 - 125);
  /*
  text(`Binary String: ${binaryString}`, 50, 400);
  text(`Binary Options: ${binaryOptions}`, 150, 450);
  text(`Binary Answer: ${binaryAnswer}`, 250, 500); */

}

let optionWidth = 80;
let optionHeight = 80;
let xStart = 50; // X-coordinate where options start
let spacing = 100; // Spacing between options

function drawGame() {
  drawInfo();
  xStart = width / 2 - (spacing * (maxBinaryLength))/2;
  textAlign(CENTER);
  // Style binary choice buttons
  for (let i = 0; i < maxBinaryLength; i++) {
      let isSelected = binaryOptions[i];
      let isCorrect = (binaryAnswer[i] == binaryOptions[i]);
      let x = xStart + i * spacing; // Increase spacing

      /* Choose Color of Selection */
      if (isSelected && isCorrect) {
        fill('#4CAF50'); // Green
      }
      if (isSelected && !isCorrect) {
        fill('#AF4C50'); // Red
      }
      if (!isSelected) {
        fill('#FFFFFF');
      }
      /* Draw box */
      stroke('#333');
      rect(x, height/2+50, optionWidth, optionHeight, 15); 
   
      /* Draw bits */
      if (isSelected) {
          fill('#FFFFFF'); textSize(64);
          text('1', x + optionWidth/2, height/2+10);
      } else {
          fill('#888'); textSize(64);
          text('0', x + optionWidth/2, height/2+10);
      }

      /* Draw numbers Below */
      if (showValues) {
        textSize(22); text(2**(maxBinaryLength-i-1), x + optionWidth/2 , height/2 + optionHeight + 100);
      }
  }

  //drawMouse();
}

function draw() {
  if (!isGameStarted) {
    drawTitleScreen();
  } else {
    drawGame();
  }
}



function mousePressed() {
  if (!isGameStarted) {
    isGameStarted = true;
    newRound();
  } 
  else {
    for (let i = 0; i < maxBinaryLength; i++) {
        let x = xStart + i * spacing;
        let y = height/2+50;

        // Check if the mouse click is within the boundaries of the rectangle
        if (mouseX > x && mouseX < x + optionWidth && mouseY > y && mouseY < y + optionHeight) {
            binaryOptions[i] = binaryOptions[i] ? 0 : 1; // Toggle the option
            if (binaryOptions[i] === binaryAnswer[i]) {
              //clickSound.play(); // Play click sound
            }
            else {
              lives--;
              //incorrectSound.play();
            }
            checkAnswer();
            break;
        }
      }
    } 
  }


function checkAnswer() {
  binaryString = binaryOptions.join('');
  playerAnswer = parseInt(binaryString, 2);
  if (playerAnswer === currentDecimal) {
      score++;
      //correctSound.play(); // Play sound for correct answer
      background('#d5ffd5'); 
      newRound(); // Start a new round
  } 
    else if (lives < 0) {
    isGameStarted = false;
    //incorrectSound.play();
    score = 0; // Reset score if incorrect
    lives = 3;
    newRound(); // Start a new round 
    }
  }
