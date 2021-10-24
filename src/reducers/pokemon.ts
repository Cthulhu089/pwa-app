import { PokemonProps } from "../utils/types/PokemonTypes";

type ActionProps = {
  type: "SET_POKEMON" | "CLEAR_POKEMON";
  payload?: PokemonProps;
};

const initialState: PokemonProps = {
  name: "",
  species: { url: "", name: "" },
  sprites: { front_default: "" },
  abilities: [],
  types: [],
};

export const pokemonReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case "SET_POKEMON":
      return { ...initialState, ...action.payload };
    case "CLEAR_POKEMON":
      return initialState;
    default:
      return state;
  }
};
