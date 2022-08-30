import { Context } from "../types";

export interface GameObject {
  x: number;
  y: number;
  draw: (ctx: Context, cameraPosition?: GameObject) => void;
  setAnimation: (key: string) => void;
  update: (config: {}) => void;
}

export interface MapConfig {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: { [key: string]: GameObject };
}

export interface Maps {
  [key: string]: MapConfig;
}
