import { Context, BaseAnimations } from "../types";

interface GameObject {
  x: number;
  y: number;
}

interface SpriteConfig<Animations> {
  src: string;
  animations: Animations;
  useShadow?: boolean;
  currentAnimation?: string;
  animationFrameLimit?: number;
}

export class Sprite<Animations extends BaseAnimations> {
  private image = new Image();
  private shadow = new Image();
  private isLoaded = false;
  private useShadow = false;
  private isShadowLoaded = false;
  private animations;
  private currentAnimation: keyof Animations = "idle-down";
  private currentAnimationFrame = 0;
  private animationFrameLimit = 4;
  private animationFrameProgress;

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
    this.animations = config.animations || { "idle-down": [[0, 0]] };
    this.currentAnimation = config.currentAnimation || this.currentAnimation;
    this.animationFrameLimit =
      config.animationFrameLimit || this.animationFrameLimit;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  get frame() {
    const current = this.animations[this.currentAnimation as string];
    if (!current) return undefined;
    return current[this.currentAnimationFrame];
  }

  get currentAnimationKey() {
    return this.currentAnimation;
  }

  setAnimation(key: keyof Animations) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  private updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: Context, gameObject: GameObject) {
    const x = gameObject.x - 8;
    const y = gameObject.y - 18;

    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, x, y);
    }

    const frame = this.frame || [0, 0];
    const [frameX, frameY] = frame;

    if (this.isLoaded) {
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
    }

    this.updateAnimationProgress();
  }
}
