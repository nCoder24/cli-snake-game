const { DirectionController } = require("./direction-controller");
const { Field } = require("./src/field");
const { Game } = require("./src/game");
const { Snake } = require("./src/snake");

const main = () => {
  const initialSnakePositions = [
    { row: 9, col: 3 },
    { row: 9, col: 2 },
    { row: 9, col: 1 },
  ];

  const snake = new Snake(initialSnakePositions);
  const field = new Field(10, 10, snake);
  const directionController = new DirectionController(process.stdin);

  const game = new Game(snake, field, directionController);
  game.start();
};

main();
