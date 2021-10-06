import { EvolutionLineProps } from "../../";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import Text from "../../../../components/basics/Text";

type EvolutionProps = {
  evolutionLine: EvolutionLineProps[];
};

const EvolutionLine = ({ evolutionLine }: EvolutionProps) => {
  return (
    <Row flexDirection={["column", null, null, "row"]} pt={50}>
      {evolutionLine.map(({ name, sprite }) => (
        <Column width={1} key={name}>
          <Row>
            <img width="150px" src={sprite} alt={name} />
          </Row>
          <Row>
            <Text>{name}</Text>
          </Row>
        </Column>
      ))}
    </Row>
  );
};

export default EvolutionLine;
