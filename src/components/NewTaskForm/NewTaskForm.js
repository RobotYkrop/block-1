import './NewTaskForm.css';
import React from 'react';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  valueTask = (e) => {
    this.setState({
      label: e.target.value.replace(/^[ \t]+$/gm, ''),
    });
  };

  setTime = (e) => {
    let value = e.target.value;
    value = value.replace(/^[ \t]+$/gm, '');
    this.setState({
      [e.target.name]: value,
    });

    if (value <= 0) {
      this.setState({
        [e.target.name]: (value = 0),
      });
    } else if (value >= 60) {
      this.setState({
        [e.target.name]: (value = 60),
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length > 0) {
      this.props.addTask(this.state.label, this.state.seconds, this.state.minutes);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    return (
      <div className="new-todo-block">
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo-form__task"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.valueTask}
            value={this.state.label}
          />
        </form>
        <form className="new-todo-block__timer">
          <input
            className="new-todo-form__timer"
            type="number"
            min={0}
            max={60}
            name="seconds"
            value={this.state.seconds}
            onChange={this.setTime}
            placeholder="Min"
          />
          <input
            className="new-todo-form__timer"
            type="number"
            min={0}
            max={60}
            name="minutes"
            value={this.state.minutes}
            onChange={this.setTime}
            placeholder="Sec"
          />
        </form>
      </div>
    );
  }
}
