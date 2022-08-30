import { CameraPosition, Context, Direction } from "../types";
import { getCameraPosition, nextPosition } from "../utils";
import { MapConfig } from "./types";

export class OverworldMap {
  private gameObjects: MapConfig["gameObjects"] = {};
  private lowerImage = new Image();
  private upperImage = new Image();
  private walls;

  constructor(config: MapConfig) {
    this.gameObjects = config.gameObjects;
    this.lowerImage.src = config.lowerSrc;
    this.upperImage.src = config.upperSrc;
    this.walls = config.walls || {};
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

  isSpaceTaken(currentX: number, currentY: number, direction: Direction) {
    const { x, y } = nextPosition(currentX, currentY, direction);
    return Boolean(this.walls[`${x},${y}`]);
  }
}
