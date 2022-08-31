import { WorldMap, GameEvent, Behaviour } from "../types";
import { EVENT_NAMES } from "../utils";

type Resolve = () => void;

export class OverworldEvent {
  private map;
  private event;

  constructor({ map, event }: { map: WorldMap; event: GameEvent }) {
    this.map = map;
    this.event = event;
  }

  private stand(resolve: Resolve) {
    const who = this.map.mapGameObjects[this.event.who];
    who.startBehaviour(
      { map: this.map },
      { type: "stand", direction: this.event.direction, time: this.event.time }
    );

    const completeHandler = (e: Event) => {
      const detail = (<CustomEvent>e).detail;
      if (detail.whoId === this.event.who) {
        document.removeEventListener(
          EVENT_NAMES.personStandComplete,
          completeHandler
        );
        resolve();
      }
    };
    document.addEventListener(EVENT_NAMES.personStandComplete, completeHandler);
  }

  private walk(resolve: Resolve) {
    const who = this.map.mapGameObjects[this.event.who];
    who.startBehaviour(
      { map: this.map },
      { type: "walk", direction: this.event.direction }
    );

    // set up handler to complete when correct object has finished walking
    const completeHandler = (e: Event) => {
      const detail = (<CustomEvent>e).detail;
      if (detail.whoId === this.event.who) {
        document.removeEventListener(
          EVENT_NAMES.personWalkingComplete,
          completeHandler
        );
        resolve();
      }
    };
    document.addEventListener(
      EVENT_NAMES.personWalkingComplete,
      completeHandler
    );
  }

  init(): Promise<Behaviour> {
    return new Promise((resolve) => {
      return this[this.event.type](() => resolve(this.event.type));
    });
  }
}
