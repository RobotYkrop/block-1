import React, { useContext } from 'react';

import './TasksFilter.css';
import { Context } from '../TodoContext/Context';

export const Actions = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const TasksFilter = () => {
  const { filters, onChangeFilter } = useContext(Context);
  let buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const Buttons = buttons.map(({ name, label }) => {
    filters === Actions;
    return (
      <li key={name} onClick={() => onChangeFilter(name)}>
        <button>{label}</button>
      </li>
    );
  });
  return <ul className="filters">{Buttons}</ul>;
};

export default TasksFilter;
