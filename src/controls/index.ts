export { DirectionInput } from "./direction-input";

import { KeyPressListener } from "./key-press-listener";
export const buildKeyPressListener = (keyCode: string, callback: () => void) =>
  new KeyPressListener(keyCode, callback);
