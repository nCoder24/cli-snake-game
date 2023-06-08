const EventEmitter = require("events");

class DirectionController {
  #stdin;
  #eventEmitter;

  constructor(stdin) {
    this.#stdin = stdin;
    this.#eventEmitter = new EventEmitter();
  }

  on(event, callback) {
    this.#eventEmitter.addListener(event, callback);
  }

  pause() {
    this.#stdin.pause();
  }

  start() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding("utf-8");
    this.#stdin.on("data", (key) => {
    let direction;
      switch (key) {
        case "j":
          direction = "left";
          break;
        case "k":
          direction = "down";
          break;
        case "l":
          direction = "right";
          break;
        case "i":
          direction = "up";
          break;
      }

      if(direction) {
        this.#eventEmitter.emit("directionShift", direction);
      }
    });
  }
}

exports.DirectionController = DirectionController;
