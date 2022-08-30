import { CameraPosition, Context } from "../types";
import { getCameraPosition } from "../utils";
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

  get mapGameObjects() {
    return this.gameObjects;
  }

  drawLowerImage(ctx: Context, cameraFocus?: CameraPosition) {
    const cameraPosition = getCameraPosition(cameraFocus);
    ctx.drawImage(this.lowerImage, cameraPosition.x, cameraPosition.y);
  }

  drawUpperImage(ctx: Context, cameraFocus?: CameraPosition) {
    const cameraPosition = getCameraPosition(cameraFocus);
    ctx.drawImage(this.upperImage, cameraPosition.x, cameraPosition.y);
  }
}
