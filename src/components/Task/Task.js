import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import classNames from 'classnames';

import './Task.css';

const Task = ({ label, time, completeTodo, seconds, minutes, completed, deleteTask, onEdit, editing }) => {
  // const [lab, setLabel] = useState(label);
  const [edit, setEdit] = useState('');
  // const [sec, setSeconds] = useState(seconds);
  // const [min, setMinutes] = useState(minutes);
  // const [tim, setTime] = useState(time);
  // const [timing, setTiming] = useState(0);

  // const convertToSeconds = (minutes, seconds) => {
  //   return seconds + minutes * 60;
  // };

  // const startTimer = () => {
  //   setTiming(() => {
  //     return setTiming(setInterval(countDown, 1000));
  //   });
  // };

  // const countDown = () => {
  //   let c_seconds = convertToSeconds(min, sec);

  //   if (c_seconds) {
  //     sec ? setSeconds(seconds - 1) : setSeconds(59);

  //     if (c_seconds % 60 === 0 && minutes) {
  //       setMinutes(minutes - 1);
  //     }
  //   } else {
  //     clearInterval(timing);
  //   }
  //   let data = JSON.parse(localStorage.getItem('task'));
  //   if (lab.length > 0) {
  //     data = data.map((value) => {
  //       return {
  //         ...value,
  //         min,
  //         sec,
  //       };
  //     });
  //   }
  //   localStorage.setItem('task', JSON.stringify(data));
  // };

  // const stopInputTimer = () => {
  //   completedTask();
  //   clearInterval(timing);
  // };

  // const stopButtonTimer = () => {
  //   clearInterval(timing);
  // };

  // const resetTimer = () => {
  //   setMinutes(0);
  //   setSeconds(0);
  //   let data = JSON.parse(localStorage.getItem('task'));
  //   data = data.map((value) => {
  //     return {
  //       ...value,
  //       min: 0,
  //       sec: 0,
  //     };
  //   });
  //   localStorage.setItem('task', JSON.stringify(data));
  // };

  const onChange = (e) => {
    setEdit(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    onEdit(edit);
    let data = JSON.parse(localStorage.getItem('task'));
    if (label.length > 0) {
      data = data.map((value) => {
        setEdit(edit);
        return { ...value };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };

  const currentTime = Date.now();

  const date = formatDistanceToNow(time, currentTime);

  let classing = classNames({
    completed: completed ? true : false,
    ' editing': editing,
  });
  let elem;
  if (!editing) {
    elem = (
      <li className="view">
        <input className="toggle" type="checkbox" onChange={completeTodo} />
        <div className="label">
          <span className="description">{label}</span>
          <div className="timer">
            <button className="icon icon-play" />
            <button className="icon icon-pause" />
            <button className="icon icon-reset" />
            <span>
              {minutes}:{seconds}
            </span>
          </div>
          <span className="created">created {date} ago</span>
        </div>
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={deleteTask} />
      </li>
    );
  } else {
    elem = (
      <form onSubmit={formSubmit}>
        <input type="text" className="edit" defaultValue={label} onChange={(e) => onChange(e)} />
      </form>
    );
  }
  return <ul className={classing}>{elem}</ul>;
};

export default Task;
