
const numCols = 800;
const numRows = 50;
let rain = Array(numCols).fill(new Array(numRows).fill(0));
let time = 0;
let rt = 0

const colors = ['#000', '#115511', '#ccc', '#331133', '#551111', '#111155', '#335533']
let colorIdx = -1
let latch = 0;

let buttonW = 100;
let buttonH = 50;
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


    BGCOLOR = colors[colorIdx];
    fill(BGCOLOR);
    if (time > height)
    {
      rect(0, time-height, width, height);
    }
    else {
      rect(0, 0, width, time);
    }


    drawMouse();


    textAlign(CENTER);
    textSize(36);
    text(`${dec2bin(time)}`, width/2, time)
    text(`${dec2bin(time)}`, width/2, time - height - 10);
    fill(WHITEG);
    textFont(font_oblique);
    text('Binary Learning Game', width / 2, height / 2 - 80);
    textSize(22); textFont(font);
    text('Click to Start', width / 2, height / 2 - 10);



    /* Drawing Buttons */
    textAlign(CENTER);
    fill(WHITEG);

    let button1X = width/2-buttonW/2 - 80;
    let button1Y = height/2+50;
    drawButton(button1X, button1Y, buttonW, buttonH, 'Binary');

    let button2X = width/2-buttonW/2 + 80;
    let button2Y = height/2+50;
    drawButton(button2X, button2Y, buttonW, buttonH, 'Hex');
    fill(WHITE);
    text('Coming Soon!', button2X+60, button2Y+80);
  }

  function drawButton(X, Y, w, h, label) {
    fill(WHITEG);
    rect(X, Y, w, h, 10);
    fill('#121212');
    textSize(22);
    text(label, X+w/2, Y+h/2+8);
  }