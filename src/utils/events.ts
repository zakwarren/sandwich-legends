type EventNames = "personWalkingComplete" | "personStandComplete";

export const EVENT_NAMES: { [key: string]: EventNames } = {
  personWalkingComplete: "personWalkingComplete",
  personStandComplete: "personStandComplete",
};

export const emitEvent = (name: EventNames, detail: { whoId?: string }) => {
  const event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
};

export const addEventListener = (
  name: EventNames,
  callback: (e: Event) => void
) => {
  document.addEventListener(name, callback);

  return () => document.removeEventListener(name, callback);
};
