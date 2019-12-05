export class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.node = document.createElement('DIV');
        this.node.className = 'cell';
        this.isOpened = false;
        this.node['data-type'] = this;

        Object.assign(this.node.style, {
            top: y * height + 'px',
            left: x * width + 'px',
            width: width + 'px',
            height: height + 'px'
        });
    }
    render(root) {
        root.append(this.node);
    }

    setFlag() {
        this.node.classList.toggle('cell-flag-clicked');
    }
}