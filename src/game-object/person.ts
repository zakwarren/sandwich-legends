import { GameObject } from "./game-object";
import { GameObjectConfig } from "./types";
import { Direction } from "../types";
import { GRID_SIZE } from "../utils";

type DirectionUpdate = ["x" | "y", number];

export class Person extends GameObject {
  private movingProgressRemaining = 0;
  private directionUpdate: Map<Direction, DirectionUpdate> = new Map([
    ["up", ["y", -1]],
    ["down", ["y", 1]],
    ["left", ["x", -1]],
    ["right", ["x", 1]],
  ]);

  constructor(config: GameObjectConfig) {
    super(config);
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate.get(
        this.direction
      ) as DirectionUpdate;
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  update() {
    this.updatePosition();
    if (this.movingProgressRemaining === 0 && this.directionInput?.direction) {
      this.direction = this.directionInput.direction;
      this.movingProgressRemaining = GRID_SIZE;
    }
  }
}
