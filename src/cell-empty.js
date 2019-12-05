const {Cell} = require('./cell');

export class CellEmpty extends Cell{
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    show(count) {
        this.isOpened = true;
        this.node.classList.add('cell-empty-clicked');
        this.node.innerHTML = count || '';
    }

}