import { CameraPosition, Direction } from "../types";

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

export const asGridCoords = (x: number, y: number) =>
  `${x * GRID_SIZE},${y * GRID_SIZE}`;

export const nextPosition = (
  initialX: number,
  initialY: number,
  direction: Direction
) => {
  let x = initialX;
  let y = initialY;
  switch (direction) {
    case "left":
      x -= GRID_SIZE;
      break;
    case "right":
      x += GRID_SIZE;
      break;
    case "up":
      y -= GRID_SIZE;
      break;
    case "down":
      y += GRID_SIZE;
      break;
    default:
      break;
  }
  return { x, y };
};
