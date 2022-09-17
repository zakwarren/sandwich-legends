import { Overworld, createSceneTransition } from "./overworld";
import { buildCreateOverworldEvent } from "./event";
import { DirectionInput, buildKeyPressListener } from "./controls";
import { createTextMessage } from "./text-message";
import { buildOverworldMaps } from "./config";
import { StartMap } from "./types";

let startMap: StartMap | null = null;
const getStartMap = () => startMap;

const createOverworldEvent = buildCreateOverworldEvent({
  element: document.querySelector(".game-container") as Element,
  createTextMessage,
  buildKeyPressListener,
  getStartMap,
  createSceneTransition,
});
const directionInput = new DirectionInput();
const overworldMaps = buildOverworldMaps(directionInput, createOverworldEvent);

const root = document.querySelector(".game-container");
if (root) {
  const overworld = new Overworld(
    { buildKeyPressListener },
    root,
    overworldMaps
  );
  startMap = overworld.startMap;
  overworld.init();
}
