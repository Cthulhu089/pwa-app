export const setSnackBarAction = (snackBar) => async (dispatch) => {
  await dispatch({
    type: "SHOW_SNACKBAR",
    payload: snackBar,
  });
};
