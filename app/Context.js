const weekDays = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

const months = [
  'january',
  'fabruary',
  'march',
  'april',
  'may',
  'june',
  'july',
  'augest',
  'suptember',
  'october',
  'november',
  'december',
]

// this will take care of all the action
const ACTIONS = {
  SHOW_INITIAL_DATE_ON_RENDER: 'DO_INITIAL_RENDER_WITH_FETCHED_DATA',
  MOVE_FORWARD_WITH_MONTH: 'MOVE_FORWARD_WITH_MONTH',
  MOVE_BACKWARD_WITH_MONTH: 'MOVE_BACKWARD_WITH_MONTH',
  SHOW_CURRUNT_EVENT_DATA: 'SHOW_CURRUNT_EVENT_DATA',
}

// this is the reducer it is responsible for all of the actions that goes into this app, like updating and stuff
const reducer = (state, action) => {
 
  // the below object will hold currunt date and from that we are going to increase and decrease the month
  const myDate = new Date();
  switch(action.type) {

      
    case 'DO_INITIAL_RENDER_WITH_FETCHED_DATA':
       return {
        ...state,
        wordCampEventData: action.wordCampEventData
       }
    case 'MOVE_FORWARD_WITH_MONTH': 
      return {
        ...state,
        curruntMonth: state.curruntMonth === 'december' ? 'january' : state.months[state.months.indexOf(state.curruntMonth) + 1],
        curruntYear: state.curruntMonth === 'december' ? state.curruntYear + 1 : state.curruntYear,
        curruntMonthTotalDay: new Date(parseInt(state.curruntYear, 10), 
        parseInt(state.months.indexOf(state.curruntMonth), 10) + 2, 0).getDate(), 
        firstDayOfFirstDate: new Date(parseInt(state.curruntYear, 10), 
        parseInt(state.months.indexOf(state.curruntMonth), 10) + 1, 1).getDay(),
        lastDateOfPreMonth: new Date(parseInt(state.curruntYear, 10), 
        parseInt(state.months.indexOf(state.curruntMonth), 10) + 1, 0).getDate(),
        lastDayOfCurruntMonth: new Date(parseInt(state.curruntYear, 10), 
        parseInt(state.months.indexOf(state.curruntMonth), 10) + 2, 0).getDay()
      }
      case 'MOVE_BACKWARD_WITH_MONTH':
      return{
          ...state,
          curruntMonth: state.curruntMonth === 'january' ? 'december' : state.months[state.months.indexOf(state.curruntMonth) - 1],
          curruntYear: state.curruntMonth === 'january' ? state.curruntYear - 1 : state.curruntYear,
          curruntMonthTotalDay: new Date(parseInt(state.curruntYear, 10), 
          parseInt(state.months.indexOf(state.curruntMonth), 10), 0).getDate(), 
          firstDayOfFirstDate: new Date(parseInt(state.curruntYear, 10), 
          parseInt(state.months.indexOf(state.curruntMonth), 10) - 1, 1).getDay(),
          lastDateOfPreMonth: new Date(parseInt(state.curruntYear, 10), 
          parseInt(state.months.indexOf(state.curruntMonth), 10) - 1, 0).getDate(),  
          lastDayOfCurruntMonth: new Date(parseInt(state.curruntYear, 10), 
          parseInt(state.months.indexOf(state.curruntMonth), 10), 0).getDay(),
      }
      case 'SHOW_CURRUNT_EVENT_DATA': 
        return {
          ...state,
          clickedDateEventData: action.payLoad
        }
      default :
        return {
          ...state
        }
  }
}

const currutnDateObject = new Date();
const state = {

  curruntProperty: 'this is currunt property',
  reducer,
  ACTIONS,
  weekDays,
  months,
  curruntDate: currutnDateObject.getDate(),
  curruntMonth: months[currutnDateObject.getMonth()],
  curruntMonthTotalDay: new Date(currutnDateObject.getFullYear(), currutnDateObject.getMonth() + 1, 0).getDate(),
  curruntYear: currutnDateObject.getFullYear(),
  firstDayOfFirstDate: new Date(currutnDateObject.getFullYear(), currutnDateObject.getMonth(), 1).getDay(),
  lastDateOfPreMonth: new Date(currutnDateObject.getFullYear(), currutnDateObject.getMonth(), 0).getDate(),
  lastDayOfCurruntMonth: new Date(currutnDateObject.getFullYear(), currutnDateObject.getMonth() + 1, 0).getDay(),
  wordCampEventData: [],
  curruntEpochTime: currutnDateObject.getTime() / 1000, // it's gonna give time in seconds instead of miliseconds,
  todayYear: currutnDateObject.getFullYear(),
  todayMonth: currutnDateObject.getMonth(),
  todayDate: currutnDateObject.getDate(),
  clickedDateEventData: undefined
}

export default state;


