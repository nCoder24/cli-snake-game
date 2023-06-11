const { Game } = require("./src/game");
const { DIRECTIONS } = require("./src/direction");
const { GameController } = require("./src/game-controller");
const { Snake } = require("./src/snake");
const EventEmitter = require("events");

const prepareGame = () => {
  const parts = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];

  const snake = new Snake(parts, DIRECTIONS.left);
  const game = new Game(snake);

  const inputController = new EventEmitter();
  inputController.start = () => {};
  const view = { render: console.log };
  const gameController = new GameController(game, inputController, view);

  return { gameController, inputController };
};
