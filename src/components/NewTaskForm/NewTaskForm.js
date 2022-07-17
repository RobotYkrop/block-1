import React, { useContext, useState } from 'react';

import { Context } from '../TodoContext/Context';
import './NewTaskForm.css';

const NewTaskForm = () => {
  const { addTask } = useContext(Context);

  const [label, setLabel] = useState('');
  const [seconds, setSeconds] = useState('');
  const [minutes, setMinutes] = useState('');

  const valueTask = (e) => {
    setLabel({
      label: e.target.value.replace(/^[ \t]+$/gm, ''),
    });
  };

  const setTime = (e) => {
    let value = e.target.value;
    value = value.replace(/^[ \t]+$/gm, '');
    this.setSeconds({
      seconds: value,
    });
    this.setMinutes({
      minutes: value,
    });
    if (value <= 0) {
      setSeconds({
        seconds: (value = 0),
      });
      setMinutes({
        minutes: (value = 0),
      });
    } else if (value >= 60) {
      setSeconds({
        seconds: (value = 60),
      });
      setMinutes({
        minutes: (value = 60),
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.length > 0) {
      addTask(label, seconds, minutes);
      setLabel({
        label: '',
      });
      setSeconds({
        seconds: '',
      });
      setMinutes({
        minutes: '',
      });
    }
  };
  return (
    <div className="new-todo-block">
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo-form__task"
          placeholder="What needs to be done?"
          autoFocus
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
          name="seconds"
          value={seconds}
          onChange={setTime}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min={0}
          max={60}
          name="minutes"
          value={minutes}
          onChange={setTime}
          placeholder="Sec"
        />
      </form>
    </div>
  );
};

export default NewTaskForm;
