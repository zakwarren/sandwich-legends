import { Overworld } from "./overworld";

const root = document.querySelector(".game-container");
if (root) {
  const overworld = new Overworld(root);
  overworld.init();
}
