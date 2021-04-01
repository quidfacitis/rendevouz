import React, { Component } from 'react';

const hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];

class AvailabilitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimeIndex: null
    };
    this.updateStartTime = this.updateStartTime.bind(this);
  }

  updateStartTime(e) {
    const startTime = e.target.value;
    console.log('START TIME VALUE: ', startTime);
    const startTimeIndex = hours.indexOf(startTime);
    this.setState({
      startTimeIndex
    }, () => {
      console.log('START TIME INDEX: ', startTimeIndex);
    });
  }

  render() {

    const { addAvailabilityHandler } = this.props;
    const { startTimeIndex, startTime } = this.state;

    const startTimeOptions = [];
    hours.forEach((hour) => {
      startTimeOptions.push((
        <option value={hour}>{hour}</option>
      ));
    });

    const endTimeOptions = [];
    if (startTimeIndex === null) {
      hours.forEach((hour) => {
        endTimeOptions.push((
          <option value={hour}>{hour}</option>
        ));
      });
    } else {
      for (let i = startTimeIndex + 1; i < hours.length; i += 1) {
        endTimeOptions.push((
          <option value={hours[i]}>{hours[i]}</option>
        ));
      }
    }

    return (
      <div className="availability-selector-container">
        <select onChange={this.updateStartTime} defaultValue="start-time">
          <option value="start-time" disabled>Start time</option>
          {startTimeOptions.length > 0 && startTimeOptions}
        </select>
        &mdash;
        <select onChange={(e) => addAvailabilityHandler(e, hours[startTimeIndex])} defaultValue="end-time">
          <option value="end-time" disabled>End time</option>
          {endTimeOptions.length > 0 && endTimeOptions}
        </select>
      </div>
    );
  }
}

export default AvailabilitySelector;