import { Direction } from "../types";

export class DirectionInput {
  private heldDirections: Direction[] = [];
  private map: { [key: string]: Direction } = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    KeyW: "up",
    KeyS: "down",
    KeyA: "left",
    KeyD: "right",
  };

  constructor() {
    this.addEventListeners();
  }

  get direction() {
    return this.heldDirections[0];
  }

  private addEventListeners() {
    document.addEventListener("keydown", (e) => {
      const direction = this.map[e.code];
      if (direction && !this.heldDirections.includes(direction)) {
        this.heldDirections.unshift(direction);
      }
    });

    document.addEventListener("keyup", (e) => {
      const direction = this.map[e.code];
      this.heldDirections = this.heldDirections.filter(
        (dir) => dir !== direction
      );
    });
  }
}
