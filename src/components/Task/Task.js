import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import classNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      seconds: this.props.seconds,
      minutes: this.props.minutes,
      timing: 0,
    };
  }

  convertToSeconds = (minutes, seconds) => {
    return seconds + minutes * 60;
  };

  startTimer = () => {
    this.setState({ timing: setInterval(this.countDown, 1000) });
  };

  countDown = () => {
    const { minutes, seconds, timing } = this.state;
    let c_seconds = this.convertToSeconds(minutes, seconds);

    if (c_seconds) {
      seconds ? this.setState({ seconds: seconds - 1 }) : this.setState({ seconds: 59 });

      if (c_seconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }
    } else {
      clearInterval(timing);
    }
    let data = JSON.parse(localStorage.getItem('task'));
    if (this.state.label.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          minutes: this.state.minutes,
          seconds: this.state.seconds,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };

  stopTimer = () => {
    clearInterval(this.state.timing);
  };

  resetTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
    });
    let data = JSON.parse(localStorage.getItem('task'));
    data = data.map((value) => {
      return {
        ...value,
        minutes: 0,
        seconds: 0,
      };
    });
    localStorage.setItem('task', JSON.stringify(data));
  };

  onChange = (e) => {
    this.setState(() => {
      return {
        label: e.target.value,
      };
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit();
    let data = JSON.parse(localStorage.getItem('task'));
    if (this.state.label.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          label: this.state.label,
          editing: false,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };

  render() {
    const { deleteTask, completedTask, onEdit, completed, editing, time } = this.props;

    const { label, minutes, seconds } = this.state;

    const currentTime = Date.now();

    const date = formatDistanceToNow(time, currentTime);
    let classing = classNames({
      ' completed': completed,
      ' editing': editing,
    });
    let elem;
    if (!editing) {
      elem = (
        <div className="view">
          <input className="toggle" type="checkbox" onChange={completedTask} />
          <div className="label">
            <span className="description">{label}</span>
            <div className="timer">
              <button className="icon icon-play" onClick={this.startTimer} />
              <button className="icon icon-pause" onClick={this.stopTimer} />
              <button className="icon icon-reset" onClick={this.resetTimer} />
              <span>
                {minutes}:{seconds}
              </span>
            </div>
            <span className="created">created {date} ago</span>
          </div>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={deleteTask} />
        </div>
      );
    } else {
      elem = (
        <form onSubmit={this.formSubmit}>
          <input type="text" className="edit" defaultValue={this.state.label} onChange={(e) => this.onChange(e)} />
        </form>
      );
    }

    return <div className={classing}>{elem}</div>;
  }
}
