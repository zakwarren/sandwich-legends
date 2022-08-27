import { GameObject } from "../game-object";

export class Overworld {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(private element: Element) {
    this.canvas = this.element.querySelector(
      ".game-canvas"
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  init() {
    // draw the map
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    // place some game objects
    const hero = new GameObject({
      x: 5,
      y: 6,
      src: "/images/characters/people/hero.png",
    });
    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
    });

    setTimeout(() => {
      hero.draw(this.ctx);
      npc1.draw(this.ctx);
    }, 1000);
  }
}
