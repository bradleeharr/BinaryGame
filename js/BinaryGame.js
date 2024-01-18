class BinaryGame extends Game {
    constructor(sounds, settings) {
        super(sounds, settings);
        this.maxBinaryLength = 2
        this.optionWidth = 60;
        this.optionHeight = 60;
        this.xStart = 50; // X-coordinate where options start
        this.spacing = 80; // Spacing between options
        this.binaryAnswer;
        this.currentDecimal;

        this.gameEnd = false;
        this.newRound()
    }
    
    newRound() {
        this.maxBinaryLength = 2;
        this.currentDecimal = Math.floor(Math.random() * this.settings.maxBinaryVal ) + 1; // Adjust range as needed
        
        let maxVal = 4;
          while (maxVal <= this.currentDecimal) {
              this.maxBinaryLength *= 2;
              maxVal = maxVal**2;
          }
      
        this.options = Array(this.maxBinaryLength).fill(0);
      
        let bits = this.currentDecimal.toString(2).split('').map(Number);
        let padding = Array(this.maxBinaryLength - bits.length).fill(0);
      
        this.binaryAnswer = padding.concat(bits);
        this.playerAnswer = 0;
      }
    
    drawGame() {
        this.drawInfo();
        this.xStart = width / 2 - (this.spacing * (this.maxBinaryLength))/2;
        textAlign(CENTER);
        // Style binary choice buttons
        for (let i = 0; i < this.maxBinaryLength; i++) {
            let isSelected = this.options[i];
            let isCorrect = (this.binaryAnswer[i] == this.options[i]);
            let x = this.xStart + i * this.spacing; // Increase spacing
      
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
            stroke('#111');
            rect(x, height/2+50, this.optionWidth, this.optionHeight, 15); 
         
            /* Draw bits */
            if (isSelected) {
                fill('#FFFFFF'); textSize(64);
                text('1', x + this.optionWidth/2, height/2+10);
            } else {
                fill('#ddd'); textSize(64);
                text('0', x + this.optionWidth/2, height/2+10);
            }
            /* Draw numbers Below */
            if (this.settings.showValues) {
              textSize(22); text(2**(this.maxBinaryLength-i-1), x + this.optionWidth/2 , height/2 + this.optionHeight + 25);
            }
        } 
    }

    mousePressed(mouseX, mouseY) {
        for (let i = 0; i < this.maxBinaryLength; i++) {
            let x = this.xStart + i * this.spacing;
            let y = height/2+50;
    
            // Check if the mouse click is within the boundaries of the rectangle
            if (mouseX > x && mouseX < x + this.optionWidth && mouseY > y && mouseY < y + this.optionHeight) {
                this.options[i] = this.options[i] ? 0 : 1; // Toggle the option

                let optionsJoin = this.options.join('');
                this.playerAnswer = parseInt(optionsJoin, 2);
                if (this.checkAnswer()) 
                {
                  this.sounds.playCorrectSound();
                }
                else if (this.options[i] === this.binaryAnswer[i]) {
                  this.sounds.playClickSound();
                }
                else {
                  this.lives--;
                  this.sounds.playIncorrectSound();
                }  
            }
          }
    }

    checkAnswer() {
      if (this.playerAnswer === this.currentDecimal) {
          this.score++;
          background('#d5ffd5'); 
          setTimeout(() => this.newRound(), 2000); // Wait for 2000 milliseconds before starting a new round
          this.colorIdx = (this.colorIdx + 1) % this.gradientColors.length
          return true
      } 
        else if (this.lives < 0) {
        this.gameEnd = true;
        }
        return false
      }
}