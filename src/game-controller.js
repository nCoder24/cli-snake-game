const { EVENTS } = require("./input-controller");

class GameController {
  #game;
  #inputController;
  #view;

  constructor(game, inputController, view) {
    this.#game = game;
    this.#inputController = inputController;
    this.#view = view;
  }

  start() {
    this.#inputController.on(EVENTS.moveEntered, (direction) => {
      this.#game.moveSnake(direction);
      this.#view.render(this.#game.state);
    });

    this.#inputController.start();
  }
}

module.exports = { GameController };
