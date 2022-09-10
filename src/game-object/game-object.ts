import { Sprite } from "./sprite";
import {
  Context,
  BaseAnimations,
  Direction,
  CameraPosition,
  WorldMap,
  Behaviour,
  GameEvent,
} from "../types";
import { withGrid } from "../utils";
import { BehaviourConfig, GameObjectConfig, UpdateState } from "./types";

export class GameObject<Animations extends BaseAnimations> {
  public id: string = "";
  public isMounted = false;
  protected isStanding = false;
  public x = 0;
  public y = 0;
  private sprite: Sprite<Animations>;
  protected direction: Direction = "down";
  protected directionInput: GameObjectConfig["directionInput"] | null = null;

  private behaviourLoop: BehaviourConfig[] = [];
  private behaviourLoopIndex = 0;
  private createEvent;
  public talking: { events: GameEvent[] }[] | undefined;

  constructor(config: GameObjectConfig) {
    this.x = withGrid(config.x);
    this.y = withGrid(config.y);
    this.sprite = new Sprite<Animations>({
      src: config.src,
      animations: (config.animations as Animations) || {
        "idle-down": [[0, 0]],
      },
      useShadow: true,
    });
    this.direction = config.direction || "down";
    this.directionInput = config.directionInput || null;

    this.behaviourLoop = config.behaviourLoop || this.behaviourLoop;
    this.createEvent = config.createEvent;
    this.talking = config.talking;
  }

  get myDirection() {
    return this.direction;
  }
  set myDirection(newDirection: Direction) {
    this.direction = newDirection;
  }

  async doBehaviourEvent(map: WorldMap) {
    // don't do anything if there is a more important cutscene or don't have a config
    if (
      map.isCutscenePlaying ||
      this.behaviourLoop.length === 0 ||
      this.isStanding
    )
      return;

    // setting up our event with relevant data
    const event = {
      ...this.behaviourLoop[this.behaviourLoopIndex],
      who: this.id,
    };

    // create an event instance out of our next event config
    const eventHandler = this.createEvent({ map, event });
    await eventHandler.init();

    // setting the next event to fire
    this.behaviourLoopIndex += 1;
    if (this.behaviourLoopIndex === this.behaviourLoop.length) {
      this.behaviourLoopIndex = 0;
    }

    this.doBehaviourEvent(map);
  }

  mount(map: WorldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(() => this.doBehaviourEvent(map), 10);
  }

  draw(ctx: Context, cameraFocus?: CameraPosition) {
    this.sprite.draw(ctx, this, cameraFocus);
  }

  setAnimation(key: string) {
    this.sprite.setAnimation(key);
  }

  update(_state: any) {}

  startBehaviour(
    _state: UpdateState,
    _behaviour: { type: Behaviour; direction: Direction }
  ) {}
}
