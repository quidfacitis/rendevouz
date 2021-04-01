import React, { Fragment, Component } from 'react';
import { Icon } from "@iconify/react";
import chevronLeft from '@iconify-icons/mdi/chevron-left';
import chevronRight from '@iconify-icons/mdi/chevron-right';
import Day from './Day.jsx';
import AddAvailability from './AddAvailability.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: null,
      currentMonth: null,
      currentDay: null,
      selectedYear: null,
      selectedMonth: null,
      selectedDay: null,
      addAvailabilityOpen: false,
      setTimes: {},
      recurringTimes: {}
    };
    this.previousMonthHandler = this.previousMonthHandler.bind(this);
    this.nextMonthHandler = this.nextMonthHandler.bind(this);
    this.openAddAvailability = this.openAddAvailability.bind(this);
    this.closeAddAvailability = this.closeAddAvailability.bind(this);
    this.submitAvailabilityHandler = this.submitAvailabilityHandler.bind(this);
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

  openAddAvailability(selectedYear, selectedMonth, selectedDay) {
    this.setState({
      addAvailabilityOpen: true,
      selectedYear,
      selectedMonth,
      selectedDay
    });
  }

  closeAddAvailability() {
    this.setState({
      addAvailabilityOpen: false
    });
  }

  submitAvailabilityHandler(e, formData, recurring, weekDayCode) {
    e.preventDefault();
    const { selectedYear, selectedMonth, selectedDay, setTimes, recurringTimes } = this.state;
    const date = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    const startDate = new Date(selectedYear, selectedMonth, selectedDay);

    // add formData to selectedDay in state --> pass that information down to each day --> display the information for a given day if it has information to display
    if (!recurring) {
      setTimes[date] = formData;
    } else {
      recurringTimes[weekDayCode] = {
        startDate,
        data: formData
      };
    }

    this.setState({
      addAvailabilityOpen: false,
      setTimes: setTimes
    });
  }

  render() {
    const { selectedYear, selectedMonth, selectedDay, addAvailabilityOpen, setTimes, recurringTimes } = this.state;

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
          <Day
            key={i}
            openAddAvailability={this.openAddAvailability}
            day={i + 1}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            startingCalendarDate={startingCalendarDate}
            setTimes={setTimes}
            recurringTimes={recurringTimes}
          />
        ));
      }
    }

    return (
      <Fragment>
          {addAvailabilityOpen &&
            <AddAvailability
              closeAddAvailability={this.closeAddAvailability}
              submitAvailabilityHandler={this.submitAvailabilityHandler}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedDay={selectedDay}
            />
          }
          <div className="calendar-container">
            <div className="month-container">
              <span className="left-calendar-arrow" onClick={this.previousMonthHandler}><Icon icon={chevronLeft}/></span>
              {monthNames[selectedMonth]} {selectedYear}
              <span className="right-calendar-arrow" onClick={this.nextMonthHandler}><Icon icon={chevronRight} /></span>
            </div>
            <div className="day-of-the-week-container">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            {selectedMonth !== null && <div className="day-container">{days}</div>}
          </div>
      </Fragment>
    );
  }
}

export default Calendar;