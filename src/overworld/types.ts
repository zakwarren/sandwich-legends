import { Context } from "../types";

export interface GameObject {
  draw: (ctx: Context) => void;
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
