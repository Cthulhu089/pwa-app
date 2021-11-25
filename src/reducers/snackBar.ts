import { SnackBarProps } from "../utils/types/SnackBarTypes";

type ActionProps = {
  type: "SHOW_SNACKBAR" | "HIDE_SNACKBAR";
  payload?: SnackBarProps;
};

const initialState: SnackBarProps = {
  message: "",
  type: "",
  open: false,
  yesLabel: "",
  closeOnClick: true,
};

export const SnackBarReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return { ...initialState, ...action.payload };
    case "HIDE_SNACKBAR":
      return initialState;
    default:
      return state;
  }
};
