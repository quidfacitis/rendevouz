import React, { Component } from 'react';
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon } from '@iconify/react';
import closeIcon from '@iconify-icons/mdi/close';
import AvailabilitySelector from './AvailabilitySelector.jsx';

class AddAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recurring: false,
      hours: [],
      availabilitySelectorCount: 1
    };
    this.frequencyHandler = this.frequencyHandler.bind(this);
    this.addAvailabilityHandler = this.addAvailabilityHandler.bind(this);
    this.incrementAvailabilitySelectors = this.incrementAvailabilitySelectors.bind(this);
  }

  frequencyHandler(e) {
    const { value } = e.target;
    if (value === 'set') {
      this.setState({
        recurring: false
      });
    } else {
      this.setState({
        recurring: true
      });
    }
  }

  addAvailabilityHandler(e, startTime) {
    const endTime = e.target.value;
    const { hours } = this.state;
    this.setState({
      hours: [...hours, [startTime, endTime]]
    });
  }

  incrementAvailabilitySelectors() {
    const { availabilitySelectorCount } = this.state;
    this.setState({
      availabilitySelectorCount: availabilitySelectorCount + 1
    });
  }

  render() {
    const { exampleInput, recurring, availabilitySelectorCount, hours } = this.state;
    const { closeAddAvailability, submitAvailabilityHandler, selectedYear, selectedMonth, selectedDay } = this.props;

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesay', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(selectedYear, selectedMonth, selectedDay);
    const weekDayCode = date.getDay();
    const weekDay = weekDays[weekDayCode];
    const monthName = monthNames[selectedMonth];

    return (
      <div className="add-availability-container">
        <div className="add-availability-form-container">
          <form onSubmit={(e) => submitAvailabilityHandler(e, hours, recurring, weekDayCode)} className="add-availability-form">
            <span className="close-availability-form" onClick={closeAddAvailability}><Icon icon={closeIcon} /></span>
            <h2 className="availability-form-title">Set your availability</h2>
            <h3>Block 1</h3>
            <AvailabilitySelector addAvailabilityHandler={this.addAvailabilityHandler} />
            <h3>Block 2</h3>
            <AvailabilitySelector addAvailabilityHandler={this.addAvailabilityHandler} />
            <h3>Block 3</h3>
            <AvailabilitySelector addAvailabilityHandler={this.addAvailabilityHandler} />
            <div className="top-availability-form-radio-button">
              <input type="radio" name="frequency" value="set" id="radio-button-set" onChange={this.frequencyHandler}/>
              <label htmlFor="radio-button-set">Only on {weekDay}, {monthName} {selectedDay} </label>
            </div>
            <div className="bottom-availability-form-radio-button">
              <input type="radio" name="frequency" value="recurring" id="radio-button-recurring" onChange={this.frequencyHandler}/>
              <label htmlFor="radio-button-recuring">Every {weekDay}</label>
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddAvailability;