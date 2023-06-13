class Game {
  #snake;
  #fieldBounds;

  constructor(snake, fieldBounds) {
    this.#snake = snake;
    this.#fieldBounds = fieldBounds;
  }

  #isSnakeHeadInField() {
    return this.#snake.parts.head.isInside(this.#fieldBounds);
  }

  #hasSnakeBittenItself() {
    return this.#snake.parts.body.some((pos) => pos.isSame(this.#snake.parts.head));
  }

  changeSnakeHeading(direction) {
    this.#snake.changeHeading(direction);
  }

  moveSnake() {
    this.#snake.move();
  }

  get state() {
    const state = {};
    state.isSnakeHeadInField = this.#isSnakeHeadInField();
    state.hasSnakeBittenItself = this.#hasSnakeBittenItself();
    state.isOver = state.hasSnakeBittenItself || !state.isSnakeHeadInField;
    state.snake = this.#snake.parts;

    return state;
  }
}

module.exports = { Game };
