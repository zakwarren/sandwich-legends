export interface Config {
  text: string;
  onComplete: () => void;
}

const cssClass = "TextMessage";

export class TextMessage {
  private text;
  private onComplete;
  private element: Element | null = null;

  constructor({ text, onComplete }: Config) {
    this.text = text;
    this.onComplete = onComplete;
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
