const { EVENTS } = require("./keyboard-controller");

class GameController {
  #game;
  #inputController;
  #view;
  #scheduler;

  constructor(game, inputController, view, scheduler) {
    this.#game = game;
    this.#inputController = inputController;
    this.#view = view;
    this.#scheduler = scheduler;
  }

  start() {
    this.#inputController.on(EVENTS.moveEntered, (direction) =>
      this.#game.changeSnakeHeading(direction)
    );

    this.#inputController.start();
    const interval = this.#scheduler.setInterval(() => {
      this.#game.moveSnake();
      this.#view.render(this.#game.state);
    }, 100);

    this.#inputController.on(EVENTS.istreamPause, () => 
      this.#scheduler.clearInterval(interval)
    );
  }
}

module.exports = { GameController };
