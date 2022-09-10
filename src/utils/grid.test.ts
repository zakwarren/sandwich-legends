import {
  withGrid,
  getCameraPosition,
  asGridCoords,
  nextPosition,
} from "./grid";

describe("grid utilities", () => {
  it("should adjust the value to the grid base value", () => {
    const n = 10;
    const result = withGrid(n);

    expect(result).toEqual(n * 16);
  });

  it("should return 0,0 if no camera position provided", () => {
    const result = getCameraPosition();

    expect(result.x).toEqual(0);
    expect(result.y).toEqual(0);
  });

  it("should return values if camera position is provided", () => {
    const cameraFocus = { x: 1, y: 6 };
    const result = getCameraPosition(cameraFocus);

    expect(result.x).toEqual(167);
    expect(result.y).toEqual(90);
  });

  it("should return the grid coordinates", () => {
    const result = asGridCoords(2, 3);

    expect(result).toEqual("32,48");
  });

  it("should return the next position", () => {
    const result = nextPosition(1, 1, "right");

    expect(result.x).toEqual(17);
    expect(result.y).toEqual(1);
  });
});
