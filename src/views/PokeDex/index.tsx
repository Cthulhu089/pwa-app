import { useCallback, useEffect, useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components/macro";
import Row from "../../components/Layout/Row";
import Column from "../../components/Layout/Column";
import Container from "../../components/Layout/Container";
import EvolutionLine from "./components/EvolutionLine";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type EvolutionLineProps = {
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

  const handleOnChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleOnSearch = useCallback(() => {
    if (!!search && search !== "") {
      getPokemon(search);
    }
  }, [search, getPokemon]);

  return (
    <PokeDexContainer flexDirection={["row", null, null, "column"]} pt={50}>
      {console.log("pokemon", pokemon)}
      <Row>
        <img src={"/Pokedex_logo.png"} alt="pokeDex" />
      </Row>
      <Row pt={3}>
        <Column>
          <Input
            placeholder="Search your pokemon"
            value={search}
            onChange={handleOnChangeSearch}
          />
        </Column>
        <Column>
          <Button onClick={handleOnSearch} type="primary">
            Search
          </Button>
        </Column>
      </Row>
      {!!pokemon && (
        <Row>
          <EvolutionLine evolutionLine={pokemon.family.evolutionLine} />
        </Row>
      )}
    </PokeDexContainer>
  );
};

export default PokeDex;
