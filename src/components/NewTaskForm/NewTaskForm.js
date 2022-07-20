import React, { useContext, useState } from 'react';

import { Context } from '../TodoContext/Context';
import './NewTaskForm.css';

const NewTaskForm = () => {
  const { addTask } = useContext(Context);

  const [label, setLabel] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const valueTask = (e) => {
    setLabel(e.target.value.replace(/^[ \t]+$/gm, ''));
  };

  const setSecondsTime = (e) => {
    let value = e.target.value.replace(/^[ \t]+$/gm, '');
    setSeconds(value);
    if (value <= 0) {
      setSeconds((value = 0));
    } else if (value >= 60) {
      setSeconds((value = 60));
    }
  };

  const setMinutesTime = (e) => {
    let value = e.target.value.replace(/^[ \t]+$/gm, '');
    setMinutes(value);
    if (value <= 0) {
      setMinutes((value = 0));
    } else if (value >= 60) {
      setMinutes((value = 60));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.length > 0) {
      addTask(label, seconds, minutes);
      setLabel('');
      setSeconds('');
      setMinutes('');
    }
  };
  return (
    <div className="new-todo-block">
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo-form__task"
          placeholder="What needs to be done?"
          onChange={valueTask}
          value={label}
        />
      </form>
      <form className="new-todo-block__timer">
        <input
          className="new-todo-form__timer"
          type="number"
          min={0}
          max={60}
          value={seconds}
          onChange={setSecondsTime}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min={0}
          max={60}
          value={minutes}
          onChange={setMinutesTime}
          placeholder="Sec"
        />
      </form>
    </div>
  );
};
NewTaskForm.defaultProps = {
  seconds: 0,
  minutes: 0,
};
export default NewTaskForm;
