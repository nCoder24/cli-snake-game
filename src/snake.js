const createDirections = () => {
  const north = { offset: { row: 0, col: 1 } };
  const east = { offset: { row: 0, col: -1 } };
  const south = { offset: { row: -1, col: 0 } };
  const west = { offset: { row: 1, col: 0 } };

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

  add({ row, col }) {
    return new Position(this.#row + row, this.#col + col);
  }
}

class Snake {
  #isGrowing;
  #positions;
  #heading;

  constructor() {
    this.#isGrowing = false;
    this.#positions = [new Position(3, 3), new Position(3, 4)];
    this.#heading = createDirections().north;
  }

  turnLeft() {
    this.#heading = this.#heading.left;
  }

  turnRight() {}

  move() {
    const moveHead = () => {
      this.#positions.unshift(this.#positions[0].add(this.#heading.offset));
    };

    const moveTail = () => {
      this.#positions.pop();
    };

    moveHead();

    if (this.#isGrowing) {
      this.#isGrowing = false;
      return;
    }

    moveTail();
  }
}

exports.Snake = Snake;