import { CameraPosition, Context, Direction, GameEvent } from "../types";
import { getCameraPosition, nextPosition } from "../utils";
import { MapConfig } from "./types";

export class OverworldMap {
  private gameObjects: MapConfig["gameObjects"] = {};
  private lowerImage = new Image();
  private upperImage = new Image();
  private walls;
  public isCutscenePlaying = false;
  private createEvent;

  constructor(config: MapConfig) {
    this.gameObjects = config.gameObjects;
    this.lowerImage.src = config.lowerSrc;
    this.upperImage.src = config.upperSrc;
    this.walls = config.walls || {};
    this.createEvent = config.createEvent;
  }

  get mapGameObjects() {
    return this.gameObjects;
  }

  get mapWalls() {
    return this.walls;
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

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      const object = this.gameObjects[key];
      object.id = key;

      object.mount(this);
    });
  }

  async startCutscene(events: GameEvent[]) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = this.createEvent({ map: this, event: events[i] });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    // reset NPCs to do their idle behaviour
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviourEvent(this)
    );
  }

  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX: number, wasY: number, direction: Direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}
