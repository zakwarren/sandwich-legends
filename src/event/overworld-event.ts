import {
  WorldMap,
  GameEvent,
  Behaviour,
  KeyPressListener,
  StartMap,
  SceneTransition,
} from "../types";
import { EVENT_NAMES, oppositeDirection } from "../utils";

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
  getStartMap: () => StartMap | null;
  createSceneTransition: () => SceneTransition;
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
  private getStartMap;
  private createSceneTransition;

  constructor(
    {
      element,
      createTextMessage,
      buildKeyPressListener,
      getStartMap,
      createSceneTransition: createSceneTranstion,
    }: Dependencies,
    { map, event }: EventConfig
  ) {
    this.element = element;
    this.createTextMessage = createTextMessage;
    this.buildKeyPressListener = buildKeyPressListener;
    this.getStartMap = getStartMap;
    this.createSceneTransition = createSceneTranstion;

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
    if (this.event.faceHero) {
      const obj = this.map.mapGameObjects[this.event.faceHero];
      obj.myDirection = oppositeDirection(
        this.map.mapGameObjects["hero"].myDirection
      );
    }

    const message = this.createTextMessage({
      text: this.event.text || "",
      onComplete: resolve,
      buildKeyPressListener: this.buildKeyPressListener,
    });
    message.init(this.element);
  }

  changeMap(resolve: Resolve) {
    const startMap = this.getStartMap();
    const sceneTransition = this.createSceneTransition();
    sceneTransition.init(this.element, () => {
      if (startMap && this.event.map) {
        startMap(this.event.map);
        resolve();

        sceneTransition.fadeOut();
      }
    });
  }

  init(): Promise<Behaviour> {
    return new Promise((resolve) => {
      return this[this.event.type](() => resolve(this.event.type));
    });
  }
}
