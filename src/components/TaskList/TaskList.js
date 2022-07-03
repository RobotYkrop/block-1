import './TaskList.css';
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

export default class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }
  static defaultProps = {
    onEdit: () => {},
    deleteTask: () => {},
    completedTask: () => {},
  };
  static propTypes = {
    onEdit: PropTypes.func,
    deleteTask: PropTypes.func,
    completedTask: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  render() {
    const { items, onEdit, Edit, deleteTask, completedTask, addTask } = this.props;

    const el = items.map((item) => {
      const { id, ...label } = item;

      return (
        <li key={id} className="todo-list-item">
          <Task
            {...label}
            deleteTask={() => deleteTask(id)}
            completedTask={() => completedTask(id)}
            onEdit={() => onEdit(id)}
            Edit={() => Edit(id)}
            addTask={addTask}
          />
        </li>
      );
    });
    return <ul className="todo-list">{el}</ul>;
  }
}
