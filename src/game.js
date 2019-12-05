const {
    CellEmpty
} = require('./cell-empty');
const {
    CellBoom
} = require('./cell-boom');

const matrixQ = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
];

export class Game {
    constructor(options) {
        const {
            width,
            height,
            root,
            cellWidth,
            cellHeight
        } = options;

        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.cells = [];

        this.root = root;
        const sandbox = {
            getCountAroundBomb: this.getCountAroundBomb,
            clickAround: this.clickAround
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cell = null;

                if (Math.random() > 0.1) {
                    cell = new CellEmpty(x, y, cellWidth, cellHeight);
                } else {
                    cell = new CellBoom(x, y, cellWidth, cellHeight, sandbox);
                }
                this.cells.push(cell);
                cell.render(root);
            }
        }

        this.bindEvent();
        this.contextEvent();

    }

    getCellByPoint(x, y) {
        if ((x <= this.width - 1) && (x >= 0) && (y <= this.height - 1) && (y >= 0)) {
            const position = y * this.width + x;
            return this.cells[position];
        } else return
    }

    clickAround(x, y) {
        matrixQ.forEach((point) => {
            if ((x <= this.width - 1) && (x >= 0) && (y <= this.height - 1) && (y >= 0)) {
                const cell = this.getCellByPoint(x + point[0], y + point[1]);
                if ((cell) && (!cell.node.classList.contains('cell-empty-clicked'))) {
                    const count = this.getCountAroundBomb(x + point[0], y + point[1]);
                    if ((cell.isOpened == false) && (count === 0)) {
                        cell.show();
                        this.clickAround(x + point[0], y + point[1])
                    } else cell.show(count);
                } else return
            }
            return
        })
    }

    getCountAroundBomb(x, y) {
        return matrixQ.reduce((acc, point) => {
            const cell = this.getCellByPoint(x + point[0], y + point[1]);
            return acc + Number(cell instanceof CellBoom);
        }, 0);
    }

    bindEvent() {
        this.root.addEventListener('click', event => {
            const cell = event.target['data-type'];
            //debugger
            if (!cell.node.classList.contains('cell-flag-clicked')) {
                if (cell instanceof CellBoom) {
                    cell.show();
                    const bombs = document.querySelectorAll('div.cell.cell-boom');

                    bombs.forEach(function (cell, currentIndex) {
                        setTimeout(function () {
                            cell['data-type'].show();
                        }, 1200 * currentIndex);
                    });
                    alert('Game Over');

                } else if (cell instanceof CellEmpty) {
                    const count = this.getCountAroundBomb(cell.x, cell.y)
                    cell.show(count);
                    this.countOpenCells();
                    if (count === 0) {
                        this.clickAround(cell.x, cell.y)
                    }
                }
            }
        });
    }

    contextEvent() {
        this.root.addEventListener('contextmenu', event => {
            const cell = event.target['data-type'];
            if (cell.isOpened == false) {
                cell.setFlag();
                event.preventDefault();
            }
        });
    }

    countOpenCells() {
        let counter = 0;
        let cells = document.querySelectorAll('div.cell');
        let bombsNumber = document.querySelectorAll('div.cell.cell-boom').length;

        cells.forEach((el) => {
            if (el['data-type'].isOpened)
                counter += 1;
        })
        if (counter === (this.width * this.height - bombsNumber))
            alert('Congratulation!');

    }
}