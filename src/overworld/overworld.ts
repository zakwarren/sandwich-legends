import { OverworldMap } from "./map";
import { Maps } from "./types";

export class Overworld {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private map: OverworldMap | null = null;

  constructor(private element: Element, private overworldMaps: Maps) {
    this.canvas = this.element.querySelector(
      ".game-canvas"
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  private startGameLoop() {
    const step = () => {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish the camera focus
      const cameraFocus = this.map?.mapGameObjects["hero"];

      // update all objects
      const allObjectValues = Object.values(this.map?.mapGameObjects || {});
      allObjectValues.forEach((object) => {
        object.update({ map: this.map });
      });

      // draw lower layer
      this.map?.drawLowerImage(this.ctx, cameraFocus);

      // draw game objects
      allObjectValues
        .sort((a, b) => a.y - b.y)
        .forEach((object) => {
          object.draw(this.ctx, cameraFocus);
        });

      // draw upper layer
      this.map?.drawUpperImage(this.ctx, cameraFocus);

      requestAnimationFrame(step);
    };
    step();
  }

  init() {
    this.map = new OverworldMap(this.overworldMaps["DemoRoom"]);
    this.map.mountObjects();
    this.startGameLoop();

    this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "stand", direction: "up", time: 800 },
    ]);
  }
}
