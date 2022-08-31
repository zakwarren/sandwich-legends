import {
  BaseAnimations,
  Behaviour,
  Direction,
  WorldMap,
  GameEvent,
  EventHandler,
} from "../types";

export interface BehaviourConfig {
  type: Behaviour;
  direction: Direction;
  time?: number;
}

export interface UpdateState {
  map: WorldMap;
}

export interface GameObjectConfig {
  x: number;
  y: number;
  src: string;
  direction?: Direction;
  directionInput?: { direction: Direction };
  animations?: BaseAnimations;
  behaviourLoop?: BehaviourConfig[];
  createEvent: (config: { map: WorldMap; event: GameEvent }) => EventHandler;
}
