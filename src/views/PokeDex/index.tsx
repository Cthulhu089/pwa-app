import { useCallback, useEffect, useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components/macro";
import Box from "../../components/Layout/Box";
import Row from "../../components/Layout/Row";
import Column from "../../components/Layout/Column";
import Container from "../../components/Layout/Container";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type EvolutionLineProps = {
  name: string;
  sprite: string;
};

type PokemonProps = {
  name: string;
  description: string;
  family: {
    evolutionLine: Array<EvolutionLineProps>;
  };
  sprite: string;
};

const PokeDex = () => {
  const [pokemon, setPokemon] = useState<PokemonProps>();
  const [search, setSearch] = useState<string>("");

  const getPokemon = useCallback(async (pokemonName) => {
    try {
      const response = await fetch(
        `https://regalion-api.herokuapp.com/${pokemonName}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const pokemon = await response.json();
      setPokemon(pokemon[0]);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getPokemon("pikachu");
  }, [getPokemon]);

  const handleOnChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <PokeDexContainer flexDirection={["row", null, null, "column"]} pt={50}>
      <Box>
        <Row>
          <Column>
            <Input
              placeholder="Search your pokemon"
              value={search}
              onChange={handleOnChangeSearch}
            />
          </Column>
          <Column>
            <Button type="primary">Search</Button>
          </Column>
        </Row>
        <Row>
          <Column>Marco</Column>
          <Column>Marco</Column>
          <Column>Marco</Column>
          <Column>Marco</Column>
          <Column>Marco</Column>
        </Row>
        <Row></Row>
      </Box>
    </PokeDexContainer>
  );
};

export default PokeDex;
