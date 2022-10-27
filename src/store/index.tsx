import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import mySaga from "./sagas";

import { api } from "../services/api";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ...reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, sagaMiddleware]),
});

sagaMiddleware.run(mySaga);
