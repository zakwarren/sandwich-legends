import { Context, WorldMap } from "../types";

export interface GameObject {
  x: number;
  y: number;
  mount: (map: WorldMap) => void;
  draw: (ctx: Context, cameraPosition?: GameObject) => void;
  setAnimation: (key: string) => void;
  update: (config: any) => void;
}

export interface MapConfig {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: { [key: string]: GameObject };
  walls?: { [key: string]: boolean };
}

export interface Maps {
  [key: string]: MapConfig;
}
