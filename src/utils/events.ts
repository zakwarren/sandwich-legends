export const EVENT_NAMES = {
  personWalkingComplete: "personWalkingComplete",
  personStandComplete: "personStandComplete",
};

export const emitEvent = (name: string, detail: { whoId?: string }) => {
  const event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
};
