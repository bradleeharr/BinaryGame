let currentDecimal; // The current decimal number to be converted
let binaryOptions; // The binary representation the player is building
let score = 0; // The player's score
let maxBinaryLength; // Maximum length of the binary string based on difficulty
let playerAnswer = 0;
let binaryString;
function setup() {
    createCanvas(800, 600);
    newRound();
}

function newRound() {
  currentDecimal = Math.floor(Math.random() * 16); // Adjust range as needed

  let maxBinaryLength = 2;
  let maxVal = 4
    while (maxVal <= currentDecimal) {
        maxBinaryLength *= 2
        maxVal = maxVal^2
    }

  binaryOptions = Array(maxBinaryLength).fill(0);
  binaryString = Array(maxBinaryLength).fill(0).join('');
  maxBinaryLength = Math.ceil(Math.log2(currentDecimal + 1)); // Calculate binary length
}

function draw() {
  background('#f5f5f5'); // Use a light, modern background color

  textSize(32);
  fill('#333'); // Dark text color for contrast
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
      rect(x, 150, 50, 50, 5); // Rounded corners
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
      newRound(); // Start a new round
  } else if (binaryString.length === maxBinaryLength) {
      score = 0; // Reset score if incorrect
      newRound(); // Start a new round
  }
}
