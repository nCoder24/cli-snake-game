const DIRECTIONS = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
};

const directionOffsets = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
};

module.exports = { DIRECTIONS, directionOffsets };
