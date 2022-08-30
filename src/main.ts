import { Overworld } from "./overworld";
import { Person } from "./game-object";
import { DirectionInput } from "./controls";

const overworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: 5,
        y: 6,
        src: "/images/characters/people/hero.png",
        directionInput: new DirectionInput(),
      }),
      npc1: new Person({
        x: 7,
        y: 9,
        src: "/images/characters/people/npc1.png",
      }),
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: 3,
        y: 5,
        src: "/images/characters/people/hero.png",
      }),
      npc1: new Person({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc1.png",
      }),
      npc2: new Person({
        x: 10,
        y: 8,
        src: "/images/characters/people/npc2.png",
      }),
    },
  },
};

const root = document.querySelector(".game-container");
if (root) {
  const overworld = new Overworld(root, overworldMaps);
  overworld.init();
}
