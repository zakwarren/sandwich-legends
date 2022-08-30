import { OverworldMap } from "./map";

describe("OverworldMap", () => {
  const createGameObjects = () => ({
    test: {
      x: 1,
      y: 1,
      mount: jest.fn(),
      draw: jest.fn(),
      setAnimation: jest.fn(),
      update: jest.fn(),
    },
  });

  it("should return the game objects", async () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
    });

    expect(map.mapGameObjects).toEqual(gameObjects);
  });

  it("should draw the lower image", () => {
    const gameObjects = {
      test: {
        x: 1,
        y: 1,
        mount: jest.fn(),
        draw: jest.fn(),
        setAnimation: jest.fn(),
        update: jest.fn(),
      },
    };
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
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
    });
    map.mountObjects();

    expect(gameObjects.test.mount).toHaveBeenCalled();
  });

  it("should add a wall", () => {
    const gameObjects = createGameObjects();
    const map = new OverworldMap({
      lowerSrc: "/test-lower",
      upperSrc: "/test-upper",
      gameObjects,
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
      walls: { ["17,1"]: true },
    });
    map.moveWall(17, 1, "down");

    expect(map.mapWalls["17,1"]).toBeFalsy();
    expect(map.mapWalls["17,17"]).toEqual(true);
  });
});
