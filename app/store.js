/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';
import appReducer from './reducers';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  appReducer
});

/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    sagaMiddleware,
    // loggerMiddleware
  )
);
sagaMiddleware.run(rootSaga);
