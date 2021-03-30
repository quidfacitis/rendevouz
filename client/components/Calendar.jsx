import React, { Fragment, Component } from 'react';
import Day from './Day.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: null,
      currentMonth: null,
      currentDay: null,
      selectedYear: null,
      selectedMonth: null,
      selectedDay: null
    };
    this.previousMonthHandler = this.previousMonthHandler.bind(this);
    this.nextMonthHandler = this.nextMonthHandler.bind(this);
  }
  componentDidMount() {
    const date = new Date();
    this.setState({
      currentYear: date.getFullYear(),
      selectedYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      selectedMonth: date.getMonth(),
      currentDay: date.getDate(),
      selectedDay: date.getDate()
    });
  }

  previousMonthHandler() {
    const { selectedMonth, selectedYear } = this.state;
    if (selectedMonth > 0) {
      this.setState({
        selectedMonth: selectedMonth - 1
      });
    } else {
      this.setState({
        selectedMonth: 11,
        selectedYear: selectedYear - 1
      });
    }
  }

  nextMonthHandler() {
    const { selectedMonth, selectedYear } = this.state;
    if (selectedMonth < 11) {
      this.setState({
        selectedMonth: selectedMonth + 1,
      });
    } else {
      this.setState({
        selectedMonth: 0,
        selectedYear: selectedYear + 1
      })
    }
  }

  render() {
    const { selectedYear, selectedMonth, selectedDay } = this.state;

    const daysPerMonth = {
      0: 31,
      1: 28,
      2: 31,
      3: 30,
      4: 31,
      5: 30,
      6: 31,
      7: 31,
      8: 30,
      9: 31,
      10: 30,
      11: 31
    };

    const monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // get day of week of first day of the month
    const startingCalendarDate = new Date(selectedYear, selectedMonth, 1);

    // generate number of days for current month
    let days = [];
    if (selectedMonth !== null) {
      for (let i = 0; i < daysPerMonth[selectedMonth]; i += 1) {
        days.push((
          <div className={i === 0 ? "first-day": ""} style={{gridColumn: i === 0 && startingCalendarDate.getDay() + 1}}>{i + 1}</div>
        ));
      }
    }

    return (
      <Fragment>
        <button onClick={this.previousMonthHandler}>Back</button>
          <div className="calendar-container">
            <div className="month-container">{monthNames[selectedMonth]} {selectedYear}</div>
            <div className="day-of-the-week-container">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            {selectedMonth !== null && <div className="day-container">{days}</div>}
          </div>
        <button onClick={this.nextMonthHandler}>Forward</button>
      </Fragment>
    );
  }
}

export default Calendar;