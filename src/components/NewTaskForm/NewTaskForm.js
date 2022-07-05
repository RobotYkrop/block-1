import './NewTaskForm.css';
import React from 'react';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  valueTask = (e) => {
    this.setState({
      label: e.target.value.replace(/^[ \t]+$/gm, ''),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length > 0) {
      this.props.addTask(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.valueTask}
          value={this.state.label}
        />
      </form>
    );
  }
}
