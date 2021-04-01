import React from 'react';

const Day = ({ openAddAvailability, day, startingCalendarDate, selectedYear, selectedMonth, setTimes, recurringTimes }) => {
  const date = `${selectedYear}-${selectedMonth}-${day}`;
  const hours = [];
  if (setTimes[date]) {
    setTimes[date].forEach((time) => {
      hours.push((
        <div className="day-time-slot">{time[0]}-{time[1]}</div>
      ));
    })
  }

  const thisDate = new Date(selectedYear, selectedMonth, day);
  const weekDayCode = thisDate.getDay();
  if (recurringTimes[weekDayCode]) {
    if (recurringTimes[weekDayCode].startDate <= thisDate) {
      recurringTimes[weekDayCode].data.forEach((time) => {
        hours.push((
          <div className="day-time-slot">{time[0]}-{time[1]}</div>
        ));
      });
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