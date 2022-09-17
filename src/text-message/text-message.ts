import { KeyPressListener } from "../types";
import { RevealingText } from "./revealing-text";

export interface Config {
  text: string;
  onComplete: () => void;
  buildKeyPressListener: (
    keyCode: string,
    callback: () => void
  ) => KeyPressListener;
}

const cssClass = "TextMessage";

export class TextMessage {
  private text;
  private onComplete;
  private buildKeyPressListener;
  private element: Element | null = null;
  private actionListener?: KeyPressListener;
  private revealingText: RevealingText | null = null;

  constructor({ text, onComplete, buildKeyPressListener }: Config) {
    this.text = text;
    this.onComplete = onComplete;
    this.buildKeyPressListener = buildKeyPressListener;
  }

  private createElement() {
    this.element = document.createElement("div");
    this.element.classList.add(cssClass);

    const p = document.createElement("p");
    p.classList.add(`${cssClass}_p`);
    this.element.appendChild(p);
    // text will be added to p with the typewriter effect

    const button = document.createElement("button");
    button.classList.add(`${cssClass}_button`);
    button.innerText = "Next";
    button.addEventListener("click", this.done);
    this.element.appendChild(button);

    this.actionListener = this.buildKeyPressListener("Enter", () => {
      this.done();
    });

    return p;
  }

  private done = () => {
    if (this.revealingText?.isDone) {
      this.element?.remove();
      this.actionListener?.unbind();
      this.onComplete();
    } else {
      this.revealingText?.warpToDone();
    }
  };

  init(container: Element) {
    const element = this.createElement();
    container.appendChild(this.element as Element);

    // initialize the typewriter effect
    this.revealingText = new RevealingText({ text: this.text, element });
    this.revealingText.init();
  }
}
