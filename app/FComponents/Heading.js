import React from 'react';

const Heading = () => {

  return (
    <>
      <h1 data-testid="main-heading" className="heading">WordCamp Events</h1>
      <p data-testid="main-paragraph" className="noteAboutDate"> <span className="greenBox"></span> Green represents future events, &nbsp;
        <span className="redBox"></span> Red past events, &nbsp;
        <span className="blueBox"></span> and Blue today's date</p>
    </>
  )
}

export default Heading;