class Game {
  #field;
  #snake;

  constructor(snake, field) {
    this.#snake = snake;
    this.#field = field;
  }

  #startReadingInput() {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (key) => {
      switch (key) {
        case "j":
          this.#snake.move("left");
          break;
        case "k":
          this.#snake.move("down");
          break;
        case "l":
          this.#snake.move("right");
          break;
        case "i":
          this.#snake.move("up");
          break;
      }
    });
  }

  start() {
    let delay = 500;
    let points = 0;
    const endGame = (message) => {
      console.log(message);
      console.log(points)
      process.exit();
    };

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
    this.#startReadingInput();
  }
}

exports.Game = Game;
