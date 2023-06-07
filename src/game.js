const { Field } = require("./field");
const { addFieldVisualizer } = require("./field-visualizer");
const { Snake } = require("./snake");

class Game {
  #field;
  #snake;

  constructor(rows, cols) {
    this.#field = new Field(rows, cols);
    this.#snake = new Snake();
    this.#setField();
  }

  #setField() {
    const [headPosition, ...bodyPositions] = this.#snake.positions;
    this.#field.placeSnakeHead(headPosition);
    bodyPositions.forEach((position) => {
      this.#field.placeSnakeBody(position);
    });

    this.#field.plantFruit({ row: 5, col: 5 });

    this.#snake.on("headDisplacement", (prevHeadPos, newHeadPos) => {
      if(this.#field.isWall(newHeadPos)) {
        this.#snake.markDead();
        return;
      }
      this.#field.placeSnakeBody(prevHeadPos);
      this.#field.placeSnakeHead(newHeadPos);
    });

    this.#snake.on("tailDisplacement", (prevPos) => {
      if(this.#snake.isDied) return;
      this.#field.erase(prevPos);
    });
  }

  start() {
    addFieldVisualizer(this.#field);
    const endGame = (message) => {
      console.log(message);
      process.exit();
    };

    let delay = 500;

    const tick = () => {
      this.#snake.move();

      if (this.#field.isWall(this.#snake.head)) {
        endGame("Hit The Wall");
      }

      if (this.#field.hasSnakeBody(this.#snake.head)) {
        endGame("Eaten Itself");
      }

      if (this.#field.hasFruit(this.#snake.head)) {
        this.#snake.grow();
        delay -= 10;
      }

      setTimeout(tick, delay);
    };

    setTimeout(tick, delay);
  }
}

exports.Game = Game;
