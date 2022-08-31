export interface Context {
  drawImage: CanvasRenderingContext2D["drawImage"];
}

export interface BaseAnimations {
  [key: string]: [number, number][];
  "idle-down": [number, number][];
}

export type Direction = "up" | "down" | "left" | "right";

export type Behaviour = "stand" | "walk";

export interface CameraPosition {
  x: number;
  y: number;
}

export interface GameObject {
  id: string | null;
  x: number;
  y: number;
  mount: (map: WorldMap) => void;
  draw: (ctx: Context, cameraPosition?: GameObject) => void;
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

export interface GameEvent {
  type: Behaviour;
  direction: Direction;
  time?: number;
  who: string;
}
