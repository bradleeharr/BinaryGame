const BLACK = '#121212'
const WHITEG = '#11FF11'
const DARKG = '#22DD22'
const WHITE = '#FFFFFF'



function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

function drawMouse() {
  noStroke();
  fill(WHITEG);
  ellipse(mouseX, mouseY,5, 5);
}