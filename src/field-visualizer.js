const colors = require("colors/safe");

const addFieldVisualizer = (rows, cols, field) => {
  const base = colors.bgGreen("  ");
  const snakeBody = colors.bgBlack("  ");
  const snakeHead = colors.bgBlue("  ");
  const fruit = colors.bgGreen("🍎");

  paintField = ({ row, col }) => {
    process.stdout.cursorTo((col + 1) * 2, row + 1);
    process.stdout.write(base);
  };

  paintFruit = ({ row, col }) => {
    process.stdout.cursorTo((col + 1) * 2, row + 1);
    process.stdout.write(fruit);
  };

  paintSnakeBody = ({ row, col }) => {
    process.stdout.cursorTo((col + 1) * 2, row + 1);
    process.stdout.write(snakeBody);
  };

  paintSnakeHead = ({ row, col }) => {
    process.stdout.cursorTo((col + 1) * 2, row + 1);
    process.stdout.write(snakeHead);
  };

  console.clear();
  console.log("\033[?25l");

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentPosition = { row, col };
      if (field.hasFruit(currentPosition)) {
        paintFruit(currentPosition);
        continue;
      }

      if (field.hasSnakeBody(currentPosition)) {
        paintSnakeBody(currentPosition);
        continue;
      }

      if (field.hasSnakeHead(currentPosition)) {
        paintSnakeHead(currentPosition);
        continue;
      }

      paintField(currentPosition);
    }
  }

  field.on("plantFruit", (pos) => paintFruit(pos));
  field.on("placeSnakeBody", (pos) => paintSnakeBody(pos));
  field.on("placeSnakeHead", (pos) => paintSnakeHead(pos));
  field.on("placeSnakeTail", (pos) => paintSnakeTail(pos));
  field.on("erase", (pos) => paintField(pos));
};

exports.addFieldVisualizer = addFieldVisualizer;
