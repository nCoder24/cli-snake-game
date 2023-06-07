const { EventEmitter } = require("events");
const { addFieldVisualizer } = require("./field-visualizer");

class Field {
  #substances;
  #symbols;
  #eventEmitter;

  constructor(rows, cols, snake) {
    this.#substances = this.#makeField(rows, cols);
    this.#symbols = {
      field: 0,
      snakeBody: 1,
      snakeHead: 2,
      fruit: 3,
    };
    this.#eventEmitter = new EventEmitter();
    this.#addSnake(snake);
  }

  on(event, callback) {
    this.#eventEmitter.addListener(event, callback);
  }

  #addSnake(snake) {
    const [headPosition, ...bodyPositions] = snake.positions;
    this.#placeSnakeHead(headPosition);
    bodyPositions.forEach((position) => {
      this.#placeSnakeBody(position);
    });

    snake.on("headDisplacement", (prevHeadPos, newHeadPos) => {
      if (this.isWall(newHeadPos)) {
        this.#eventEmitter.emit("collision", "wall");
      }

      if(this.hasFruit(newHeadPos)) {
        this.#eventEmitter.emit("collision", "fruit");
      }

      this.#placeSnakeBody(prevHeadPos);
      this.#placeSnakeHead(newHeadPos);
    });

    snake.on("tailDisplacement", (prevTailPos) => {
      this.#erase(prevTailPos);
    });
  }

  viaualize() {
    addFieldVisualizer(
      this.#substances.length,
      this.#substances[0].length,
      this
    );
  }

  #makeField(rows, cols) {
    return Array.from({ length: rows }, () => new Array(cols).fill(0));
  }

  #placeSnakeBody({ row, col }) {
    this.#substances[row][col] = this.#symbols.snakeBody;
    this.#eventEmitter.emit("placeSnakeBody", { row, col });
  }

  #placeSnakeHead({ row, col }) {
    this.#substances[row][col] = this.#symbols.snakeHead;
    this.#eventEmitter.emit("placeSnakeHead", { row, col });
  }

  #erase({ row, col }) {
    this.#substances[row][col] = this.#symbols.field;
    this.#eventEmitter.emit("erase", { row, col });
  }

  plantFruit({ row, col }) {
    this.#substances[row][col] = this.#symbols.fruit;
    this.#eventEmitter.emit("plantFruit", { row, col });
  }

  hasFruit({ row, col }) {
    return this.#substances[row][col] === this.#symbols.fruit;
  }

  hasSnakeHead({ row, col }) {
    return this.#substances[row][col] === this.#symbols.snakeHead;
  }

  hasSnakeBody({ row, col }) {
    return this.#substances[row][col] === this.#symbols.snakeBody;
  }

  isWall({ row, col }) {
    return (
      row >= this.#substances.length ||
      col >= this.#substances[0].length ||
      row < 0 ||
      col < 0
    );
  }

  toString() {
    return this.#substances;
  }
}

exports.Field = Field;
