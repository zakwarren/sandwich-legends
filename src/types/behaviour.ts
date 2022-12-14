export interface Context {
  drawImage: CanvasRenderingContext2D["drawImage"];
}

export interface BaseAnimations {
  [key: string]: [number, number][];
  "idle-down": [number, number][];
}

export type Direction = "up" | "down" | "left" | "right";

export type Behaviour = "stand" | "walk" | "textMessage" | "changeMap";

export interface GameEvent {
  type: Behaviour;
  direction: Direction;
  time?: number;
  who: string;
  text?: string;
  faceHero?: string;
  map?: string;
}

export interface EventHandler {
  init: () => Promise<Behaviour>;
}

export interface KeyPressListener {
  unbind: () => void;
}
