import { oppositeDirection } from "./position";

describe("position utilities", () => {
  it("should return the opposite direction", () => {
    const up = oppositeDirection("down");
    const left = oppositeDirection("right");

    expect(up).toEqual("up");
    expect(left).toEqual("left");
  });
});
