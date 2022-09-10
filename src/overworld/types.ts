import { GameObject, WorldMap, GameEvent, EventHandler } from "../types";

export interface MapConfig {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: { [key: string]: GameObject };
  walls?: { [key: string]: boolean };
  createEvent: (config: { map: WorldMap; event: GameEvent }) => EventHandler;
  cutsceneSpaces?: { [key: string]: { events: GameEvent[] }[] };
}

export interface Maps {
  [key: string]: MapConfig;
}
