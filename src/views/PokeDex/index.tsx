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
import { getMethod } from "../../utils/methods/GetMethod";
import { PokemonProps, EvolveProps } from "../../utils/types/PokemonTypes";
import { readData } from "../../utils/IndexDBUtily/";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokeDex = () => {
  const [pokemon, setPokemon] = useState<PokemonProps>();
  const [evolveLine, setEvolveLine] = useState<EvolveProps>();
  const [search, setSearch] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const getPokemon = useCallback(async (pokemonName) => {
    setShowLoader(true);
    try {
      const pokemon = await getMethod(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const specie = await getMethod(pokemon.species.url);
      const evolutionLine = await getMethod(specie.evolution_chain.url);
      await setPokemon(pokemon);
      setEvolveLine(evolutionLine.chain.evolves_to[0]);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setShowSnackbar(true);
    }
  }, []);

  const handleOnChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleOnSearch = useCallback(async () => {
    const indexedPokemons = await readData("gets");
    console.log("indexedPokemons", indexedPokemons);

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
      {!!pokemon && !!evolveLine ? (
        <Row>
          <EvolutionLine evolveLine={evolveLine} name={pokemon.name} />
        </Row>
      ) : null}
    </PokeDexContainer>
  );
};

export default PokeDex;
