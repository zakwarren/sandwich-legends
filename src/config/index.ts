import { MapBuilder } from "./types";
import { createDemoRoom } from "./demo-room";
import { createKitchen } from "./kitchen";

export const buildOverworldMaps: MapBuilder = (
  directionInput,
  createEvent
) => ({
  DemoRoom: createDemoRoom(directionInput, createEvent),
  Kitchen: createKitchen(directionInput, createEvent),
});
