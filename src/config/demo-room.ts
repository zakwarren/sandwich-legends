import { Person } from "../game-object";
import { asGridCoords } from "../utils";
import { ConfigBuilder } from "./types";

export const createDemoRoom: ConfigBuilder = (directionInput, createEvent) => ({
  lowerSrc: "/images/maps/DemoLower.png",
  upperSrc: "/images/maps/DemoUpper.png",
  createEvent,
  gameObjects: {
    hero: new Person({
      x: 5,
      y: 6,
      src: "/images/characters/people/hero.png",
      createEvent,
      directionInput,
    }),
    npc1: new Person({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
      createEvent,
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
      createEvent,
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
        ],
      },
    ],
    [asGridCoords(5, 10)]: [
      {
        events: [
          {
            type: "changeMap",
            who: "hero",
            direction: "down",
            map: "Kitchen",
          },
        ],
      },
    ],
  },
});
