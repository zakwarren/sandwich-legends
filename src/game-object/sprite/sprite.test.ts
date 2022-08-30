import { Sprite } from "./sprite";

describe("Sprite", () => {
  it("should draw the sprite", async () => {
    const sprite = new Sprite({
      src: "/test",
      animations: { "idle-down": [[0, 0]] },
    });
    await new Promise((resolve) => setTimeout(resolve, 100));

    const ctx = { drawImage: jest.fn() };
    const gameObject = { x: 1, y: 2 };
    sprite.draw(ctx, gameObject);

    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it("should set the new animation", () => {
    const sprite = new Sprite({
      src: "/test",
      animations: { "idle-down": [[0, 0]], "idle-up": [[1, 1]] },
    });

    expect(sprite.currentAnimationKey).toEqual("idle-down");

    sprite.setAnimation("idle-up");

    expect(sprite.currentAnimationKey).toEqual("idle-up");
  });
});
