/* eslint-disable prefer-destructuring */
import { Scale } from "./types";
export const fonts = {
  primary: `"SJ Sans","Open Sans","Helvetica Neue",Helvetica,Arial,"sans-serif"`,
  secondary: `sans-serif`,
};
export const fontSizes: Scale<string> = {
  0: "0.75rem", // 12px
  1: "0.875rem", // 14px
  2: "1rem", // 16px
  3: "1.125rem", // 18px
  4: "1.25rem", // 20px
  5: "1.5rem", // 24px
  6: "1.75rem", // 28px
  7: "2rem", // 32px
  8: "2.25rem", // 36px
  9: "2.625rem", // 42px
};
fontSizes.baseText = fontSizes[1];
export const fontWeights = { normal: 300, bold: 400, bolder: 600 };
export const lineHeights = { none: 1, tight: 1.15, normal: 1.5, loose: 2 };
