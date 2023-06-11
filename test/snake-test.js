const { describe, it } = require("node:test");
const { Snake } = require("../src/snake");
const assert = require("assert");
const directions = {left: "left", up: "up"};

describe("move", () => {
  it("should shift head towords given direction", () => {
    const parts = [{x: 1, y: 1}, {x: 1, y: 2}];
    const snake = new Snake(parts, directions.left);
    snake.move(directions.up);
  
    assert.deepStrictEqual(snake.head, {x: 1, y: 2});
  });

  it("should shift head towords current direction if direction is not provided", () => {
    const parts = [{x: 1, y: 1}, {x: 1, y: 2}];
    const snake = new Snake(parts, directions.left);
    snake.move();
  
    assert.deepStrictEqual(snake.head, {x: 0, y: 1});
  });

  //TODO:
  // it("should shift tail to previous body positon on move");
  // it("should update it's direction on move");
});