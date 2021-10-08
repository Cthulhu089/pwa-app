import Flex from "../Flex";
import { defaultLayoutPadding } from "../../../theme";

const Column = (props) => (
  <Flex flexDirection="column" px={defaultLayoutPadding} {...props} />
);

export default Column;
