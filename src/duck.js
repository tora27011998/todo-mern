import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { createReducer, createAction, callApi } from './dorothy/utils';
import {
  addTodoActionHandler,
  completedActionHandler,
  deleteTodoActionHandler,
} from './components/duck';

/* FETCH STATE TODOS */
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';

function* requestTodos() {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}api/todos`);
    yield put(createAction(FETCH_TODOS_RESPONSE, response));
  } catch (error) {
    yield put(createAction(FETCH_TODOS_ERROR, error));
  }
}

function* watchTodosRequest() {
  yield takeLatest(FETCH_TODOS_REQUEST, requestTodos);
}

const initTodos = null;
const todosActionHandler = {
  [FETCH_TODOS_RESPONSE]: (state, action) => {
    return action.payload;
  },
  [FETCH_TODOS_ERROR]: state => {
    // log error
    return state;
  },
  ...addTodoActionHandler,
  ...completedActionHandler,
  ...deleteTodoActionHandler,
};

export const todosReducer = createReducer(initTodos, todosActionHandler);
export const todosSaga = [fork(watchTodosRequest)];
