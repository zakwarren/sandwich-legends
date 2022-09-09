/** @jest-environment jsdom */
import { KeyPressListener } from "./key-press-listener";

describe("KeyPressListener", () => {
  it("should add event listeners", () => {
    const mockEventListener = jest.fn();
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation(mockEventListener);
    new KeyPressListener("ArrowUp", jest.fn());

    expect(mockEventListener).toHaveBeenCalled();
  });
});
