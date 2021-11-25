export const setSearchAction = (name) => async (dispatch) => {
  await dispatch({
    type: "SET_SEARCH",
    payload: { name },
  });
};

export const clearSearchAction = () => async (dispatch) => {
  await dispatch({
    type: "CLEAR_SEARCH",
  });
};
