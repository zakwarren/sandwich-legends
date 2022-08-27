import { Context } from "../types";
import { BaseAnimations } from "./types";

interface GameObject {
  x: number;
  y: number;
}

interface SpriteConfig<Animations> {
  src: string;
  animations: Animations;
  currentAnimation?: string;
  useShadow?: boolean;
}

export class Sprite<Animations extends BaseAnimations> {
  private image = new Image();
  private shadow = new Image();
  private isLoaded = false;
  private useShadow = false;
  private isShadowLoaded = false;
  // private animations: Animations;
  private currentAnimation = "idleDown";
  // private currentAnimationFrame = 0;

  constructor(config: SpriteConfig<Animations>) {
    // setup the image
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // shadow
    this.useShadow = config.useShadow || false;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      };
    }

    // configure animations and initial state
    // this.animations = config.animations || { idleDown: [[0, 0]] };
    this.currentAnimation = config.currentAnimation || this.currentAnimation;
  }

  draw(ctx: Context, gameObject: GameObject) {
    const x = gameObject.x * 16 - 8;
    const y = gameObject.y * 16 - 18;

    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, x, y);
    }

    if (this.isLoaded) {
      ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
    }
  }
}
