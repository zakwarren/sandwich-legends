import { KeyPressListener, StartMap } from "../types";
import { addEventListener } from "../utils";
import { OverworldMap } from "./map";
import { Maps } from "./types";

interface Dependencies {
  buildKeyPressListener: (
    keyCode: string,
    callback: () => void
  ) => KeyPressListener;
}

export class Overworld {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private map: OverworldMap | null = null;

  private buildKeyPressListener;

  constructor(
    { buildKeyPressListener }: Dependencies,
    private element: Element,
    private overworldMaps: Maps
  ) {
    this.canvas = this.element.querySelector(
      ".game-canvas"
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.buildKeyPressListener = buildKeyPressListener;
  }

  private startGameLoop() {
    const step = () => {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish the camera focus
      const cameraFocus = this.map?.mapGameObjects["hero"];

      // update all objects
      const allObjectValues = Object.values(this.map?.mapGameObjects || {});
      allObjectValues.forEach((object) => {
        object.update({ map: this.map });
      });

      // draw lower layer
      this.map?.drawLowerImage(this.ctx, cameraFocus);

      // draw game objects
      allObjectValues
        .sort((a, b) => a.y - b.y)
        .forEach((object) => {
          object.draw(this.ctx, cameraFocus);
        });

      // draw upper layer
      this.map?.drawUpperImage(this.ctx, cameraFocus);

      requestAnimationFrame(step);
    };
    step();
  }

  bindActionInput() {
    this.buildKeyPressListener("Enter", () => {
      // Is there a person here to talk to?
      this.map?.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    addEventListener("personWalkingComplete", (e) => {
      const detail = (<CustomEvent>e).detail;
      if (detail.whoId === "hero") {
        // hero's position has changed
        this.map?.checkForFootstepCutscene();
      }
    });
  }

  startMap: StartMap = (mapKey: string) => {
    const mapConfig = this.overworldMaps[mapKey];
    this.map = new OverworldMap(mapConfig);
    this.map.mountObjects();
  };

  init() {
    this.startMap("DemoRoom");
    this.startGameLoop();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.map?.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "stand", direction: "up", time: 800 },
      {
        who: "npc1",
        type: "textMessage",
        direction: "up",
        text: "Hello there",
      },
      { who: "npc1", type: "walk", direction: "right" },
    ]);
  }
}
