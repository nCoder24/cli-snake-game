const { Game } = require("./src/game");

const main = () => {
  const game = new Game(10, 10);
  game.start();
};


main();
