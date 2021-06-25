import React from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { useEffect } from 'react';

const Calendar = ({ initialState, dispatch }) => {

  const {
    ACTIONS,
    weekDays,
    months,
    curruntDate,
    curruntMonth,
    curruntYear,
    curruntMonthTotalDay,
    firstDayOfFirstDate,
    lastDateOfPreMonth,
    lastDayOfCurruntMonth,
    wordCampEventData,
    curruntEpochTime,
    todayYear,
    todayMonth,
    todayDate,
  } = initialState;

  // this funciton will run only when the componetn renders inititaly
  useEffect(() => {

    try {
      const fetchEvents = async () => {
        let response = await fetch('https://central.wordcamp.org/wp-json/wp/v2/wordcamps?per_page=100');
        response = await response.json();
        dispatch({ type: ACTIONS.SHOW_INITIAL_DATE_ON_RENDER, wordCampEventData: response });
      }


      fetchEvents();
    } catch (e) {
      console.log(e);
    }

  }, [])

  // this will array hold all the dates of currunt, some dates of pre and post month
  const dateArr = [];

  // filling array with preMonth date arr
  const preMonthDateArr = [];
  let lastDateOfPreMonthT = lastDateOfPreMonth;
  for (let i = 0; i < firstDayOfFirstDate; i++) {

    dateArr.unshift({
      wordCampEventExists: false,
      dateOfEvent: null,
      dateNumber: lastDateOfPreMonthT,
      eventData: null,
      curruntDate,
      curruntMonth: months[months.indexOf(curruntMonth) - 1],
      curruntYear,
    });
    lastDateOfPreMonthT--;
  }


  // filling array with dates
  for (let i = 0; i < curruntMonthTotalDay; i++) {
    for (let j = 0; j < wordCampEventData.length; j++) {
      let myDate1 = new Date(parseInt(wordCampEventData[j]["Start Date (YYYY-mm-dd)"]) * 1000);
      // it means the date has an event 
      if (
        parseInt(myDate1.getFullYear()) === parseInt(curruntYear) &&
        months[parseInt(myDate1.getMonth())] === curruntMonth &&
        parseInt(myDate1.getDate()) === i + 1
      ) {
        dateArr.push({
          wordCampEventExists: true,
          eventEpochTime: wordCampEventData[j]["Start Date (YYYY-mm-dd)"],
          dateNumber: i + 1,
          eventData: wordCampEventData[j],
          curruntDate,
          curruntMonth,
          curruntYear,
        })
        break;
      } else {
        if (j === wordCampEventData.length - 1) {
          dateArr.push({
            wordCampEventExists: false,
            eventEpochTime: null,
            dateNumber: i + 1,
            eventData: null,
            curruntDate,
            curruntMonth,
            curruntYear,
          });
        }
      }
    }
  }

  // filling arry with postMont date arr
  for (let i = 1; i < 7 - lastDayOfCurruntMonth; i++) {

    dateArr.push({
      wordCampEventExists: false,
      dateOfEvent: null,
      dateNumber: i,
      eventData: null,
      curruntDate,
      curruntMonth: months[months.indexOf(curruntMonth) + 1],
      curruntYear,
    }
    );

  }

  // event handlers
  const moveForward = () => {

    dispatch({ type: ACTIONS.MOVE_FORWARD_WITH_MONTH });
  }
  const moveBackward = () => {

    dispatch({ type: ACTIONS.MOVE_BACKWARD_WITH_MONTH });
  }

  const showMapsAndStuff = (eventData) => {

    dispatch({ type: ACTIONS.SHOW_CURRUNT_EVENT_DATA, payLoad: eventData });
  }


  return (
    <div className="calendar">

      <div className="month">
        <FaChevronCircleLeft onClick={moveBackward} data-testid="backwardMonthBtn" className="fas fa-angle-left prev" />
        <div className="date">
          <h1 data-testid="initialCurruntMonth">{curruntMonth}</h1>
          <p data-testid="initialCurruntYear">{curruntYear}</p>
        </div>
        <FaChevronCircleRight onClick={moveForward} data-testid="forwardMonthBtn" className="fas fa-angle-right next" />
      </div>

      <div className="weekdays">
        {weekDays.map((element, index) => {
          return (
            <div key={index} >{element}</div>
          );
        })}
      </div>

      <div className="days">
        {dateArr.map((element, index) => {

          if (element.wordCampEventExists &&
            parseInt(element.eventEpochTime, 10) > parseInt(curruntEpochTime, 10)) {
            return (
              <div onClick={() => {
                showMapsAndStuff(element.eventData)
              }} key={index} className="next-date futureWordCampEvent">{element.dateNumber}</div>
            )
          } else if (element.wordCampEventExists &&
            parseInt(element.eventEpochTime, 10) < parseInt(curruntEpochTime, 10)) {
            return (
              <div onClick={() => {
                showMapsAndStuff(element.eventData)
              }} key={index} className="next-date pastWordCampEvent">{element.dateNumber}</div>
            )
          } else if (parseInt(element.curruntYear) === parseInt(todayYear)
            && parseInt(months.indexOf(element.curruntMonth)) === parseInt(todayMonth)
            && parseInt(element.dateNumber) === parseInt(todayDate)) {
            return (
              <div onClick={() => {
                showMapsAndStuff(element.eventData)
              }} key={index} className="next-date todaysDate">{element.dateNumber}</div>
            )
          } else {
            return (
              <div onClick={() => {
                showMapsAndStuff(element.eventData)
              }} key={index} className="next-date noEvent">{element.dateNumber}</div>
            )
          }
        })}

      </div>
    </div>

  )
}

export default Calendar;