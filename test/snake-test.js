const assert = require("assert");
const { describe, it } = require("node:test");
const { Snake } = require("../src/snake");
const { Coordinates } = require("../src/coordinates");
const { DIRECTIONS } = require("../src/direction");

describe("move", () => {
  it("should shift head towords given direction", () => {
    const parts = [new Coordinates(1, 1), new Coordinates(1, 0)];
    const snake = new Snake(parts, DIRECTIONS.left);
    const expectedCoordinates = new Coordinates(1, 2);
    snake.move(DIRECTIONS.up);
  
    assert.ok(expectedCoordinates.isSame(snake.parts.head));
  });

  it("should shift head towords current direction if direction is not provided", () => {
    const parts = [new Coordinates(1, 1), new Coordinates(1, 2)];
    const snake = new Snake(parts, DIRECTIONS.left);
    const expectedCoordinates = new Coordinates(0, 1);
    snake.move();
  
    assert.ok(expectedCoordinates.isSame(snake.parts.head));
  });

  //TODO:
  // it("should shift tail to previous body positon on move");
  // it("should update it's direction on move");
});