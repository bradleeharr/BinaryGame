class Button {
    constructor(x, y, w, h, label, color=WHITEG) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
      this.color = color;
    }

    draw() {
      fill(this.color);
      console.log(this.color);
      rect(this.x, this.y, this.w, this.h, 10);
      fill('#121212');
      textSize(22);
      text(this.label, this.x + this.w / 2, this.y + this.h / 2 + 8);
    }
  
    isClicked(mouseX, mouseY) {
      return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
    }
  }