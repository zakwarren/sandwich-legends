/** @jest-environment jsdom */
import { emitEvent, addEventListener } from "./events";

describe("event utilities", () => {
  it("should dispatch a custom event", () => {
    const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");
    const type = "personWalkingComplete";
    emitEvent(type, { whoId: "testing" });

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe(type);
  });

  it("should add an event listener", () => {
    const mockEventListener = jest.fn();
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation(mockEventListener);
    addEventListener("personWalkingComplete", jest.fn());

    expect(mockEventListener).toHaveBeenCalled();
  });

  it("should return a unsubscribe function", () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation(mockAddEventListener);
    jest
      .spyOn(document, "removeEventListener")
      .mockImplementation(mockRemoveEventListener);

    const unsubscribe = addEventListener("personWalkingComplete", jest.fn());
    unsubscribe();

    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
});
