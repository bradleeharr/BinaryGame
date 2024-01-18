class Game {
    constructor(sounds, settings) {
        this.sounds = sounds;
        this.settings = settings;
        this.score = 0
        this.lives = 3
        this.options;
        this.playerAnswer;
        this.gameEnd = false;
        this.newRound()
    }

    checkAnswer() {
        if (this.playerAnswer === this.currentDecimal) {
            this.score++;
            background('#d5ffd5'); 
            setTimeout(() => this.newRound(), 2000); // Wait for 2000 milliseconds before starting a new round
            return true
        } 
          else if (this.lives < 0) {
          this.gameEnd = true;
          }
          return false
        }
}