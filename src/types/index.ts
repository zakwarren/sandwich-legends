export interface Context {
  drawImage: CanvasRenderingContext2D["drawImage"];
}

export interface BaseAnimations {
  idleDown: number[][];
}

export type Direction = "up" | "down" | "left" | "right";
