export const setPokemonAction = (pokemon) => async (dispatch) => {
  await dispatch({
    type: "SET_POKEMON",
    payload: pokemon,
  });
};
