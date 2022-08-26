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
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    const x = 5;
    const y = 6;

    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(shadow, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32);
    };
    shadow.src = "/images/characters/shadow.png";

    const hero = new Image();
    hero.onload = () => {
      // hero, left cut, top cut, width of cut, height of cut, x pos, y pos, width, height
      this.ctx.drawImage(hero, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32);
    };
    hero.src = "/images/characters/people/hero.png";
  }
}
