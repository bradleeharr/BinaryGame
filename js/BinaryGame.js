class BinaryGame extends Game {
    constructor(sounds, settings) {
        super(sounds, settings);
        this.score = 0
        this.lives = 3
        this.maxBinaryLength = 2
        this.optionWidth = 70;
        this.optionHeight = 70;
        this.xStart = 50; // X-coordinate where options start
        this.spacing = 90; // Spacing between options
        this.binaryAnswer;
        this.currentDecimal;

        this.gameEnd = false;
        this.newRound()
    }
    
    newRound() {
        this.maxBinaryLength = 2;
        this.currentDecimal = Math.floor(Math.random() * 256 ) + 1; // Adjust range as needed
        
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

    drawInfo() {
        textAlign(CENTER);
        background(BLACK);
        fill(WHITEG); 
        textSize(32);
        text(`Make the Decimal Number: ${this.currentDecimal}`, width/2, height/2 - 250);
        text(`Lives: ${this.lives}/3`, width/2 + 200, height/2 - 350);
        text(`Score: ${this.score}`, width/2 - 200, height/2 - 350);
        textSize(80);
        fill(WHITE);
        text(`${this.playerAnswer}`, width/2, height/2 - 125);
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
            stroke('#333');
            rect(x, height/2+50, this.optionWidth, this.optionHeight, 15); 
         
            /* Draw bits */
            if (isSelected) {
                fill('#FFFFFF'); textSize(64);
                text('1', x + this.optionWidth/2, height/2+10);
            } else {
                fill('#888'); textSize(64);
                text('0', x + this.optionWidth/2, height/2+10);
            }
            /* Draw numbers Below */
            if (this.settings.showValues) {
              textSize(22); text(2**(this.maxBinaryLength-i-1), x + this.optionWidth/2 , height/2 + this.optionHeight + 100);
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
                if (this.options[i] === this.binaryAnswer[i]) {
                  this.sounds.playClickSound();
                }
                else {
                  this.lives--;
                  this.sounds.playIncorrectSound();
                }  
            }
          }
    }
}