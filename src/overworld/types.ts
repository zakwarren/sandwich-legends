import { GameObject } from "../types";

export interface MapConfig {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: { [key: string]: GameObject };
  walls?: { [key: string]: boolean };
}

export interface Maps {
  [key: string]: MapConfig;
}
