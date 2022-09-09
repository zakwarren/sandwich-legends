import { KeyPressListener } from "../types";

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
    p.innerText = this.text;
    this.element.appendChild(p);

    const button = document.createElement("button");
    button.classList.add(`${cssClass}_button`);
    button.innerText = "Next";
    button.addEventListener("click", this.done);
    this.element.appendChild(button);

    this.actionListener = this.buildKeyPressListener("Enter", () => {
      this.actionListener?.unbind();
      this.done();
    });
  }

  private done = () => {
    this.element?.remove();
    this.onComplete();
  };

  init(container: Element) {
    this.createElement();
    container.appendChild(this.element as Element);
  }
}
