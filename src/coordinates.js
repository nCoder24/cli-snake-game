const isWithinRange = (number, upperBound, lowerBound) => {
  return number > upperBound && number < lowerBound;
};

class Coordinates {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  isInside({ lowerBound, upperBound }) {
    return (
      isWithinRange(this.#x, lowerBound.#x, upperBound.#x) &&
      isWithinRange(this.#y, lowerBound.#y, upperBound.#y)
    );
  }

  add(coordinates) {
    return new Coordinates(this.#x + coordinates.#x, this.#y + coordinates.#y);
  }

  isSame(coordinates) {
    return this.#x === coordinates.#x && this.#y === coordinates.#y;
  }
}

module.exports = { Coordinates };
