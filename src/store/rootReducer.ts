//TODO CONFIGURE redux typescript
import { combineReducers } from "redux";
import { SnackBarReducer } from "../reducers/snackBar";
import { pokemonReducer } from "../reducers/pokemon";
import { offlineSearchReducer } from "../reducers/offlineSearch";

export default combineReducers({
  snackBar: SnackBarReducer,
  pokemon: pokemonReducer,
  offlineSearch: offlineSearchReducer,
});
