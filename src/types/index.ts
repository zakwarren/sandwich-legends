export interface Context {
  drawImage: CanvasRenderingContext2D["drawImage"];
}

export interface BaseAnimations {
  [key: string]: [number, number][];
  "idle-down": [number, number][];
}

export type Direction = "up" | "down" | "left" | "right";
