import { OverworldEvent } from "./overworld-event";
import { WorldMap, GameEvent } from "../types";

export const createOverworldEvent = (config: {
  map: WorldMap;
  event: GameEvent;
}) => new OverworldEvent(config);
