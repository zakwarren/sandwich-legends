/** @jest-environment jsdom */
import { emitEvent } from "./events";

describe("events", () => {
  it("should dispatch a custom event", () => {
    const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");
    const type = "testEvent";
    emitEvent(type, { whoId: "testing" });

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe(type);
  });
});
