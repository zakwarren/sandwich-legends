import { WorldMap, GameEvent, Behaviour, KeyPressListener } from "../types";
import { EVENT_NAMES } from "../utils";

type Resolve = () => void;
type buildKeyPressListener = (
  keyCode: string,
  callback: () => void
) => KeyPressListener;

export interface Dependencies {
  element: Element;
  createTextMessage: (config: {
    text: string;
    onComplete: () => void;
    buildKeyPressListener: buildKeyPressListener;
  }) => {
    init: (container: Element) => void;
  };
  buildKeyPressListener: buildKeyPressListener;
}

export interface EventConfig {
  map: WorldMap;
  event: GameEvent;
}

export class OverworldEvent {
  private element;
  private createTextMessage;
  private buildKeyPressListener;
  private map;
  private event;

  constructor(
    { element, createTextMessage, buildKeyPressListener }: Dependencies,
    { map, event }: EventConfig
  ) {
    this.element = element;
    this.createTextMessage = createTextMessage;
    this.buildKeyPressListener = buildKeyPressListener;
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
      buildKeyPressListener: this.buildKeyPressListener,
    });
    message.init(this.element);
  }

  init(): Promise<Behaviour> {
    return new Promise((resolve) => {
      return this[this.event.type](() => resolve(this.event.type));
    });
  }
}
