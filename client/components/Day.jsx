import React from 'react';

const Day = ({ openAddAvailability, day, startingCalendarDate, selectedYear, selectedMonth, setTimes, recurringTimes }) => {
  const date = `${selectedYear}-${selectedMonth}-${day}`;
  const hours = [];
  if (setTimes[date]) {
    hours.push((
      <div>{setTimes[date]}</div>
    ));
  }

  const thisDate = new Date(selectedYear, selectedMonth, day);
  const weekDayCode = thisDate.getDay();
  if (recurringTimes[weekDayCode]) {
    if (recurringTimes[weekDayCode].startDate <= thisDate) {
      hours.push((
        <div>{recurringTimes[weekDayCode].data}</div>
      ));
    }
  }



  return (
    <div onClick={() => openAddAvailability(selectedYear, selectedMonth, day)} className="individual-day-container" style={{gridColumn: day === 1 && startingCalendarDate.getDay() + 1}}>
      <div className="individual-day-date">{day}</div>
      {hours.length > 0 && hours}
    </div>
  );
};

export default Day;