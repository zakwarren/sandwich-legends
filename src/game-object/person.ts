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

interface UpdateState {
  map: {
    isSpaceTaken: (x: number, y: number, direction: Direction) => boolean;
  };
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

  private updatePosition() {
    const [property, change] = this.directionUpdate.get(
      this.direction
    ) as DirectionUpdate;
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  private updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.setAnimation(`idle-${this.direction}`);
  }

  startBehaviour(
    { map }: UpdateState,
    behaviour: { type: "walk"; direction: Direction }
  ) {
    // set character direction
    this.direction = behaviour.direction;
    // go here if type is walk and space is not taken
    if (
      behaviour.type === "walk" &&
      !map.isSpaceTaken(this.x, this.y, this.direction)
    ) {
      this.movingProgressRemaining = GRID_SIZE;
    }
  }

  update(state: UpdateState) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // case: we're player input ready and have a direction selected
      if (this.directionInput?.direction) {
        this.startBehaviour(state, {
          type: "walk",
          direction: this.directionInput.direction,
        });
      }

      this.updateSprite();
    }
  }
}
