import { Context } from "../types";
import { MapConfig } from "./types";

export class OverworldMap {
  private gameObjects: MapConfig["gameObjects"] = {};
  private lowerImage = new Image();
  private upperImage = new Image();

  constructor(config: MapConfig) {
    this.gameObjects = config.gameObjects;
    this.lowerImage.src = config.lowerSrc;
    this.upperImage.src = config.upperSrc;
  }

  getGameObjects() {
    return this.gameObjects;
  }

  drawLowerImage(ctx: Context) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx: Context) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}
