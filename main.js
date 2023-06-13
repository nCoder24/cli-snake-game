const { Game } = require("./src/game");
const { DIRECTIONS } = require("./src/direction");
const { GameController } = require("./src/game-controller");
const { Snake } = require("./src/snake");
const { Coordinates } = require("./src/coordinates");
const { KeyboardController, rightHandLettersKeymap } = require("./src/keyboard-controller");

const prepareGame = () => {
  const parts = [new Coordinates(1, 1), new Coordinates(1, 0)];

  const snake = new Snake(parts, DIRECTIONS.left);
  const fieldBounds = {
    lowerBound: new Coordinates(0, 0),
    upperBound: new Coordinates(10, 10),
  };

  const game = new Game(snake, fieldBounds);
  const inputController = new KeyboardController(rightHandLettersKeymap);
  const view = { render: console.log };
  const scheduler = { setInterval, setTimeout, clearInterval };

  const gameController = new GameController(
    game,
    inputController,
    view,
    scheduler
  );

  return gameController;
};

const main = () => {};
const gameController = prepareGame();
gameController.start();
main();
