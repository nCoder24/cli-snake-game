const { Coordinates } = require("./coordinates");
const colors = require("colors/safe");

class GameView {
  #fieldBounds;

  constructor(fieldBounds) {
    this.#fieldBounds = fieldBounds;
  }

  render({ snake, isOver }) {
    if (!this.#fieldBounds) return;
    if (isOver) {
      console.log("Game Over");
      return;
    }
    const { lowerBound, upperBound } = this.#fieldBounds;
    let view = "";

    for (let y = 10; y >= 0; y--) {
      for (let x = 0; x <= 10; x++) {
        const currentPosition = new Coordinates(x, y);
        const isSnakeBodyPosition = snake.body.some((position) =>
          position.isSame(currentPosition)
        );
        const isSnakeHeadPosition = snake.head.isSame(currentPosition);

        view += isSnakeBodyPosition
          ? colors.bgBlue("  ")
          : isSnakeHeadPosition
          ? colors.bgRed("  ")
          : colors.bgGreen("  ");
      }

      view += "\n";
    }

    console.clear();
    console.log(view);
  }

  set fieldBounds(bounds) {
    this.#fieldBounds = bounds;
  }
}

module.exports = { GameView };
