import { useState, useCallback, useEffect } from "react";
import Loader from "react-loader-spinner";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import { getMethod } from "../../../../utils/methods/GetMethod";
import { clearStore, writeData } from "../../../../utils/IndexDBUtil";
import { EvolveProps } from "../../../../utils/types/PokemonTypes";
import { getRegistration } from "../../../../utils/SW";
import { setSnackBarAction } from "../../../../actions/Snackbar";
import {
  setSearchAction,
  clearSearchAction,
} from "../../../../actions/offlineSearch";
import {
  setPokemonAction,
  clearPokemonAction,
} from "../../../../actions/pokemon";

type SearchFormProps = {
  handleOnSearchPokemon: (evolutionChain: EvolveProps | null) => void;
};

const SearchForm = ({ handleOnSearchPokemon }: SearchFormProps) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sw, setSw] = useState<any>();
  const dispatch = useDispatch();

  const handleRegistration = useCallback(async () => {
    const sw: any = await getRegistration();
    setSw(sw);
  }, []);

  useEffect(() => {
    handleRegistration();
  }, [handleRegistration]);

  const getPokemon = useCallback(
    async (pokemonName) => {
      setShowLoader(true);
      try {
        const pokemon = await getMethod(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        const specie = await getMethod(pokemon.species.url);
        const evolutionLine = await getMethod(specie.evolution_chain.url);
        await dispatch(setPokemonAction(pokemon));
        handleOnSearchPokemon(evolutionLine.chain.evolves_to[0]);
        setShowLoader(false);
      } catch (error) {
        dispatch(
          setSnackBarAction({
            message: "Pokemon not in your zone",
            type: "error",
            open: true,
            yesLabel: "Ok",
          })
        );
        setShowLoader(false);
        return error;
      }
    },
    [handleOnSearchPokemon, dispatch]
  );

  const handleOnChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleOnSearch = useCallback(async () => {
    try {
      await handleOnSearchPokemon(null);
      await dispatch(clearPokemonAction());
      await dispatch(clearSearchAction());
      await clearStore("pokemon", "pokemon", "name");
      await clearStore("sync-data", "sync-data", "name");

      if (!!search && search !== "") {
        const data = {
          name: search,
        };

        if (!navigator.onLine) {
          await writeData("sync-data", data, "sync-data", "name");
          await sw.sync.register("sync-pokeSearch");
          dispatch(
            setSnackBarAction({
              message: "Your Request is saved",
              type: "success",
              open: true,
              yesLabel: "OK",
            })
          );
          dispatch(setSearchAction(search));
        } else {
          getPokemon(search);
        }
      }
    } catch (error) {
      return error;
    }
  }, [handleOnSearchPokemon, dispatch, search, sw, getPokemon]);

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
