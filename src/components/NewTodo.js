import React, { useState } from 'react';
import store from '../store';
import { ADD_TODO_REQUEST } from './duck';

export default () => {
  const [value, setValue] = useState('');

  const onSubmitHandler = event => {
    event.preventDefault();
    store.dispatch({
      type: ADD_TODO_REQUEST,
      payload: { text: value },
    });
    setValue('');
  };

  return (
    <form onSubmit={event => onSubmitHandler(event)}>
      <input
        type="text"
        placeholder="add to do .."
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
