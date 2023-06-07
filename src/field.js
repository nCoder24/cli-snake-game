class Field {
  #substances;

  constructor(rows, cols, snake) {
    this.#substances = this.#makeField(rows, cols);
  }

  #makeField(rows, cols) {
    return Array.from({ length: rows }, () => new Array(cols).fill(0));
  }

  hasFruit(position) {

  }

  hasSnakeHead(position) {

  }

  hasSnakeBody(position) {

  }
}

exports.Field = Field;