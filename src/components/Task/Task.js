import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames';

import './Task.css';
import { Context } from '../TodoContext/Context';

const Task = ({ label, time, completeTodo, seconds, minutes, completed, onEdit, editing }) => {
  const { deleteTask } = useContext(Context);
  const [edit, setEdit] = useState(label);
  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);
  const [[m, s], setTime] = useState([minutes, seconds]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  const setStorageTime = () => {
    let data = JSON.parse(localStorage.getItem('task'));
    if (edit.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          minutes: m,
          seconds: s,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };
  const tick = () => {
    if (paused || over) return;
    if (m === 0 && s === 0) {
      setOver(true);
      setTime([60, 60]);
    } else if (s == 0) {
      setTime([m - 1, 60]);
    } else {
      setTime([m, s - 1]);
    }
    setStorageTime();
  };
  const reset = () => {
    setTime([parseInt(minutes), parseInt(seconds)]);
    setPaused(true);
    setStorageTime();
  };

  const onChange = (e) => {
    setEdit(e.target.value);
  };

  // Не могу понять, на сколько это правильно

  const escFunction = useCallback((e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      onEdit();
      let data = JSON.parse(localStorage.getItem('task'));
      if (label.length > 0) {
        data = data.map((value) => {
          return { ...value, label: edit };
        });
      }
      localStorage.setItem('task', JSON.stringify(data));
    }
  });

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
        <input className="toggle" type="checkbox" onChange={completeTodo} checked={completed} />
        <div className="label">
          <span className="description">{edit}</span>
          <div className="timer">
            {paused ? (
              <button className="icon icon-play" onClick={() => setPaused(!paused)} />
            ) : (
              <button className="icon icon-pause" onClick={() => setPaused(!paused)} />
            )}
            <button className="icon icon-reset" onClick={() => reset()} />
            <p>{over ? '00:00' : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
          </div>
          <span className="created">created {date} ago</span>
        </div>
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={deleteTask} />
      </li>
    );
  } else {
    elem = (
      <form onKeyDown={escFunction}>
        <input type="text" className="edit" autoFocus defaultValue={edit} onChange={(e) => onChange(e)} />
      </form>
    );
  }
  return <ul className={classing}>{elem}</ul>;
};
Task.defaultProps = {
  seconds: 0,
  minutes: 0,
};
export default Task;
