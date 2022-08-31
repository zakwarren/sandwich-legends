import { Overworld } from "./overworld";
import { Person } from "./game-object";
import { createOverworldEvent } from "./event";
import { DirectionInput } from "./controls";
import { asGridCoords } from "./utils";

const overworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    createEvent: createOverworldEvent,
    gameObjects: {
      hero: new Person({
        x: 5,
        y: 6,
        src: "/images/characters/people/hero.png",
        createEvent: createOverworldEvent,
        directionInput: new DirectionInput(),
      }),
      npc1: new Person({
        x: 7,
        y: 9,
        src: "/images/characters/people/npc1.png",
        createEvent: createOverworldEvent,
        behaviourLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
      }),
      npc2: new Person({
        x: 3,
        y: 7,
        src: "/images/characters/people/npc2.png",
        createEvent: createOverworldEvent,
        behaviourLoop: [
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
      }),
    },
    walls: {
      [asGridCoords(7, 6)]: true,
      [asGridCoords(8, 6)]: true,
      [asGridCoords(7, 7)]: true,
      [asGridCoords(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    createEvent: createOverworldEvent,
    gameObjects: {
      hero: new Person({
        x: 3,
        y: 5,
        src: "/images/characters/people/hero.png",
        createEvent: createOverworldEvent,
      }),
      npc1: new Person({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc1.png",
        createEvent: createOverworldEvent,
      }),
      npc2: new Person({
        x: 10,
        y: 8,
        src: "/images/characters/people/npc2.png",
        createEvent: createOverworldEvent,
      }),
    },
  },
};

const root = document.querySelector(".game-container");
if (root) {
  const overworld = new Overworld(root, overworldMaps);
  overworld.init();
}
