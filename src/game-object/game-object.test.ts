import { GameObject } from "./game-object";

describe("GameObject", () => {
  const createGameObject = () =>
    new GameObject({
      x: 0,
      y: 0,
      src: "/test",
      createEvent: jest.fn(),
    });

  it("should draw the game object", async () => {
    const gameObject = createGameObject();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const ctx = { drawImage: jest.fn() };
    gameObject.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it("should mount the game object", () => {
    const gameObject = createGameObject();

    expect(gameObject.isMounted).toEqual(false);

    const map = {
      isCutscenePlaying: false,
      isSpaceTaken: jest.fn(),
      addWall: jest.fn(),
      moveWall: jest.fn(),
      mapGameObjects: { gameObject },
    };
    gameObject.mount(map);

    expect(gameObject.isMounted).toEqual(true);
    expect(map.addWall).toHaveBeenCalled();
  });
});
