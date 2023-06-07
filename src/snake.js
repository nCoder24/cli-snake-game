const { EventEmitter } = require("events");

const createDirections = () => {
  const north = { offset: { row: -1, col: 0 } };
  const east = { offset: { row: 0, col: 1 } };
  const south = { offset: { row: 1, col: 0 } };
  const west = { offset: { row: 0, col: -1 } };

  north.left = west;
  north.right = east;

  return { north, east, south, west };
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

  constructor() {
    this.#isGrowing = false;
    this.#positions = [new Position(3, 3), new Position(3, 2)];
    this.#heading = createDirections().north;
    this.#eventEmitter = new EventEmitter;
  }

  on(event, callback) {
    this.#eventEmitter.addListener(event, callback);
  }

  get head() {
    return this.#positions[0];
  }

  get isDied() {
    return this.#isDied;
  }

  markDead() {
    this.#isDied = true;
  }

  get positions() {
    return this.#positions;
  }

  #head() {
    return this.#positions[0];
  }

  turnLeft() {
    this.#heading = this.#heading.left;
  }

  turnRight() {
    this.#heading = this.#heading.right;
  }

  #moveHead() {
    const prevHeadPos = this.#head();
    this.#positions.unshift(this.#head().add(this.#heading.offset));
    this.#eventEmitter.emit("headDisplacement", prevHeadPos, this.#head());
  }

  #moveTail() {
    const prevTailPos = this.#positions.pop();
    this.#eventEmitter.emit("tailDisplacement", prevTailPos);
  }

  move() {
    this.#moveHead();

    if (this.#isGrowing) {
      this.#isGrowing = false;
      return;
    }

    this.#moveTail();
  }
}

exports.Snake = Snake;
