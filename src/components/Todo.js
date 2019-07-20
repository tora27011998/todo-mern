/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import store from '../store';
import { COMPLETED_TODO_REQUEST, DELETE_TODO_REQUEST } from './duck';

const Div = styled.div`
  text-decoration: ${props => props.isCompleted && 'line-through'};

  > button {
    border: none;
    background: none;
    outline: none;
  }
`;

export default ({ todo }) => (
  <Div isCompleted={todo.isCompleted}>
    <input
      type="checkbox"
      checked={todo.isCompleted}
      onChange={() =>
        store.dispatch({ type: COMPLETED_TODO_REQUEST, payload: { todoId: todo._id } })
      }
    />
    <span>{todo.text}</span>{' '}
    <button
      type="button"
      onClick={() => store.dispatch({ type: DELETE_TODO_REQUEST, payload: { todoId: todo._id } })}
    >
      X
    </button>
  </Div>
);
