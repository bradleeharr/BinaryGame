class SettingsWindow {
    constructor(x, y, w, h, settings, sounds) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      
      this.settings = settings
      this.sounds = sounds
      
      let W = 200;
      let H = 50;
      let X = width/2-W/2;
      let Y = height/2+50;
      this.showValuesButton = new Button(X, Y, W, H, 'Display Digit Values', '#fff');
      this.soundButton = new Button(X, Y+100, W, H, 'Toggle Sound', '#fff');
    }
  
    draw() {
      fill(WHITEG);
      rect(this.x, this.y, this.w, this.h, 10);
      fill('#121212');
      textSize(22);
      text('Settings', this.x + this.w / 2, this.y + this.h / 2 + 8);
      
      this.settings.showValues ? this.showValuesButton.color = '#fff' : this.showValuesButton.color = '#777';
      this.sounds.soundOn ? this.soundButton.color = '#fff' : this.soundButton.color = '#777';

      this.showValuesButton.draw();  
      this.soundButton.draw();
    }
  
    isClicked(mouseX, mouseY) {
      if (this.showValuesButton.isClicked(mouseX, mouseY))
      {
        this.settings.showValues ^= 1;
      }
      else if (this.soundButton.isClicked(mouseX, mouseY))
      {
        this.sounds.toggleSound();
        console.log(sounds.soundOn);
      }
      else 
      {
        return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
      }
    }
  }