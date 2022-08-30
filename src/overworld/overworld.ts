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

      // draw lower layer
      this.map?.drawLowerImage(this.ctx);

      // draw game objects
      Object.values(this.map?.getGameObjects() || {}).forEach((object) => {
        object.update({});
        object.draw(this.ctx);
      });

      // draw upper layer
      this.map?.drawUpperImage(this.ctx);

      requestAnimationFrame(step);
    };
    step();
  }

  init() {
    this.map = new OverworldMap(this.overworldMaps["DemoRoom"]);
    this.startGameLoop();
  }
}
