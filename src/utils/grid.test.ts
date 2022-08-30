import { withGrid } from "./grid";

describe("withGrid", () => {
  it("should adjust the value to the grid base value", () => {
    const n = 10;
    const result = withGrid(n);

    expect(result).toEqual(n * 16);
  });
});
