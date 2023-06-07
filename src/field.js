const { EventEmitter } = require("events");

class Field {
  #substances;
  #symbols;
  #eventEmitter;

  constructor(rows, cols) {
    this.#substances = this.#makeField(rows, cols);
    this.#symbols = {
      field: 0,
      snakeBody: 1,
      snakeHead: 2,
      fruit: 3
    }

    this.#eventEmitter = new EventEmitter();
  }

  on(event, callback) {
    this.#eventEmitter.addListener(event, callback);
  }

  get dimentions() {
    return {rows: this.#substances.length, cols: this.#substances[0].length};
  }

  #makeField(rows, cols) {
    return Array.from({ length: rows }, () => new Array(cols).fill(0));
  }

  plantFruit({row, col}) {
    this.#substances[row][col] = this.#symbols.fruit;
    this.#eventEmitter.emit("plantFruit", {row, col});
  }

  placeSnakeBody({row, col}) {
    this.#substances[row][col] = this.#symbols.snakeBody;
    this.#eventEmitter.emit("placeSnakeBody", {row, col});
  }

  placeSnakeHead({row, col}) {
    this.#substances[row][col] = this.#symbols.snakeHead;
    this.#eventEmitter.emit("placeSnakeHead", {row, col});
  }

  erase({row, col}) {
    this.#substances[row][col] = this.#symbols.field;
    this.#eventEmitter.emit("erase", {row, col});
  }

  hasFruit({row, col}) {
    return this.#substances[row][col] === this.#symbols.fruit;
  }

  hasSnakeHead({row, col}) {
    return this.#substances[row][col] === this.#symbols.snakeHead;
  }

  hasSnakeBody({row, col}) {
    return this.#substances[row][col] === this.#symbols.snakeBody;
  }

  isWall({row, col}) {
    return row >= this.#substances.length || col >= this.#substances[0].length || row < 0 || col < 0 ;
  }

  toString() {
    return this.#substances;
  }
}

exports.Field = Field;