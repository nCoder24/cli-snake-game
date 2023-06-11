class Game {
  #snake;

  constructor(snake) {
    this.#snake = snake;
  }

  moveSnake(direction) {
    this.#snake.move(direction);
  }

  get state() {
    return this.#snake.parts;
  }
}

module.exports = { Game };
