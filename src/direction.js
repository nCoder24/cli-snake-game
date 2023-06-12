const { Coordinates } = require("./coordinates");

const directionOffsets = {
  left: new Coordinates(-1, 0),
  right: new Coordinates(1, 0),
  up: new Coordinates(0, 1),
  down: new Coordinates(0, -1),
};

const DIRECTIONS = Object.fromEntries(
  Object.keys(directionOffsets).map((dir) => [dir, dir])
);

module.exports = { DIRECTIONS, directionOffsets };
