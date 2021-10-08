import styled from "styled-components/macro";
import Box, { BoxProps } from "../../Layout/Box";

export type TextProps = {
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
} & BoxProps;

const Text = styled(Box)<TextProps>`
  overflow-wrap: break-word; // Custom props
  ${({ uppercase }) => uppercase && `text-transform: uppercase`}
  ${({ lowercase }) => lowercase && `text-transform: lowercase`}  
  ${({ capitalize }) => capitalize && `text-transform: capitalize`}
`;

Text.defaultProps = { as: "div", fontSize: 3, lineHeight: "normal" };
export default Text;
