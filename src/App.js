import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FETCH_TODOS_REQUEST } from './duck';
import Todo from './components/Todo';
import NewTodo from './components/NewTodo';

const App = ({ todos, dispatch }) => {
  useEffect(() => {
    dispatch({ type: FETCH_TODOS_REQUEST });
  }, []);

  return (
    <div>
      <NewTodo />
      {todos && todos.map((todo, index) => <Todo key={index.toString()} todo={todo} />)}
    </div>
  );
};

export default connect(state => ({
  todos: state.todos,
}))(App);
