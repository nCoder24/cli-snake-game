const { EventEmitter } = require("events");

const createDirections = () => {
  const up = { offset: { row: -1, col: 0 } };
  const right = { offset: { row: 0, col: 1 } };
  const down = { offset: { row: 1, col: 0 } };
  const left = { offset: { row: 0, col: -1 } };

  return { up, right, down, left };
};

class Position {
  #row;
  #col;

  constructor(row, col) {
    this.#row = row;
    this.#col = col;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  add({ row, col }) {
    return new Position(this.#row + row, this.#col + col);
  }
}

class Snake {
  #isGrowing;
  #positions;
  #heading;
  #eventEmitter;
  #isDied;
  #directions;

  constructor() {
    this.#isGrowing = false;
    this.#positions = [new Position(9, 3), new Position(9, 2), new Position(9, 1)];
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
    this.#positions.unshift(this.#head().add(offset));
    this.#eventEmitter.emit("headDisplacement", prevHeadPos, this.#head());
  }

  #moveTail() {
    const prevTailPos = this.#positions.pop();
    this.#eventEmitter.emit("tailDisplacement", prevTailPos);
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
