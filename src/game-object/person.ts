import { GameObject } from "./game-object";
import { GameObjectConfig } from "./types";
import { BaseAnimations, Direction } from "../types";
import { GRID_SIZE } from "../utils";

type DirectionUpdate = ["x" | "y", number];

interface Animations extends BaseAnimations {
  "idle-down": [number, number][];
  "idle-right": [number, number][];
  "idle-up": [number, number][];
  "idle-left": [number, number][];
  "walk-down": [number, number][];
  "walk-right": [number, number][];
  "walk-up": [number, number][];
}

export class Person extends GameObject<Animations> {
  private movingProgressRemaining = 0;
  private directionUpdate: Map<Direction, DirectionUpdate> = new Map([
    ["up", ["y", -1]],
    ["down", ["y", 1]],
    ["left", ["x", -1]],
    ["right", ["x", 1]],
  ]);

  constructor(config: GameObjectConfig) {
    const animations: Animations = {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    config.animations = animations;
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

  updateSprite() {
    if (this.movingProgressRemaining === 0 && !this.directionInput?.direction) {
      this.sprite.setAnimation(`idle-${this.direction}`);
      return;
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
    }
  }

  update() {
    this.updatePosition();
    this.updateSprite();

    if (this.movingProgressRemaining === 0 && this.directionInput?.direction) {
      this.direction = this.directionInput.direction;
      this.movingProgressRemaining = GRID_SIZE;
    }
  }
}
