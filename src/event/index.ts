import { OverworldEvent, Dependencies, EventConfig } from "./overworld-event";

export const buildCreateOverworldEvent =
  (dependencies: Dependencies) => (config: EventConfig) =>
    new OverworldEvent(dependencies, config);
