import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      process.env.REACT_APP__REDUX_DEVTOOLS_EXTENSION__ && window.devToolsExtension !== void 0
        ? window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: false })
        : f => f
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
