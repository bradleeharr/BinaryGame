class HexGame extends Game {
  constructor(sounds, settings) {
      super(sounds, settings);
      this.maxHexLength = 2; // Adjust as needed for the maximum number of hex digits
      this.optionWidth = 50;
      this.optionHeight = 50;
      this.xStart = 50; // X-coordinate where options start
      this.spacing = 90; // Spacing between options
      this.hexAnswer;
      this.currentDecimal;

      this.gameEnd = false;

      this.hexOptionsGrid;

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
      this.hexOptionsGrid = new HexOptionsGrid(this.maxHexLength, this.optionWidth, this.optionHeight, 0, 0);
  }

  drawGame() {
      this.drawInfo();
      text(`0x${this.playerAnswer}`, width/2, height/2 + 125);
      text(`0x${this.hexAnswer}`, width/2, height/2 + 200);
      text(`0x${this.playerAnswerArr}`, width/2, height/2 + 300);

      this.xStart = width / 2 - (this.spacing * (this.maxHexLength))/2;
      textAlign(CENTER);
 
      this.hexOptionsGrid.draw();


    }

  mousePressed(mouseX, mouseY) {
    let clickedOption = this.hexOptionsGrid.checkClicked(mouseX, mouseY);
    if (clickedOption) {
        this.playerAnswerArr[clickedOption.col] = clickedOption.value;
        this.playerAnswer = parseInt(this.playerAnswerArr.join(''));
        if (this.playerAnswerArr[clickedOption.col] === this.hexAnswer[clickedOption.col]) {
            if (this.checkAnswer()) {
                this.sounds.playCorrectSound();
                this.newRound();
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
        this.score++;
        setTimeout(() => this.newRound(), 2000); // Wait for 2000 milliseconds before starting a new round
        this.colorIdx = (this.colorIdx + 1) % this.gradientColors.length;
        return true;
    } else if (this.lives < 0) {
        this.gameEnd = true;
    }
    return false;
}

}

