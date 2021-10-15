import styled from "styled-components/macro";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import Text from "../../../../components/basics/Text";

type PokemonDescriptionProps = {
  name: string | undefined;
  sprite: string | undefined;
  description: string | undefined;
  types: string[];
  abilities: string[];
};

const Title = styled(Text)`
  font-weight: bold;
`;

const PokemonDescription = ({
  name,
  sprite,
  description,
  abilities,
  types,
}: PokemonDescriptionProps) => {
  return (
    <Row pt={50}>
      <Column>
        <img width="300" src={sprite} alt={name} />
      </Column>
      <Column>
        <Row>
          {!!name && (
            <Title fontSize={30}>
              {name?.charAt(0).toUpperCase() + name?.slice(1)}
            </Title>
          )}
        </Row>
        <Row>{description}</Row>
        <Row>
          <Title fontSize={30}>Abilities:</Title>
        </Row>
        <Row>{abilities.join(", ")}</Row>
        <Row>
          <Title fontSize={30}>Types: </Title>
        </Row>
        <Row>{types.join(", ")}</Row>
      </Column>
    </Row>
  );
};

export default PokemonDescription;
