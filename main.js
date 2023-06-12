const EventEmitter = require("events");
const { Game } = require("./src/game");
const { DIRECTIONS } = require("./src/direction");
const { GameController } = require("./src/game-controller");
const { Snake } = require("./src/snake");
const { Coordinates } = require("./src/coordinates");

const prepareGame = () => {
  const parts = [new Coordinates(1, 1), new Coordinates(1, 0)];

  const snake = new Snake(parts, DIRECTIONS.left);
  const fieldBounds = {
    lowerBound: new Coordinates(0, 0),
    upperBound: new Coordinates(10, 10),
  };
  const game = new Game(snake, fieldBounds);

  const inputController = new EventEmitter();
  inputController.start = () => {};
  const view = { render: console.log };
  const gameController = new GameController(game, inputController, view);

  return { gameController, inputController };
};
