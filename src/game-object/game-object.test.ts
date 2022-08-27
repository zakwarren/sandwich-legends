import { GameObject } from "./game-object";

describe("GameObject", () => {
  it.skip("should draw the game object", () => {
    const gameObject = new GameObject({ src: "/test" });
    const ctx = { drawImage: jest.fn() };
    gameObject.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });
});
