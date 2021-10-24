//TODO CONFIGURE redux typescript
import { combineReducers } from "redux";
import { SnackBarReducer } from "../reducers/snackBar";
import { pokemonReducer } from "../reducers/pokemon";

export default combineReducers({
  snackBar: SnackBarReducer,
  pokemon: pokemonReducer,
});
