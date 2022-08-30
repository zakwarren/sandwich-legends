import { withGrid, getCameraPosition } from "./grid";

describe("grid tools", () => {
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
});
