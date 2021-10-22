import { useState, useCallback, useContext } from "react";
import Loader from "react-loader-spinner";
import { Input, Button } from "antd";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import { getMethod } from "../../../../utils/methods/GetMethod";
import { getAllData } from "../../../../utils/IndexDBUtil";
import { RegistrationContext } from "../../../../context/Registration/context";
import {
  PokemonProps,
  EvolveProps,
} from "../../../../utils/types/PokemonTypes";

type SearchFormProps = {
  handleOnSearchPokemon: (
    pokemon: PokemonProps,
    evolutionChain: EvolveProps
  ) => void;
};

const SearchForm = ({ handleOnSearchPokemon }: SearchFormProps) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const regist = useContext(RegistrationContext);

  const getPokemon = useCallback(
    async (pokemonName) => {
      setShowLoader(true);
      try {
        const pokemon = await getMethod(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        const specie = await getMethod(pokemon.species.url);
        const evolutionLine = await getMethod(specie.evolution_chain.url);
        handleOnSearchPokemon(pokemon, evolutionLine.chain.evolves_to[0]);
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        return error;
      }
    },
    [handleOnSearchPokemon]
  );

  const handleOnChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleOnSearch = useCallback(async () => {
    const indexedPokemons = await getAllData("pokemon", "pokemon", "name");
    if (!!search && search !== "") {
      getPokemon(search);
    }
  }, [search, getPokemon]);

  return (
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
  );
};

export default SearchForm;
