import React from 'react';

import state from './Context';
import { useReducer } from 'react';

// these are FComponents 
import Heading from './FComponents/Heading';
import Calendar from './FComponents/Calendar';
import TimeVenues from './FComponents/TimeVenues';

function App() {

  const { reducer } = state;
  const [initialState, dispatch] = useReducer(reducer, state);

  return (

    <>
      <Heading />
      <div className="container">
        <Calendar initialState={initialState} dispatch={dispatch} />
        <TimeVenues initialState={initialState} dispatch={dispatch} />
      </div>
    </>
  );
}

export default App;
