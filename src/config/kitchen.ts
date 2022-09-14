import { Person } from "../game-object";
import { ConfigBuilder } from "./types";

export const createKitchen: ConfigBuilder = (directionInput, createEvent) => ({
  lowerSrc: "/images/maps/KitchenLower.png",
  upperSrc: "/images/maps/KitchenUpper.png",
  createEvent: createEvent,
  gameObjects: {
    hero: new Person({
      x: 3,
      y: 5,
      src: "/images/characters/people/hero.png",
      createEvent: createEvent,
      directionInput,
    }),
    npc1: new Person({
      x: 9,
      y: 6,
      src: "/images/characters/people/npc1.png",
      createEvent: createEvent,
    }),
    npc2: new Person({
      x: 10,
      y: 8,
      src: "/images/characters/people/npc2.png",
      createEvent: createEvent,
      talking: [
        {
          events: [
            {
              type: "textMessage",
              who: "npc2",
              direction: "up",
              faceHero: "npc2",
              text: "You made it!",
            },
          ],
        },
      ],
    }),
  },
});
