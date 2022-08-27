import { Sprite } from "./sprite";
import { Context } from "../types";
import { BaseAnimations } from "./types";

interface Config {
  x?: number;
  y?: number;
  src: string;
}

export class GameObject {
  public x = 0;
  public y = 0;
  private sprite: Sprite<BaseAnimations>;

  constructor(config: Config) {
    this.x = config.x || this.x;
    this.y = config.y || this.y;
    this.sprite = new Sprite<BaseAnimations>({
      src: config.src,
      animations: { idleDown: [[0, 0]] },
      useShadow: true,
    });
  }

  draw(ctx: Context) {
    this.sprite.draw(ctx, this);
  }
}
