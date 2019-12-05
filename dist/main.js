/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cell-boom.js":
/*!**************************!*\
  !*** ./src/cell-boom.js ***!
  \**************************/
/*! exports provided: CellBoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellBoom", function() { return CellBoom; });
const {Cell} = __webpack_require__(/*! ./cell */ "./src/cell.js");

class CellBoom extends Cell{
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.node.classList.add('cell-boom');
    }
    show() {
        this.node.classList.add('cell-boom-clicked');
        this.node.innerHTML = '💣';
    }

}

/***/ }),

/***/ "./src/cell-empty.js":
/*!***************************!*\
  !*** ./src/cell-empty.js ***!
  \***************************/
/*! exports provided: CellEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellEmpty", function() { return CellEmpty; });
const {Cell} = __webpack_require__(/*! ./cell */ "./src/cell.js");

class CellEmpty extends Cell{
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    show(count) {
        this.isOpened = true;
        this.node.classList.add('cell-empty-clicked');
        this.node.innerHTML = count || '';
    }

}

/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
class Cell {
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

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
const {
    CellEmpty
} = __webpack_require__(/*! ./cell-empty */ "./src/cell-empty.js");
const {
    CellBoom
} = __webpack_require__(/*! ./cell-boom */ "./src/cell-boom.js");

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

class Game {
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Game} = __webpack_require__(/*! ./game */ "./src/game.js");

const game = new Game({
    width: 10,
    height: 10, 
    cellWidth: 50,
    cellHeight: 50,
    root: document.querySelector('#gameArea')
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map