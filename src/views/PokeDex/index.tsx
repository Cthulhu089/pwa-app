import { useCallback, useState, useEffect } from "react";
import SnackBar from "my-react-snackbar";
import styled from "styled-components/macro";
import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import EvolutionLine from "./components/EvolutionLine";
import PokemonDescription from "./components/PokemonDescription";
import SearchForm from "./components/SearchForm";
import { PokemonProps, EvolveProps } from "../../utils/types/PokemonTypes";
import { getRegistration } from "../../utils/SW";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokeDex = () => {
  const [pokemon, setPokemon] = useState<PokemonProps>();
  const [evolveLine, setEvolveLine] = useState<EvolveProps>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [registration, setRegistration] = useState<any>();

  const handleRegistration = useCallback(async () => {
    const sw = await getRegistration();
    setRegistration(sw);
  }, []);

  useEffect(() => {
    handleRegistration();
  }, [handleRegistration]);

  const handleOnYes = useCallback(async () => {
    setShowSnackbar(false);
  }, []);

  const handleOnSearchPokemon = useCallback((pokemon, evolutionLine) => {
    setPokemon(pokemon);
    setEvolveLine(evolutionLine);
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
      <SearchForm handleOnSearchPokemon={handleOnSearchPokemon} />
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
