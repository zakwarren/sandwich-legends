import { GameObject } from "./game-object";

describe("GameObject", () => {
  it("should draw the game object", async () => {
    const gameObject = new GameObject({ src: "/test" });
    await new Promise((resolve) => setTimeout(resolve, 100));

    const ctx = { drawImage: jest.fn() };
    gameObject.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalled();
  });
});
