import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

function configureAppStore(preloadedState) {
    const SagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware),
        preloadedState,
        enhancers: [],
    });

    if (module.hot) {
        module.hot.accept("./reducers", () => store.replaceReducer(reducers));
    }

    SagaMiddleware.run(rootSaga);

    return store;
}

const store = configureAppStore();

export const getState = store.getState;

export default store;
