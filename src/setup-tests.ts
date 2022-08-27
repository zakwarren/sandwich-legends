// @ts-ignore
global.Image = class Image {
  src = "";
  onload = () => {};
};

afterAll(() => {
  jest.restoreAllMocks();
});
