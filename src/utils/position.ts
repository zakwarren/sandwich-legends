import { Direction } from "../types";

export const oppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
    default:
      return "up";
  }
};
