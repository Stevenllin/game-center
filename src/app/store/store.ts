import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
// import rootSaga from './rootSaga';

/** Create Middleware */
const reduxSagaMiddleware = createSagaMiddleware();
const appReduxMiddlewares = applyMiddleware(reduxSagaMiddleware);

let rootMiddleware;

rootMiddleware = appReduxMiddlewares;

/** Create store */
const store = createStore(rootReducer, rootMiddleware);

/** Run saga */
// reduxSagaMiddleware.run(rootSaga);

export default store;
