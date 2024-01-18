const BLACK = '#121212'
const WHITEG = '#77FF77'
const DARKG = '#119911'
const WHITE = '#FFFFFF'

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

function drawMouse() {
  noStroke();
  fill(WHITEG);
  ellipse(mouseX, mouseY,5, 5);
}