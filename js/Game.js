class Game {
    constructor(sounds, settings) {
        this.sounds = sounds;
        this.settings = settings;
        this.score = 0
        this.lives = 3
        this.options;
        this.playerAnswer;
        this.gameEnd = false;
        this.background = BLACK;
        this.gradientColors = new Colors().gradientColors;
        this.newRound()
        
        this.colorIdx = 0
    }

    drawGradient(c1, c2) {
        for (let y = 0; y < height; y++) {
            let inter = map(y, 0, height, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }
        noStroke();

    }

    drawInfo() {
        textAlign(CENTER);
        background(BLACK);
        this.drawGradient(this.gradientColors[this.colorIdx].start, this.gradientColors[this.colorIdx].end);

        fill(WHITEG); 
        textSize(32);
        text(`Make the Decimal Number: ${this.currentDecimal}`, width/2, height/2 - 250);
        text(`Lives: ${this.lives}/3`, width/2 + 200, height/2 - 350);
        text(`Score: ${this.score}`, width/2 - 200, height/2 - 350);
        textSize(80);
        fill(WHITE);
        text(`${this.playerAnswer}`, width/2, height/2 - 125);
    }


}