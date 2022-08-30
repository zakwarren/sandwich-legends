import { GameObject } from "./game-object";

describe("GameObject", () => {
  it("should draw the game object", async () => {
    const gameObject = new GameObject({ x: 0, y: 0, src: "/test" });
    await new Promise((resolve) => setTimeout(resolve, 100));

    const ctx = { drawImage: jest.fn() };
    gameObject.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it("should mount the game object", () => {
    const gameObject = new GameObject({ x: 0, y: 0, src: "/test" });

    expect(gameObject.isMounted).toEqual(false);

    const map = {
      isSpaceTaken: jest.fn(),
      addWall: jest.fn(),
      moveWall: jest.fn(),
    };
    gameObject.mount(map);

    expect(gameObject.isMounted).toEqual(true);
    expect(map.addWall).toHaveBeenCalled();
  });
});
