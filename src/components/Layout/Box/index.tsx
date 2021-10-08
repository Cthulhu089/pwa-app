import styled from "styled-components/macro";
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
} from "styled-system";

export type BoxProps = SpaceProps &
  LayoutProps &
  ColorProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  BackgroundProps &
  AlignItemsProps &
  JustifyContentProps &
  TypographyProps & { as?: React.ElementType | keyof JSX.IntrinsicElements };

const Box = styled.div<BoxProps>(
  typography,
  space,
  color,
  border,
  shadow,
  layout,
  background,
  position,
  alignItems,
  justifyContent
);

export default Box;
