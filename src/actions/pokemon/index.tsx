export const setPokemonAction = (pokemon) => async (dispatch) => {
  await dispatch({
    type: "SET_POKEMON",
    payload: pokemon,
  });
};

export const clearPokemonAction = () => async (dispatch) => {
  await dispatch({
    type: "CLEAR_POKEMON",
  });
};
