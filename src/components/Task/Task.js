import { formatDistanceToNow } from 'date-fns';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import './Task.css';
import { Context } from '../TodoContext/Context';

const Task = () => {
  const { deleteTask, onEdit, completedTask, completed, editing, time } = useContext(Context);
  const [label, setLabel] = useState({
    // label: this.props.label,
  });
  const [seconds, setSeconds] = useState({
    // seconds: this.props.seconds,
  });
  const [minutes, setMinutes] = useState({
    // minutes: this.props.minutes,
  });
  const [timing, setTiming] = useState({
    timing: 0,
  });

  const convertToSeconds = (minutes, seconds) => {
    return seconds + minutes * 60;
  };

  const startTimer = () => {
    setTiming(() => {
      return { timing: setInterval(countDown, 1000) };
    });
  };

  const countDown = () => {
    let c_seconds = convertToSeconds(minutes, seconds);

    if (c_seconds) {
      seconds ? setSeconds({ seconds: seconds - 1 }) : setSeconds({ seconds: 59 });

      if (c_seconds % 60 === 0 && minutes) {
        setMinutes({ minutes: minutes - 1 });
      }
    } else {
      clearInterval(timing);
    }
    let data = JSON.parse(localStorage.getItem('task'));
    if (label.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          minutes,
          seconds,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };

  const stopInputTimer = () => {
    completedTask();
    clearInterval(timing);
  };

  const stopButtonTimer = () => {
    clearInterval(timing);
  };

  const resetTimer = () => {
    setMinutes({
      minutes: 0,
    });
    setSeconds({
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

  const onChange = (e) => {
    setLabel(() => {
      return {
        label: e.target.value,
      };
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    onEdit();
    let data = JSON.parse(localStorage.getItem('task'));
    if (label.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          label: label,
          editing: false,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };

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
        <input className="toggle" type="checkbox" onChange={stopInputTimer} />
        <div className="label">
          <span className="description">{label}</span>
          <div className="timer">
            <button className="icon icon-play" onClick={startTimer} />
            <button className="icon icon-pause" onClick={stopButtonTimer} />
            <button className="icon icon-reset" onClick={resetTimer} />
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
      <form onSubmit={formSubmit}>
        <input type="text" className="edit" defaultValue={label} onChange={(e) => onChange(e)} />
      </form>
    );
  }
  return <div className={classing}>{elem}</div>;
};

export default Task;
