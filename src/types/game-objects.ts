import { CameraPosition } from "./camera";
import { Context, Behaviour, Direction } from "./behaviour";

export interface GameObject {
  id: string | null;
  x: number;
  y: number;
  mount: (map: WorldMap) => void;
  draw: (ctx: Context, cameraPosition?: CameraPosition) => void;
  setAnimation: (key: string) => void;
  startBehaviour: (
    state: { map: WorldMap },
    behaviour: { type: Behaviour; direction: Direction; time?: number }
  ) => void;
  update: (config: any) => void;
}

export interface WorldMap {
  isCutscenePlaying: boolean;
  mapGameObjects: { [key: string]: GameObject };
  isSpaceTaken: (x: number, y: number, direction: Direction) => boolean;
  addWall: (x: number, y: number) => void;
  moveWall: (x: number, y: number, direction: Direction) => void;
}
