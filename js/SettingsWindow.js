class SettingsWindow {
    constructor(x, y, w, h, settings, sounds) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      
      this.settings = settings
      this.sounds = sounds
      
      let W = 300;
      let H = 60;
      let X = width/2-W/2;
      let Y = height/2+50;
      this.showValuesButton = new Button(X, Y-80, W, H, 'Display Digit Values', '#fff');
      this.soundButton = new Button(X, Y, W, H, 'Toggle Sound', '#fff');
      this.binaryDigitsButton = new Button(X, Y+80, W, H, `Max Binary Value: ${this.settings.maxBinaryVal}`, '#fff')
      this.hexDigitsButton = new Button(X, Y+160, W, H, `Max Hex Value: ${this.settings.maxHexVal}`, '#fff')
      this.buttons = [this.showValuesButton, this.soundButton, this.binaryDigitsButton, this.hexDigitsButton]
    }
  
    draw() {
      fill(BLACK);
      rect(this.x, this.y, this.w, this.h, 10);
      fill(WHITEG);
      textSize(22);
      text('Settings', this.x + this.w / 2, this.y + this.h / 2 - 72);
      
      this.settings.showValues ? this.showValuesButton.color = '#fff' : this.showValuesButton.color = '#777';
      this.sounds.soundOn ? this.soundButton.color = '#fff' : this.soundButton.color = '#777';

      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
      }
    }
  
    isClicked(mouseX, mouseY) {
      if (this.showValuesButton.isClicked(mouseX, mouseY))
      {
        this.settings.showValues ^= 1;
        this.sounds.playClickSound();
      }
      else if (this.soundButton.isClicked(mouseX, mouseY))
      {
        this.sounds.toggleSound();
        this.sounds.playClickSound();
      }
      else if (this.binaryDigitsButton.isClicked(mouseX, mouseY)) 
      {
        this.settings.editMaxBinaryVal();
        this.binaryDigitsButton.label = `Max Binary Val: ${this.settings.maxBinaryVal}`;
      }
      else if (this.hexDigitsButton.isClicked(mouseX, mouseY)) 
      {
        this.settings.editMaxHexVal();
        this.hexDigitsButton.label = `Max Hex Val: ${this.settings.maxHexVal}`;
      }
      else 
      {
        return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
      }
    }
  }