import { combineReducers } from "redux";
import { swRegistrationReducer } from "../reducers/swRegistration";
import { SnackBarReducer } from "../reducers/snackBar";

export default combineReducers({
  swRegistration: swRegistrationReducer,
  snackBar: SnackBarReducer,
});
