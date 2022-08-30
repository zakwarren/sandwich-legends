export interface Context {
  drawImage: CanvasRenderingContext2D["drawImage"];
}

export interface BaseAnimations {
  [key: string]: [number, number][];
  "idle-down": [number, number][];
}

export type Direction = "up" | "down" | "left" | "right";

export interface CameraPosition {
  x: number;
  y: number;
}

export interface WorldMap {
  isSpaceTaken: (x: number, y: number, direction: Direction) => boolean;
  addWall: (x: number, y: number) => void;
  moveWall: (x: number, y: number, direction: Direction) => void;
}
