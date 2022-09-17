export class SceneTransition {
  private element: Element | null = null;

  private createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("SceneTransition");
  }

  fadeOut() {
    this.element?.classList.add("fade-out");
    this.element?.addEventListener(
      "animationend",
      () => {
        this.element?.remove();
      },
      { once: true }
    );
  }

  init(container: Element, callback: () => void) {
    this.createElement();
    if (this.element) {
      container.appendChild(this.element);
      this.element.addEventListener(
        "animationend",
        () => {
          callback();
        },
        {
          once: true,
        }
      );
    }
  }
}
