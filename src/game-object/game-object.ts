import { Sprite } from "./sprite";
import { Context, BaseAnimations, Direction, CameraPosition } from "../types";
import { withGrid } from "../utils";
import { GameObjectConfig } from "./types";

export class GameObject<Animations extends BaseAnimations> {
  public x = 0;
  public y = 0;
  private sprite: Sprite<Animations>;
  protected direction: Direction = "down";
  protected directionInput: GameObjectConfig["directionInput"] | null = null;

  constructor(config: GameObjectConfig) {
    this.x = withGrid(config.x);
    this.y = withGrid(config.y);
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

  draw(ctx: Context, cameraFocus?: CameraPosition) {
    this.sprite.draw(ctx, this, cameraFocus);
  }

  setAnimation(key: string) {
    this.sprite.setAnimation(key);
  }

  update(_state: any) {}
}
