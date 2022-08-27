/*** @jest-environment-jsdom */
import { Sprite } from "./sprite";

describe("Sprite", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should draw the sprite", () => {
    // @ts-ignore
    global.Image = class Image {
      src = "";
      onload = () => {};
    };

    const sprite = new Sprite({
      src: "/test",
      animations: { idleDown: [[0, 0]] },
    });
    const ctx = { drawImage: jest.fn() };
    const gameObject = { x: 1, y: 2 };
    sprite.draw(ctx, gameObject);

    setTimeout(() => {
      expect(ctx.drawImage).toHaveBeenCalled();
    }, 1000);
  });
});
