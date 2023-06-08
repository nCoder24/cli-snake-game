class Game {
  #field;
  #snake;
  #directionController;

  constructor(snake, field, directionController) {
    this.#snake = snake;
    this.#field = field;
    this.#directionController = directionController;
  }

  start() {
    let delay = 500;
    let points = 0;
    const endGame = (message) => {
      console.log(message);
      console.log(points);
      process.exit();
    };

    this.#directionController.on("directionShift", (direction) =>
      this.#snake.move(direction)
    );

    this.#field.on("collision", (substance) => {
      switch (substance) {
        case "fruit":
          this.#field.plantFruit();
          this.#snake.grow();
          delay -= 100;
          points += 1;
          break;
        case "wall":
          endGame("Hit the wall!");
          break;
        case "body":
          endGame("Eaten Itself!");
          break;
      }
    });

    const tick = () => {
      this.#snake.move();
      setTimeout(tick, delay);
    };

    this.#field.plantFruit();
    this.#field.viaualize();
    setTimeout(tick, delay);
    this.#directionController.start();
  }
}

exports.Game = Game;
