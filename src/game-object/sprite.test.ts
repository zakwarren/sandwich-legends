import { Sprite } from "./sprite";

describe("Sprite", () => {
  it.skip("should draw the sprite", () => {
    const sprite = new Sprite({
      src: "/test",
      animations: { idleDown: [[0, 0]] },
    });
    const ctx = { drawImage: jest.fn() };
    const gameObject = { x: 1, y: 2 };
    sprite.draw(ctx, gameObject);

    expect(ctx.drawImage).toHaveBeenCalled();
  });
});
