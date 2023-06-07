const { Field } = require("./field");
const { addFieldVisualizer } = require("./field-visualizer");
const { Snake } = require("./snake");

class Game {
  #field;
  #snake;

  constructor(rows, cols) {
    this.#snake = new Snake();
    this.#field = new Field(rows, cols, this.#snake);
  }

  #startReadingInput() {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (key) => {
      switch (key) {
        case "j":
          this.#snake.move("left");
          break;
        case "k":
          this.#snake.move("down");
          break;
        case "l":
          this.#snake.move("right");
          break;
        case "i":
          this.#snake.move("up");
          break;
      }
    });
  }

  start() {
    let delay = 500;
    const endGame = (message) => {
      console.log(message);
      process.exit();
    };

    this.#field.on("collision", (substance) => {
      switch (substance) {
        case "fruit":
          this.#snake.grow();
          delay -= 10;
          break;
        case "wall":
          endGame("Hit the wall!");
          break;
        case "body":
          endGame("Eaten Itself!");
          break;
      }
    });

    const tick = () => {
      this.#snake.move();
      setTimeout(tick, delay);
    };

    this.#field.viaualize();
    setTimeout(tick, delay);
    this.#startReadingInput();
  }
}

exports.Game = Game;
