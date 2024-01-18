class HexOptionsGrid {
    constructor(cols, optionWidth, optionHeight, startX, startY) {
        this.rows = 16; 
        this.cols = cols; 
        this.optionWidth = optionWidth;
        this.optionHeight = optionHeight;
        this.startX = startX;
        this.startY = startY;

        this.grid = this.createGrid();
    }

    createGrid() {
        let grid = [];
        for (let row = 0; row < this.rows; row++) {
            let column = [];
            for (let col = 0; col < this.cols; col++) {
                let x = this.startX + col * this.optionWidth;
                let y = this.startY + row * this.optionHeight + 10*row;
                column.push(new HexOption(x, y, this.optionWidth, this.optionHeight, row));
            }
            grid.push(column);
        }
        return grid;
    }

    draw() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col].draw();
            }
        }
    }

    checkClicked(mouseX, mouseY) {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.grid[row][col].checkClicked(mouseX, mouseY)) {
                    // Unselect other options in the same column
                    for (let unselectRow = 0; unselectRow < this.rows; unselectRow++) {
                        this.grid[unselectRow][col].isSelected = false;
                    }
                    this.grid[row][col].isSelected = true;
                    return { col: col, value: row.toString(16).toUpperCase() };
                }
            }
        }
        return null;
    }

    getSelectedValues() {
        return this.grid[0].map((_, colIndex) => {
            let selectedRow = this.grid.findIndex(row => row[colIndex].isSelected);
            return selectedRow >= 0 ? selectedRow : 0;
        });
    }
}
