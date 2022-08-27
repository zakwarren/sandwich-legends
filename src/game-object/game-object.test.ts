import { GameObject } from "./game-object";

describe("GameObject", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should draw the game object", async () => {
    // @ts-ignore
    global.Image = class Image {
      src = "";
      onload = () => {};
    };

    const gameObject = new GameObject({ src: "/test" });
    const ctx = { drawImage: jest.fn() };
    gameObject.draw(ctx);

    setTimeout(() => {
      expect(ctx.drawImage).toHaveBeenCalled();
    }, 1000);
  });
});
