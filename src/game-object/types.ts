import { BaseAnimations, Direction } from "../types";

export interface GameObjectConfig {
  x?: number;
  y?: number;
  src: string;
  direction?: Direction;
  directionInput?: { direction: Direction };
  animations?: BaseAnimations;
}
