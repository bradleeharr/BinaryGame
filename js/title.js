
const numCols = 800;
const numRows = 50;
let rain = Array(numCols).fill(new Array(numRows).fill(0));
let time = 0;
let rt = 0

const colors = ['#000', '#115511', '#121212', '#331133', '#551111', '#111155', '#335533']
let colorIdx = -1
let latch = 0;
function drawTitleScreen() {
    background(BLACK);
     

    rt++;
    time = 1*height*Math.abs(Math.sin(rt*0.01))-100;
    
    if (time < 0 && !latch) { 
      colorIdx = (colorIdx + 1) % colors.length
      latch = 1;
      console.log(colorIdx);
    }
    if (time > 0 && latch) {
      latch = 0;
    }

    for (let i = 0; i < numCols; i++) {
      fill(WHITEG);
      rect(i*10, time, 10, 10);
    }
    for (let i = 0; i < numCols; i++) {
      fill(WHITEG);
      rect(i*10, time - height, 10, 10);
    }



    fill(colors[colorIdx]);
    if (time > height)
    {
      rect(0, time-height, width, height);
    }
    else {
      rect(0, 0, width, time)
    }


    drawMouse();


    textAlign(CENTER);
    textSize(48);
    text(`${dec2bin(time)}`, width/2, time)
    text(`${dec2bin(time)}`, width/2, time - height - 10);
    fill(WHITEG);
    textFont(font_oblique);
    text('Binary Learning Game', width / 2, height / 2 - 80);
    textSize(22); textFont(font);
    text('Click to Start', width / 2, height / 2 );
    
  }