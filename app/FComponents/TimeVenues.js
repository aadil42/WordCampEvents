import React from 'react';

const TimeVenues = ({ initialState, dispatch }) => {

  const {
    clickedDateEventData
  } = initialState;

  const eventYear = clickedDateEventData ? new Date(parseInt(clickedDateEventData["Start Date (YYYY-mm-dd)"]) * 1000).getFullYear() : undefined;
  const eventMonth = clickedDateEventData ? new Date(parseInt(clickedDateEventData["Start Date (YYYY-mm-dd)"]) * 1000).getMonth() + 1 : undefined;
  const eventDate = clickedDateEventData ? new Date(parseInt(clickedDateEventData["Start Date (YYYY-mm-dd)"]) * 1000).getDate() : undefined;
  let eventHour = clickedDateEventData ? new Date(parseInt(clickedDateEventData["Start Date (YYYY-mm-dd)"]) * 1000).getHours() : undefined;
  // converting 24 base to am pm 
  let amOrPm = 'AM';
  if (eventHour > 12) {
    eventHour = eventHour % 12;
    amOrPm = 'PM'
  }
  const eventMinute = clickedDateEventData ? new Date(parseInt(clickedDateEventData["Start Date (YYYY-mm-dd)"]) * 1000).getMinutes() : undefined;
  const eventAddress = clickedDateEventData ? clickedDateEventData['Host region'] : undefined;
  let discription = clickedDateEventData ? clickedDateEventData.content.rendered : undefined;
  const eventLink = clickedDateEventData ? clickedDateEventData.URL : undefined;

  if (clickedDateEventData) {
    return (
      <div className="TimeAndVenues">
        <div className="dateAndVenues">
          <span className="curruntEventDate">
            {eventDate}-
            {eventMonth}-
            {eventYear}
          </span>
          <span className="curruntEventTime">
            {eventHour}:
            {eventMinute} {amOrPm}</span>
          <a href={eventLink} target="_blank"><span className="curruntEventAddresss" >{eventAddress}</span></a>


          <span className="eventDiscription" dangerouslySetInnerHTML={{ __html: discription }}>

          </span>
        </div>
        {/* <div className="googleMap"></div> */}
      </div>
    );
  } else {
    return (
      <h1 className="noEventNotice">no evetn exists at this date</h1>
      // <div id="map">
      //       <Map />
      // </div>
      // <div className="googleMap"><GoogleApiWrapper /></div>
    )
  }

}

export default TimeVenues;