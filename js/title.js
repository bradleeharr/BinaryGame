
const numCols = 800;
const numRows = 50;
let rain = Array(numCols).fill(new Array(numRows).fill(0));
let time = 0;
let rt = 0

const colors = ['#121212', '#330000', '#00ff00', '#11ff11', '#22ff22', '#33ff33', '#44ff44']
let colorIdx = 0

function drawTitleScreen() {
    background(BLACK);
     

    rt++;
    time = 1*height*Math.abs(Math.sin(rt*0.01))-100;

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