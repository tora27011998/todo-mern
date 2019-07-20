import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { todosReducer as todos, todosSaga } from './duck';
import { addTodoSaga, completedTodoSaga, deleteTodoSaga } from './components/duck';

const rootReducer = combineReducers({
  todos,
});

export const rootSaga = function* rootSaga() {
  yield all([...todosSaga, ...addTodoSaga, ...completedTodoSaga, ...deleteTodoSaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
