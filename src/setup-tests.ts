// @ts-ignore
global.Image = class Image {
  src = "";
  onload = jest.fn();
  constructor() {
    setTimeout(() => {
      this.onload();
    }, 50);
  }
};

afterAll(() => {
  jest.restoreAllMocks();
});
