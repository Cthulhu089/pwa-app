import { useCallback, useState } from "react";
import SnackBar from "my-react-snackbar";
import Loader from "react-loader-spinner";
import { Input, Button } from "antd";
import styled from "styled-components/macro";
import Row from "../../components/Layout/Row";
import Column from "../../components/Layout/Column";
import Container from "../../components/Layout/Container";
import EvolutionLine from "./components/EvolutionLine";
import PokemonDescription from "./components/PokemonDescription";

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
  abilities: {
    hidden: string[];
    normal: string[];
  };
  description: string;
  family: {
    evolutionLine: Array<EvolutionLineProps>;
  };
  sprite: string;
  types: string[];
};

const PokeDex = () => {
  const [pokemon, setPokemon] = useState<PokemonProps>();
  const [search, setSearch] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const getPokemon = useCallback(async (pokemonName) => {
    setShowLoader(true);
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
      await setPokemon(pokemon[0]);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setShowSnackbar(true);
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

  const handleOnYes = useCallback(async () => {
    setShowSnackbar(false);
  }, []);

  return (
    <PokeDexContainer flexDirection={["row", null, null, "column"]} pt={50}>
      <Row>
        <img src={"/Pokedex_logo.png"} alt="pokeDex" />
      </Row>
      <SnackBar
        open={showSnackbar}
        message={"The pokemon is not on your zone"}
        position="top-center"
        type="error"
        yesLabel="ok"
        onYes={handleOnYes}
      />
      <Row pt={3}>
        {showLoader && (
          <Loader type="TailSpin" color="#00BFFF" height={30} width={40} />
        )}
        <Column></Column>
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
          <PokemonDescription
            name={pokemon.name}
            description={pokemon.description}
            sprite={pokemon.sprite}
            abilities={pokemon.abilities.hidden.concat(
              pokemon.abilities.normal
            )}
            types={pokemon.types}
          />
        </Row>
      )}
      {!!pokemon && (
        <Row>
          <EvolutionLine evolutionLine={pokemon.family.evolutionLine} />
        </Row>
      )}
    </PokeDexContainer>
  );
};

export default PokeDex;
