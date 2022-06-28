import './TasksFilter.css';
import React from 'react';

export default class TasksFiter extends React.Component {
  constructor() {
    super();
    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ];
  }

  render() {
    const { filter, onChangeFilter } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : '';
      return (
        <li key={name} className={clazz} onClick={() => onChangeFilter(name)}>
          <button>{label}</button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
