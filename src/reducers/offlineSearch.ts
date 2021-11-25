type ActionProps = {
  type: "SET_SEARCH" | "CLEAR_SEARCH";
  payload?: {
    name: string;
  };
};

const initialState = {
  name: "",
};

export const offlineSearchReducer = (
  state = initialState,
  action: ActionProps
) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...initialState, ...action.payload };
    case "CLEAR_SEARCH":
      return initialState;
    default:
      return state;
  }
};
