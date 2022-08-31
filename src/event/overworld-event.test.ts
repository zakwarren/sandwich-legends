/** @jest-environment jsdom */
import { OverworldEvent } from "./overworld-event";
import { GameEvent, WorldMap } from "../types";
import { emitEvent, EVENT_NAMES } from "../utils";

describe("OverworldEvent", () => {
  it("should listen for a stand event", () => {
    const map: WorldMap = {
      isCutscenePlaying: false,
      isSpaceTaken: jest.fn(),
      addWall: jest.fn(),
      moveWall: jest.fn(),
      mapGameObjects: {
        tester: {
          id: "tester",
          x: 1,
          y: 1,
          mount: jest.fn(),
          draw: jest.fn(),
          setAnimation: jest.fn(),
          startBehaviour: jest.fn(),
          update: jest.fn(),
        },
      },
    };
    const event: GameEvent = {
      type: "stand",
      direction: "up",
      who: "tester",
    };
    const eventHandler = new OverworldEvent({ map, event });

    eventHandler.init().then((res) => {
      expect(res).toEqual("stand");
    });
    emitEvent(EVENT_NAMES.personStandComplete, { whoId: event.who });
  });

  it("should listen for a walk event", () => {
    const map: WorldMap = {
      isCutscenePlaying: false,
      isSpaceTaken: jest.fn(),
      addWall: jest.fn(),
      moveWall: jest.fn(),
      mapGameObjects: {
        tester: {
          id: "tester",
          x: 1,
          y: 1,
          mount: jest.fn(),
          draw: jest.fn(),
          setAnimation: jest.fn(),
          startBehaviour: jest.fn(),
          update: jest.fn(),
        },
      },
    };
    const event: GameEvent = {
      type: "walk",
      direction: "up",
      who: "tester",
    };
    const eventHandler = new OverworldEvent({ map, event });

    eventHandler.init().then((res) => {
      expect(res).toEqual("walk");
    });
    emitEvent(EVENT_NAMES.personWalkingComplete, { whoId: event.who });
  });
});
