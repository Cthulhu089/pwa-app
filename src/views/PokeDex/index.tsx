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

type TypesProps = {
  type: {
    name: string;
  };
};

type AbilitiesProps = {
  ability: {
    name: string;
  };
};

type SpeciesProps = {
  url: string;
};

type PokemonProps = {
  name: string;
  abilities: AbilitiesProps[];
  sprites: {
    front_default: string;
  };
  types: TypesProps[];
  species: SpeciesProps;
};

const PokeDex = () => {
  const [pokemon, setPokemon] = useState<PokemonProps>();
  const [search, setSearch] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const getMethod = useCallback(async (url: string) => {
    try {
      const fetchCall = await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const response = await fetchCall.json();
      return response;
    } catch (error) {
      setShowLoader(false);
      setShowSnackbar(true);
    }
  }, []);

  const setEvolutionLine = useCallback((evolves, pokemonName) => {
    const {
      species: { name },
      evolves_to,
    } = evolves;

    if (!!evolves_to && evolves_to[0].species.name === pokemonName) {
      //one evolution or last evolution
      console.log("one none", name, evolves_to[0].species.name);
    } else if (name === pokemonName && !!evolves_to) {
      console.log("more than one", name, evolves_to[0].species.name);
    } else {
      console.log("evolves", evolves);
    }
  }, []);

  const getPokemon = useCallback(
    async (pokemonName) => {
      setShowLoader(true);
      try {
        const pokemon = await getMethod(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        console.log("pokemon", pokemon.species.url);
        const specie = await getMethod(pokemon.species.url);
        const evolutionLine = await getMethod(specie.evolution_chain.url);
        await setPokemon(pokemon);
        await setEvolutionLine(evolutionLine.chain.evolves_to[0], pokemonName);
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        setShowSnackbar(true);
      }
    },
    [getMethod, setEvolutionLine]
  );

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
            description={""}
            sprite={pokemon.sprites.front_default}
            abilities={pokemon.abilities.map(({ ability: { name } }) => name)}
            types={pokemon.types.map(({ type: { name } }) => name)}
          />
        </Row>
      )}
      {/* {!!pokemon && (
        <Row>
          <EvolutionLine evolutionLine={pokemon.family.evolutionLine} />
        </Row>
      )} */}
    </PokeDexContainer>
  );
};

export default PokeDex;
