import { Sprite } from "../sprite";
import { Context, BaseAnimations, Direction } from "../types";
import { GameObjectConfig } from "./types";

export class GameObject<Animations extends BaseAnimations> {
  public x = 0;
  public y = 0;
  protected sprite: Sprite<Animations>;
  protected direction: Direction = "down";
  protected directionInput: GameObjectConfig["directionInput"] | null = null;

  constructor(config: GameObjectConfig) {
    this.x = config.x || this.x;
    this.y = config.y || this.y;
    this.sprite = new Sprite<Animations>({
      src: config.src,
      animations: (config.animations as Animations) || {
        "idle-down": [[0, 0]],
      },
      useShadow: true,
    });
    this.direction = config.direction || "down";
    this.directionInput = config.directionInput || null;
  }

  draw(ctx: Context) {
    this.sprite.draw(ctx, this);
  }

  update() {}
}
