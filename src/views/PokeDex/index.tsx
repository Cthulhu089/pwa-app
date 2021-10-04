import { useCallback, useEffect, useState } from "react";
import { Input, Button } from "antd";
import Box from "../../components/basics/Box";
import Row from "../../components/basics/Row";
import Column from "../../components/basics/Column";

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
    <Box>
      <Row>
        <Column>Marco</Column>
      </Row>
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
    </Box>
  );
};

export default PokeDex;
