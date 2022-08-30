/** @jest-environment jsdom */
import { DirectionInput } from "./direction-input";

describe("DirectionInput", () => {
  it("should add event listeners", () => {
    const mockEventListener = jest.fn();
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation(mockEventListener);
    new DirectionInput();

    expect(mockEventListener).toHaveBeenCalled();
  });
});
