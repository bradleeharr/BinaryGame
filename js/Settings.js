class Settings {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  
    draw() {
      fill(WHITEG);
      rect(this.x, this.y, this.w, this.h, 10);
      fill('#121212');
      textSize(22);
      text('Settings', this.x + this.w / 2, this.y + this.h / 2 + 8);
    }
  
    isClicked(mouseX, mouseY) {
      return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
    }
  }