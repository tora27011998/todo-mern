import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { dataReducer as data, dataSagas } from './duck';

const rootReducer = combineReducers({
  data,
});

export const rootSaga = function* rootSaga() {
  yield all([...dataSagas]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
