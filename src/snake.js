const { directionOffsets } = require("./direction");

class Snake {
  #parts;
  #heading;

  constructor(parts, heading) {
    this.#parts = parts;
    this.#heading = heading;
  }

  get parts() {
    const [head, ...body] = this.#parts;
    return {head, body}
    //TODO: return a copy instead of ref
  }

  #shiftHead(offset) {
    this.#parts.unshift(this.parts.head.add(offset));
  }

  #shiftTail() {
    this.#parts.pop();
  }

  move(direction = this.#heading) {
    this.#shiftHead(directionOffsets[direction]);
    this.#shiftTail();
    this.#heading = direction;
  }
}

module.exports = { Snake };
