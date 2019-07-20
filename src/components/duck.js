/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "off" */

import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { createAction, callApi } from '../dorothy/utils';

/* FETCH STATE TO DO */
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_RESPONSE = 'ADD_TODO_RESPONSE';
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR';

function* requestAddTodo(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/todos/create`,
      action.payload,
    );
    yield put(createAction(ADD_TODO_RESPONSE, response));
  } catch (error) {
    yield put(createAction(ADD_TODO_ERROR, error));
  }
}

function* watchAddTodoRequest() {
  yield takeLatest(ADD_TODO_REQUEST, requestAddTodo);
}

export const addTodoActionHandler = {
  [ADD_TODO_RESPONSE]: (state, action) => {
    return [...state, action.payload];
  },
  [ADD_TODO_ERROR]: state => {
    // log error
    return state;
  },
};

export const addTodoSaga = [fork(watchAddTodoRequest)];

/* FETCH COMPLETE TO DO */
export const COMPLETED_TODO_REQUEST = 'COMPLETED_TODO_REQUEST';
export const COMPLETED_TODO_RESPONSE = 'COMPLETED_TODO_RESPONSE';
export const COMPLETED_TODO_ERROR = 'COMPLETED_TODO_ERROR';

function* requestCompletedTodo(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/todos/${action.payload.todoId}/completed`,
    );
    yield put(createAction(COMPLETED_TODO_RESPONSE, response));
  } catch (error) {
    yield put(createAction(COMPLETED_TODO_ERROR, error));
  }
}
function* watchCompletedTodoRequest() {
  yield takeLatest(COMPLETED_TODO_REQUEST, requestCompletedTodo);
}

export const completedActionHandler = {
  [COMPLETED_TODO_RESPONSE]: (state, action) => {
    state.map(todo => {
      if (todo._id === action.payload.todoId) {
        todo.isCompleted = !todo.isCompleted;
        return todo;
      }
      return todo;
    });
    return [...state];
  },
  [COMPLETED_TODO_ERROR]: state => {
    // log error
    return state;
  },
};

export const completedTodoSaga = [fork(watchCompletedTodoRequest)];

/* delete state to do */
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_RESPONSE = 'DELETE_TODO_RESPONSE';
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR';

function* requestDeleteTodo(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/todos/${action.payload.todoId}/delete`,
    );
    yield put(createAction(DELETE_TODO_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_TODO_ERROR, error));
  }
}

function* watchDeleteTodoRequest() {
  yield takeLatest(DELETE_TODO_REQUEST, requestDeleteTodo);
}

export const deleteTodoActionHandler = {
  [DELETE_TODO_RESPONSE]: (state, action) => {
    return [...state.filter(todo => todo._id !== action.payload.todoId)];
  },
  [DELETE_TODO_ERROR]: state => {
    // log error
    return state;
  },
};

export const deleteTodoSaga = [fork(watchDeleteTodoRequest)];
