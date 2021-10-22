import { combineReducers } from "redux";
import { swRegistrationReducer } from "../reducers/swRegistration";
import { SnackBarReducer } from "../reducers/snackBar";

export default combineReducers({
  snackBar: SnackBarReducer,
  SW: swRegistrationReducer,
});
