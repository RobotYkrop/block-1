import './TaskList.css';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import { Context } from '../TodoContext/Context';

const TaskList = () => {
  const { visibleItems, deleteTask, completedTask, onEdit } = useContext(Context);

  const el = visibleItems.map((item) => {
    const { id, ...label } = item;
    return (
      <div key={id} className="todo-list-item">
        <Task
          {...label}
          deleteTask={() => deleteTask(id)}
          completedTask={() => completedTask(id)}
          onEdit={() => onEdit(id)}
        />
      </div>
    );
  });
  return <ul className="todo-list">{el}</ul>;
};

TaskList.defaultProps = {
  onEdit: () => {},
  deleteTask: () => {},
  completedTask: () => {},
};

TaskList.propTypes = {
  onEdit: PropTypes.func,
  deleteTask: PropTypes.func,
  completedTask: PropTypes.func,
};

export default TaskList;
