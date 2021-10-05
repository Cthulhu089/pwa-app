import { createGlobalStyle } from "styled-components/macro";

import { fonts, fontSizes, fontWeights, lineHeights } from "./font";
import colors from "./colors";

const theme = {
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  colors,
};

export const defaultLayoutMargin = 4; // default margin theme.space[4] for Columns and Rows
export const defaultLayoutPadding = 4; // default padding theme.space[2] for Columns and Rows
export const GlobalStyle = createGlobalStyle`body { margin: 0; } * { box-sizing: border-box; }`;
export default theme;
