class HexGame extends Game {
  constructor(sounds, settings) {
      super(sounds, settings);
      this.maxHexLength = 2; // Adjust as needed for the maximum number of hex digits
      this.optionWidth = 70;
      this.optionHeight = 20;
      this.xStart = 50; // X-coordinate where options start
      this.spacing = 100; // Spacing between options
      this.hexAnswer;
      this.currentDecimal;

      this.gameEnd = false;

      this.hexOptionsGrid;
      this.lives = 9;
      this.newRound();
      this.playerAnswer;
      this.playerAnswerArr = Array(this.maxHexLength).fill('0');

  }

  newRound() {
      this.currentDecimal = Math.floor(Math.random() * this.settings.maxHexVal) + 1; // Adjust range as needed
    
      this.maxHexLength = Math.ceil(Math.log(this.currentDecimal + 1) / Math.log(16));
      this.options = Array(this.maxHexLength).fill(0);

      let hexDigits = this.currentDecimal.toString(16).toUpperCase().split('');
      let padding = Array(this.maxHexLength - hexDigits.length).fill('0');

      this.hexAnswer = padding.concat(hexDigits);
      this.playerAnswer = 0
      this.playerAnswerArr = Array(this.maxHexLength).fill(0);
      this.hexOptionsGrid = new HexOptionsGrid(this.maxHexLength, this.optionWidth, this.optionHeight, (width - this.optionWidth * this.maxHexLength)/2, height/2);
  }

  resize() {
    let newStartX = (width - this.optionWidth * this.maxHexLength)/2;
    let newStartY = height/2;
    this.hexOptionsGrid.resize(newStartX, newStartY, this.optionWidth, this.optionHeight);
  }

  drawGame() {
      this.drawInfo();
      
      //text(`0x${this.playerAnswer}`, width/2, height/2 - 50);
      //text(`0x${this.hexAnswer}`, width/2+300, height/2 - 50);
      text(`0x${this.playerAnswerArr.join('')}`, width/2, height/2-25);
      textSize(32);

      text(`${this.playerAnswer}`, width/2, height/2 - 100);


      this.xStart = width / 2 - (this.spacing * (this.maxHexLength))/2;
      textAlign(CENTER);
 
      this.hexOptionsGrid.draw();


    }

  mousePressed(mouseX, mouseY) {
    let clickedOption = this.hexOptionsGrid.checkClicked(mouseX, mouseY);
    if (clickedOption) {
        this.playerAnswerArr[clickedOption.col] = clickedOption.value;
        this.playerAnswer = parseInt(this.playerAnswerArr.join(''), 16);
        if (this.playerAnswerArr[clickedOption.col] === this.hexAnswer[clickedOption.col]) {
            if (this.checkAnswer()) {
                this.sounds.playCorrectSound();
                this.score+=this.currentDecimal;
                this.settings.maxHexVal = Math.ceil(1.5*this.settings.maxHexVal);
                setTimeout(() => this.newRound(), 2000); // Wait for 2000 milliseconds before starting a new round
                this.colorIdx = (this.colorIdx) % this.gradientColors.length;
            }
            else {
                this.sounds.playClickSound();
            }
        }
        else {
            this.lives--;
            this.sounds.playIncorrectSound();
            if (this.lives < 0) {
            this.gameEnd = true;
            }
        }
    }
  }

  checkAnswer() {
    if (this.playerAnswer === this.currentDecimal) {
        return true;
    } else if (this.lives < 0) {
        this.gameEnd = true;
    }
    return false;
}

}

