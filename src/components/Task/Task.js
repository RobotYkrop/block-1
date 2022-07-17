import { formatDistanceToNow } from 'date-fns';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import './Task.css';
import { Context } from '../TodoContext/Context';

const Task = ({ label, seconds, minutes, time }) => {
  const { deleteTask, onEdit, completedTask, completed, editing } = useContext(Context);
  const [lab, setLabel] = useState(label);
  const [sec, setSeconds] = useState(seconds);
  const [min, setMinutes] = useState(minutes);
  // const [tim, setTime] = useState(time);
  const [timing, setTiming] = useState(0);

  const convertToSeconds = (minutes, seconds) => {
    return seconds + minutes * 60;
  };

  const startTimer = () => {
    setTiming(() => {
      return setTiming(setInterval(countDown, 1000));
    });
  };

  const countDown = () => {
    let c_seconds = convertToSeconds(min, sec);

    if (c_seconds) {
      sec ? setSeconds(seconds - 1) : setSeconds(59);

      if (c_seconds % 60 === 0 && minutes) {
        setMinutes(minutes - 1);
      }
    } else {
      clearInterval(timing);
    }
    let data = JSON.parse(localStorage.getItem('task'));
    if (lab.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          min,
          sec,
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
    setMinutes(0);
    setSeconds(0);
    let data = JSON.parse(localStorage.getItem('task'));
    data = data.map((value) => {
      return {
        ...value,
        min: 0,
        sec: 0,
      };
    });
    localStorage.setItem('task', JSON.stringify(data));
  };

  const onChange = (e) => {
    setLabel(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    onEdit();
    let data = JSON.parse(localStorage.getItem('task'));
    if (lab.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          lab: label,
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
          <span className="description">{lab}</span>
          <div className="timer">
            <button className="icon icon-play" onClick={startTimer} />
            <button className="icon icon-pause" onClick={stopButtonTimer} />
            <button className="icon icon-reset" onClick={resetTimer} />
            <span>
              {min}:{sec}
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
        <input type="text" className="edit" defaultValue={lab} onChange={(e) => onChange(e)} />
      </form>
    );
  }
  return <div className={classing}>{elem}</div>;
};

export default Task;
