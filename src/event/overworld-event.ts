import { WorldMap, GameEvent, Behaviour } from "../types";
import { EVENT_NAMES } from "../utils";

type Resolve = () => void;

export interface Dependencies {
  element: Element;
  createTextMessage: (config: { text: string; onComplete: () => void }) => {
    init: (container: Element) => void;
  };
}

export interface EventConfig {
  map: WorldMap;
  event: GameEvent;
}

export class OverworldEvent {
  private element;
  private createTextMessage;
  private map;
  private event;

  constructor(
    { element, createTextMessage }: Dependencies,
    { map, event }: EventConfig
  ) {
    this.element = element;
    this.createTextMessage = createTextMessage;
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

  textMessage(resolve: Resolve) {
    const message = this.createTextMessage({
      text: this.event.text || "",
      onComplete: resolve,
    });
    message.init(this.element);
  }

  init(): Promise<Behaviour> {
    return new Promise((resolve) => {
      return this[this.event.type](() => resolve(this.event.type));
    });
  }
}
