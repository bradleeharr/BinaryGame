class HexOption {
    constructor(x, y, width, height, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.isSelected = false;
    }

    draw() {
        stroke('#111');
        fill(this.isSelected ? '#ddd' : '#fff');
        rect(this.x, this.y, this.width, this.height, 10);

        fill('#000');
        textSize(20);
        textAlign(CENTER);
        text(this.value.toString(16).toUpperCase(), this.x + this.width / 2, this.y + this.height / 2);
    }

    checkClicked(mouseX, mouseY) {
        // Check if this hex option is clicked
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.isSelected = !this.isSelected;
            return true;
        }
        return false;
    }
}
