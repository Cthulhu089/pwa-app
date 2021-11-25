import { useCallback, useState, useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import EvolutionLine from "./components/EvolutionLine";
import PokemonDescription from "./components/PokemonDescription";
import SearchForm from "./components/SearchForm";
import Pokeball from "../../components/Icons/pokeball.svg";
import { EvolveProps } from "../../utils/types/PokemonTypes";
import { getAllData, clearStore } from "../../utils/IndexDBUtil";
import { setPokemonAction } from "../../actions/pokemon";
import { getMethod } from "../../utils/methods/GetMethod";
import { getRegistration } from "../../utils/SW";

const PokeDexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokeDex = (props) => {
  const { pokemon, offlineSearch } = props;
  const [evolveLine, setEvolveLine] = useState<EvolveProps | null>();
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

  useEffect(() => {
    window.addEventListener("offline", async (e) => {
      try {
        const sw: any = await getRegistration();
        const options = {
          body: "You are offline your request will be executed once you are online",
          icon: Pokeball,
          actions: [{ action: "confirm", title: "Okay" }],
        };
        sw.showNotification("Pokedex", options);
      } catch (error) {
        console.log("error", error);
      }
    });

    window.addEventListener("online", async (e) => {
      try {
        console.log("offlineSearch.name", offlineSearch.name);

        if (offlineSearch.name !== "") {
          const sw: any = await getRegistration();
          const options = {
            body: "You are back online please refresh to get you result",
            icon: Pokeball,
            actions: [{ action: "confirm", title: "Okay" }],
          };
          sw.showNotification("Pokedex", options);
        }
      } catch (error) {
        console.log("onlne");
      }
    });
  }, [offlineSearch]);

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
