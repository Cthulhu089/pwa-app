import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const configureStore = (preloadedState?: {}) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  let persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
