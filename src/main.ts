import { Overworld } from "./overworld";
import { Person } from "./game-object";
import { buildCreateOverworldEvent } from "./event";
import { DirectionInput, buildKeyPressListener } from "./controls";
import { asGridCoords } from "./utils";
import { createTextMessage } from "./text-message";
import { GameEvent } from "./types";

const createOverworldEvent = buildCreateOverworldEvent({
  element: document.querySelector(".game-container") as Element,
  createTextMessage,
  buildKeyPressListener,
});

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
        talking: [
          {
            events: [
              {
                type: "textMessage",
                who: "npc1",
                direction: "up",
                text: "I'm working here...",
              },
              { type: "walk", who: "hero", direction: "up" },
            ],
          },
        ],
      }),
      npc2: new Person({
        x: 8,
        y: 5,
        src: "/images/characters/people/npc2.png",
        createEvent: createOverworldEvent,
        // behaviourLoop: [
        //   { type: "walk", direction: "left" },
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "down", time: 2000 },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "right" },
        //   { type: "stand", direction: "down", time: 800 },
        // ],
      }),
    },
    walls: {
      [asGridCoords(7, 6)]: true,
      [asGridCoords(8, 6)]: true,
      [asGridCoords(7, 7)]: true,
      [asGridCoords(8, 7)]: true,
    },
    cutsceneSpaces: {
      [asGridCoords(7, 4)]: [
        {
          events: [
            { who: "npc2", type: "walk", direction: "left" },
            { who: "npc2", type: "stand", direction: "up", time: 500 },
            {
              who: "npc2",
              type: "textMessage",
              direction: "up",
              text: "You can't be in there!",
            },
            { who: "npc2", type: "walk", direction: "right" },
            { who: "npc2", type: "stand", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ] as GameEvent[],
        },
      ],
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
  const overworld = new Overworld(
    { buildKeyPressListener },
    root,
    overworldMaps
  );
  overworld.init();
}
