const EventEmitter = require("events");
const { DIRECTIONS } = require("./direction");

const EOF = "\x03";
const EVENTS = {
  moveEntered: "move-entered",
  illigalMoveEntered: "illigal-move-entered",
  istreamPause: "istream-pause",
};

rightHandLettersKeymap = {
  i: { event: EVENTS.moveEntered, args: [DIRECTIONS.up] },
  j: { event: EVENTS.moveEntered, args: [DIRECTIONS.left] },
  k: { event: EVENTS.moveEntered, args: [DIRECTIONS.down] },
  l: { event: EVENTS.moveEntered, args: [DIRECTIONS.right] },
};

rightHandArrowsKeymap = {};

class KeyboardController extends EventEmitter {
  #keymap;
  #istream;
  #EOF;

  constructor(keymap, istream = process.stdin, EOF = "\x04") {
    super();
    this.#keymap = keymap;
    this.#istream = istream;
    this.#EOF = EOF;
  }

  start() {
    this.#istream.setEncoding("utf-8");
    this.#istream.setRawMode(true);
    this.#istream.on("data", (data) => {
      if (data === this.#EOF) {
        this.#istream.pause();
        this.emit(EVENTS.istreamPause);
        return;
      }

      if (!this.#keymap[data]) {
        this.emit(EVENTS.illigalMoveEntered, data);
        return;
      }

      const { event, args } = this.#keymap[data];
      this.emit(event, ...args);
    });
  }
}

module.exports = {
  KeyboardController,
  EOF,
  EVENTS,
  rightHandLettersKeymap,
  rightHandArrowsKeymap,
};
