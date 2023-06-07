class Field {
  #substances;
  #symbols

  constructor(rows, cols) {
    this.#substances = this.#makeField(rows, cols);
    this.#symbols = {
      field: 0,
      snakeBody: 1,
      snakeHead: 2,
      fruit: 3
    }
  }

  #makeField(rows, cols) {
    return Array.from({ length: rows }, () => new Array(cols).fill(0));
  }

  plantFruit({row, col}) {
    this.#substances[row][col] = this.#symbols.fruit;
  }

  placeSnakeBody({row, col}) {
    this.#substances[row][col] = this.#symbols.snakeBody;
  }

  placeSnakeHead({row, col}) {
    this.#substances[row][col] = this.#symbols.snakeHead;
  }

  erase({row, col}) {
    this.#substances[row][col] = this.#symbols.field;
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