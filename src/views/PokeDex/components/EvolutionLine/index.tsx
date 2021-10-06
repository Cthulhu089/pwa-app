import { EvolutionLineProps } from "../../";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import Text from "../../../../components/basics/Text";

type EvolutionProps = {
  evolutionLine: EvolutionLineProps[];
};

const EvolutionLine = ({ evolutionLine }: EvolutionProps) => {
  return (
    <Row pt={50}>
      {evolutionLine.map(({ name, sprite }) => (
        <Column>
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
