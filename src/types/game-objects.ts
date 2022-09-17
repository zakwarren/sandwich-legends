import { CameraPosition } from "./camera";
import {
  Context,
  Behaviour,
  Direction,
  GameEvent,
  EventHandler,
} from "./behaviour";

interface BehaviourConfig {
  type: Behaviour;
  direction: Direction;
  time?: number;
}

export interface GameObject {
  id: string | null;
  x: number;
  y: number;
  myDirection: Direction;
  mount: (map: WorldMap) => void;
  draw: (ctx: Context, cameraPosition?: CameraPosition) => void;
  setAnimation: (key: string) => void;
  startBehaviour: (
    state: { map: WorldMap },
    behaviour: BehaviourConfig
  ) => void;
  doBehaviourEvent: (map: WorldMap) => Promise<void>;
  update: (config: any) => void;
  talking?: { events: GameEvent[] }[] | undefined;
}

export interface WorldMap {
  isCutscenePlaying: boolean;
  mapGameObjects: { [key: string]: GameObject };
  isSpaceTaken: (x: number, y: number, direction: Direction) => boolean;
  addWall: (x: number, y: number) => void;
  moveWall: (x: number, y: number, direction: Direction) => void;
}

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

export type StartMap = (mapKey: string) => void;

export type SceneTransition = {
  init: (container: Element, callback: () => void) => void;
  fadeOut: () => void;
};
