import { OverworldMap } from "./map";
import { GameObject } from "../types";

describe("OverworldMap", () => {
  const createGameObjects = (): { [key: string]: GameObject } => ({
    test: {
      id: "",
      x: 1,
      y: 1,
      mount: jest.fn(),
      draw: jest.fn(),
      setAnimation: jest.fn(),
      startBehaviour: jest.fn(),
      doBehaviourEvent: jest.fn(),
      update: jest.fn(),
      myDirection: "up",
    },
  });

  it("should return the game objects", async () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
    });

    expect(map.mapGameObjects).toEqual(gameObjects);
  });

  it("should draw the lower image", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
    });
    const ctx = { drawImage: jest.fn() };
    map.drawLowerImage(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it("should draw the upper image", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
    });
    const ctx = { drawImage: jest.fn() };
    map.drawUpperImage(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it("should return if the space is taken", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
      walls: { ["17,1"]: true },
    });
    const result = map.isSpaceTaken(
      gameObjects.test.x,
      gameObjects.test.y,
      "right"
    );

    expect(result).toEqual(true);
  });

  it("should mount the game objects", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
    });
    map.mountObjects();

    expect(gameObjects.test.id).toEqual("test");
    expect(gameObjects.test.mount).toHaveBeenCalled();
  });

  it("should add a wall", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
      walls: { ["17,1"]: true },
    });
    map.addWall(2, 2);

    expect(map.mapWalls["2,2"]).toEqual(true);
  });

  it("should remove a wall", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
      walls: { ["17,1"]: true },
    });
    map.removeWall(17, 1);

    expect(map.mapWalls["17,1"]).toBeFalsy();
  });

  it("should move a wall", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
      createEvent: jest.fn(),
      walls: { ["17,1"]: true },
    });
    map.moveWall(17, 1, "down");

    expect(map.mapWalls["17,1"]).toBeFalsy();
    expect(map.mapWalls["17,17"]).toEqual(true);
  });
});
