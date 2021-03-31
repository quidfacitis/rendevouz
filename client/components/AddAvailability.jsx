import React, { Component } from 'react';

class AddAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHour: null,
      exampleInput: '',
      recurring: false
    };
    this.exampleInputHandler = this.exampleInputHandler.bind(this);
    this.frequencyHandler = this.frequencyHandler.bind(this);
  }

  exampleInputHandler(e) {
    const exampleInput = e.target.value;
    this.setState({
      exampleInput
    });
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

  render() {
    const { topHour, exampleInput, recurring } = this.state;
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
          <form onSubmit={(e) => submitAvailabilityHandler(e, exampleInput, recurring, weekDayCode)} className="add-availability-form">
            <label htmlFor="example-input">Example input</label>
            <input onChange={this.exampleInputHandler} id="example-input" type="text" />
            <input type="radio" name="frequency" value="set" id="radio-button-set" onChange={this.frequencyHandler}/>
            <label htmlFor="radio-button-set">Only on {weekDay}, {monthName} {selectedDay} </label>
            <input type="radio" name="frequency" value="recurring" id="radio-button-recurring" onChange={this.frequencyHandler}/>
            <label htmlFor="radio-button-recuring">Every {weekDay}</label>
            <input type="submit" value="Save" />
          </form>
        </div>
        <button onClick={closeAddAvailability}>Close</button>
      </div>
    );
  }
}

export default AddAvailability;