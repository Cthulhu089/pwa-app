import Flex from "../Flex";
import { defaultLayoutPadding } from "../../../theme";

const Row = (props) => (
  <Flex flexDirection="row" px={-defaultLayoutPadding} {...props} />
);
export default Row;
