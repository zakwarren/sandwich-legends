export class KeyPressListener {
  private keySafe = true;
  private keydownFunction: (event: KeyboardEvent) => void;
  private keyupFunction: (event: KeyboardEvent) => void;

  constructor(
    private keyCode: KeyboardEvent["code"],
    private callback: () => void
  ) {
    this.keydownFunction = (event: KeyboardEvent) => {
      if (event.code === this.keyCode && this.keySafe) {
        this.keySafe = false;
        this.callback();
      }
    };

    this.keyupFunction = (event: KeyboardEvent) => {
      if (event.code === this.keyCode) {
        this.keySafe = true;
      }
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
