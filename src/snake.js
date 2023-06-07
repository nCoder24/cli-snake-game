const { EventEmitter } = require("events");

const createDirections = () => {
  const up = { offset: { row: -1, col: 0 } };
  const right = { offset: { row: 0, col: 1 } };
  const down = { offset: { row: 1, col: 0 } };
  const left = { offset: { row: 0, col: -1 } };

  return { up, right, down, left };
};

class Snake {
  #isGrowing;
  #positions;
  #heading;
  #eventEmitter;
  #directions;

  constructor([...initialPositions]) {
    this.#isGrowing = false;
    this.#positions = initialPositions;
    this.#directions = createDirections();
    this.#heading = this.#directions.right;
    this.#eventEmitter = new EventEmitter();
  }

  on(event, callback) {
    this.#eventEmitter.addListener(event, callback);
  }

  get positions() {
    return this.#positions;
  }

  #head() {
    return this.#positions[0];
  }

  #moveHead({offset}) {
    const prevHeadPos = this.#head();
    const newHeadPos = {
      row: this.#head().row + offset.row,
      col: this.#head().col + offset.col,
    };

    this.#positions.unshift(newHeadPos);
    this.#eventEmitter.emit("headDisplacement", prevHeadPos, newHeadPos);
  }

  #moveTail() {
    const prevTailPos = this.#positions.pop();
    this.#eventEmitter.emit("tailDisplacement", prevTailPos);
  }

  grow() {
    this.#isGrowing = true;
  }

  move(direction) {
    this.#heading = this.#directions[direction] || this.#heading;
    this.#moveHead(this.#heading);

    if (this.#isGrowing) {
      this.#isGrowing = false;
      return;
    }

    this.#moveTail();
  }
}

exports.Snake = Snake;
