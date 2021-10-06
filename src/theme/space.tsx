import { Scale } from "./types";
/* eslint-disable prefer-destructuring */ const space: Scale<string> = {
  0: "0",
  1: "1px",
  2: "2px",
  3: "4px",
  4: "8px",
  5: "12px",
  6: "16px",
  7: "20px",
  8: "24px",
  9: "32px",
  10: "48px",
  11: "64px",
  12: "96px",
  13: "128px",
  14: "192px",
  15: "256px",
};
space.s = space[3];
space.m = space[4];
space.l = space[6];
space.xl = space[9];
space.xxl = space[11];
export default space;
