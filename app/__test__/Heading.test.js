import React from 'react';
import Heading from '../FComponents/Heading';

import { render, cleanup, fireEvent } from "@testing-library/react";
// import renderer from 'react-test-renderer';

// import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("Heading Component renders correctly", () => {

  const Component = render(<Heading />);
  const HeadingH1 = Component.getByTestId("main-heading");

  expect(HeadingH1.textContent).toBe("WordCamp Events");
});

test("Paragraph renders correctly", () => {

  const Component = render(<Heading />);

  const HeadingP = Component.getByTestId("main-paragraph");

  // removing the spaces and then checking the string in the paragraph
  expect(HeadingP.textContent.replace(/\s | /g, "")).toBe("Greenrepresentsfutureevents,Redpastevents,andBluetoday'sdate");
});



