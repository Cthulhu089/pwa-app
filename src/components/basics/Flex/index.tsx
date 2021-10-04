import styled from "styled-components/macro";
import { flexbox, FlexboxProps } from "styled-system";
import Box, { BoxProps } from "../Box";

export type FlexProps = BoxProps & FlexboxProps;

const Flex = styled(Box)<FlexProps>(flexbox);

Flex.defaultProps = { display: "flex" };

export default Flex;
