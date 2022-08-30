import { CameraPosition } from "../types";

export const GRID_SIZE = 16;

export const withGrid = (n: number) => n * GRID_SIZE;

export const getCameraPosition = (
  cameraFocus?: CameraPosition
): CameraPosition => {
  if (!cameraFocus) return { x: 0, y: 0 };

  return {
    x: withGrid(10.5) - cameraFocus.x,
    y: withGrid(6) - cameraFocus.y,
  };
};
