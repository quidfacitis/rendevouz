import React from 'react';

const Day = ({ date, startingCalendarDate }) => (
  <div className="individual-day-container" style={{gridColumn: date === 1 && startingCalendarDate.getDay() + 1}}>
    <div className="individual-day-date">{date}</div>
  </div>
);

export default Day;