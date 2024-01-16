class Fonts {
    constructor() {
        this.font = loadFont('fonts/FallingSky-JKwK.otf')
        this.font_bold = loadFont('fonts/FallingSkyBold-zemL.otf')
        this.font_oblique = loadFont('fonts/FallingSkyBlackOblique-j37y.otf')
        this.largeFontSize;
        this.smallFontSize;
    }

    playCorrectSound() {
      this.correctSound.play();
    }
  
    playIncorrectSound() {
      this.incorrectSound.play();
    }
  
    playClickSound() {
      this.clickSound.play();
    }

    setVolume(volume) {
        this.correctSound.setVolume(volume*0.5);
        this.incorrectSound.setVolume(volume*0.25);
        this.clickSound.setVolume(volume*0.1);
      }
  }