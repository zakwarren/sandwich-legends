import { DirectionInput } from "../controls";
import { EventHandler, WorldMap, GameEvent, MapConfig, Maps } from "../types";

export type ConfigBuilder = (
  directionInput: DirectionInput,
  createEvent: (config: { map: WorldMap; event: GameEvent }) => EventHandler
) => MapConfig;

export type MapBuilder = (
  directionInput: DirectionInput,
  createEvent: (config: { map: WorldMap; event: GameEvent }) => EventHandler
) => Maps;
