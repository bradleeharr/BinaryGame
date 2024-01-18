class Settings {
    constructor() {
      this.showValues = true;
      this.sound = true;
      this.maxBinaryVal = 16;
      this.maxHexVal = 16;
    }

    editMaxBinaryVal() {
      if (this.maxBinaryVal >= 1024) {
        this.maxBinaryVal = 4;
      }
      else {
        this.maxBinaryVal *= 2;
      }
    }

    editMaxHexVal() {
      if (this.maxHexVal >= 1024) {
        this.maxHexVal = 4;
      }
      else {
        this.maxHexVal *= 2;
      }
    }
  }