import { useCallback, useState, useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import EvolutionLine from "./components/EvolutionLine";
import PokemonDescription from "./components/PokemonDescription";
import SearchForm from "./components/SearchForm";
import { EvolveProps } from "../../utils/types/PokemonTypes";
import { getAllData, clearStore } from "../../utils/IndexDBUtil";
import { setPokemonAction } from "../../actions/pokemon";
import { getMethod } from "../../utils/methods/GetMethod";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokeDex = (props) => {
  const { pokemon } = props;
  const [evolveLine, setEvolveLine] = useState<EvolveProps>();
  const dispatch = useDispatch();
  const handleOnSearchPokemon = useCallback((evolutionLine) => {
    setEvolveLine(evolutionLine);
  }, []);

  const getDataFromStore = useCallback(async () => {
    try {
      const data: any = await getAllData("pokemon", "pokemon", "name");
      if (!!data[0]) {
        const specie = data[0].species.url;
        await dispatch(setPokemonAction(data[0]));
        const species = await getMethod(specie);
        const evolutionLine = await getMethod(species.evolution_chain.url);
        await setEvolveLine(evolutionLine.chain.evolves_to[0]);
        await clearStore("pokemon", "pokemon", "name");
      }
    } catch (error) {
      return error;
    }
  }, [dispatch]);

  useEffect(() => {
    getDataFromStore();
  }, [getDataFromStore]);

  const PokemonInfo = useMemo(
    () => (
      <>
        {pokemon.name !== "" && (
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
      </>
    ),
    [pokemon]
  );

  const Evolution = useMemo(
    () => (
      <>
        {pokemon.name !== "" && !!evolveLine ? (
          <Row>
            <EvolutionLine evolveLine={evolveLine} name={pokemon.name} />
          </Row>
        ) : null}
      </>
    ),
    [pokemon, evolveLine]
  );

  return (
    <PokeDexContainer flexDirection={["row", null, null, "column"]} pt={50}>
      <Row>
        <img src={"/Pokedex_logo.png"} alt="pokeDex" />
      </Row>
      <SearchForm handleOnSearchPokemon={handleOnSearchPokemon} />
      {PokemonInfo}
      {Evolution}
    </PokeDexContainer>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(PokeDex);
