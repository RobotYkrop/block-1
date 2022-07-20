import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';

import './Task.css';
import { Context } from '../TodoContext/Context';

const Task = ({ label, time, completeTodo, seconds, minutes, completed, onEdit, editing }) => {
  const { deleteTask } = useContext(Context);
  const [edit, setEdit] = useState(label);
  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);
  const [[m = 0, s = 0], setTime] = useState([minutes, seconds]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const tick = () => {
    if (paused || over) return;
    if (m === 0 && s === 0) {
      setOver(true);
      setTime([59, 59]);
    } else if (s == 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
    let data = JSON.parse(localStorage.getItem('task'));
    if (edit.length > 0) {
      data = data.map((value) => {
        return {
          ...value,
          minutes: m,
          seconds: s - 1,
        };
      });
    }
    localStorage.setItem('task', JSON.stringify(data));
  };
  const reset = () => {
    setTime([0, 0]);
    setPaused(false);
  };
  const onChange = (e) => {
    setEdit(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    onEdit();
    let data = JSON.parse(localStorage.getItem('task'));
    if (label.length > 0) {
      data = data.map((value) => {
        return { ...value, label: edit };
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
            <p>{over ? 'Times up!' : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
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
        <input type="text" className="edit" defaultValue={edit} onChange={(e) => onChange(e)} />
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
