class Game {
  #field;
  #snake;

  constructor(rows, cols) {
    this.#field = new Field(rows, cols);
    this.#snake = new Snake();
  }

  start() {
    createFieldVisualizer(rows, cols, this.#field);

    tick = (nextTickDelay) => {
      this.#snake.move();

      if (this.#field.isWall(this.#field.head)) {
        endGame("Hit The Wall");
      }

      if (this.#field.isSnake(this.#field.head)) {
        endGame("Eaten Itself");
      }

      if (this.#field.isFruit(this.#field.head)) {
        this.#snake.grow();
        nextTickDelay -= 10;
      }

      setTimeout(tick, nextTickDelay);
    };
  }
}

exports.Game = Game;