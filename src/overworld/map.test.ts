import { OverworldMap } from "./map";

describe("OverworldMap", () => {
  it("should return the game objects", async () => {
    const gameObjects = {
      test: {
        x: 1,
        y: 1,
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

    expect(map.mapGameObjects).toEqual(gameObjects);
  });

  it("should draw the lower image", () => {
    const gameObjects = {
      test: {
        x: 1,
        y: 1,
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
    const gameObjects = {
      test: {
        x: 1,
        y: 1,
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
    map.drawUpperImage(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });
});
