const {Game} = require('./game');

const game = new Game({
    width: 10,
    height: 10, 
    cellWidth: 50,
    cellHeight: 50,
    root: document.querySelector('#gameArea')
});