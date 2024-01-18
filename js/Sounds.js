class Sounds {
    constructor() {
        this.correctSound = loadSound('sound/success-1-6297.mp3');
        this.incorrectSound = loadSound('sound/negative_beeps-6008.mp3');
        this.clickSound = loadSound('sound/decidemp3-14575.mp3');
        this.soundOn = true;
    }
    
    playCorrectSound() {
      if (this.soundOn) {
        this.correctSound.play();
      }
    }
  
    playIncorrectSound() {
      if (this.soundOn){
        this.incorrectSound.play();
      }
    }
  
    playClickSound() {
      if (this.soundOn) {
        this.clickSound.play();
      }
    }

    setVolume(volume) {
        this.correctSound.setVolume(volume*0.5);
        this.incorrectSound.setVolume(volume*0.25);
        this.clickSound.setVolume(volume*0.2);
      }

    toggleSound() {
      this.soundOn ^= 1;
    }
  }