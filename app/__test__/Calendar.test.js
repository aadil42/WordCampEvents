import React from 'react';
import { render, cleanup } from '@testing-library/react';
import state from '../Context';

// import state from '../Context';

import Calendar from '../FComponents/Calendar';

afterEach(cleanup);

test("initial month and year are correct", () => {


  const myDate = new Date();
  const Component = render(<Calendar initialState={state} />);

  const curruntMonth = Component.getByTestId('initialCurruntMonth');
  const curruntYear = Component.getByTestId('initialCurruntYear');

  expect(curruntMonth.textContent).toBe(state.months[myDate.getMonth()]);
  expect(parseInt(curruntYear.textContent)).toBe(myDate.getFullYear());
});

test("total days of initial month are correct", () => {

  const myDate = new Date();
  const Component = render(<Calendar initialState={state} />);

  const totalDays = new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0).getDate();

  expect(state.curruntMonthTotalDay).toBe(totalDays);
});




