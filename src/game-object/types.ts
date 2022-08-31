import {
  BaseAnimations,
  Behaviour,
  Direction,
  WorldMap,
  GameEvent,
} from "../types";

export interface BehaviourConfig {
  type: Behaviour;
  direction: Direction;
  time?: number;
}

export interface UpdateState {
  map: WorldMap;
}

interface EventHandler {
  init: () => Promise<void>;
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
