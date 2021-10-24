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
    const data: any = await getAllData("pokemon", "pokemon", "name");
    await dispatch(setPokemonAction(data[0]));
    await clearStore("pokemon", "pokemon", "name");
  }, [dispatch]);

  useEffect(() => {
    getDataFromStore();
  }, [getDataFromStore]);
  console.log("pokemon", pokemon);

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
        {pokemon.name !== "" && !!evolveLine ? (
          <Row>
            <EvolutionLine evolveLine={evolveLine} name={pokemon.name} />
          </Row>
        ) : null}
      </>
    ),
    [evolveLine, pokemon]
  );

  return (
    <PokeDexContainer flexDirection={["row", null, null, "column"]} pt={50}>
      <Row>
        <img src={"/Pokedex_logo.png"} alt="pokeDex" />
      </Row>
      <SearchForm handleOnSearchPokemon={handleOnSearchPokemon} />
      {PokemonInfo}
    </PokeDexContainer>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(PokeDex);
