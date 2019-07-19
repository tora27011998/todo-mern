import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { FETCH_DATA_REQUEST } from './duck';

const App = ({ data, dispatch }) => {
  useEffect(() => {
    dispatch({ type: FETCH_DATA_REQUEST });
  }, []);

  return (
    <div>
      {
        todos.map((todo, index) => <Todo key={index} todo={todo} />)
      }
    </div>
  );
};

export default connect(state => ({
  data: state.data,
}))(App);
