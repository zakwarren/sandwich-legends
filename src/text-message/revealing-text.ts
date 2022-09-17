interface TextConfig {
  element: HTMLElement;
  text: string;
  speed?: number;
}

interface CharacterSpan {
  span: HTMLSpanElement;
  delayAfter: number;
}

export class RevealingText {
  private element: HTMLElement;
  private text: string;
  private speed = 70;
  private timeout: NodeJS.Timeout | null = null;
  public isDone = false;

  constructor(config: TextConfig) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || this.speed;
  }

  private revealOneCharacter(characters: CharacterSpan[]) {
    const next = characters.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (characters.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(characters);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.isDone = true;
    this.element
      .querySelectorAll("span")
      .forEach((s) => s.classList.add("revealed"));
  }

  init() {
    const characters: CharacterSpan[] = [];
    this.text.split("").forEach((character) => {
      // create each span and append to element in DOM
      const span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      // add this span to our internal state array
      characters.push({ span, delayAfter: character === " " ? 0 : this.speed });
    });

    this.revealOneCharacter(characters);
  }
}
