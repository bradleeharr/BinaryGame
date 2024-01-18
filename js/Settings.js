class Settings {
    constructor() {
      this.showValues = true;
      this.sound = true;
      this.maxBinaryVal = 256;
      this.maxHexVal = 1024;
    }

    editMaxBinaryVal() {
      if (this.maxBinaryVal >= 1024) {
        this.maxBinaryVal = 4;
      }
      else {
        this.maxBinaryVal *= 2;
      }
    }
  }