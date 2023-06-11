const { directionOffsets } = require("./direction");
const addCoordinates = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  return {
    x: x1 + x2,
    y: y1 + y2,
  };
};

class Snake {
  #parts;
  #heading;

  constructor(parts, heading) {
    this.#parts = parts;
    this.#heading = heading;
  }

  get head() {
    return this.#parts[0];
  }

  #shiftHead(offset) {
    const newHead = addCoordinates(this.head, offset);
    this.#parts.unshift(newHead);
  }

  #shiftTail() {
    this.#parts.pop();
  }

  move(direction = this.#heading) {
    this.#shiftHead(directionOffsets[direction]);
    this.#shiftTail();
    this.#heading = direction;
  }

  get parts() {
    return this.#parts;
    //TODO: return a copy instead of ref
  }
}

module.exports = { Snake };
