import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

export default class Task extends React.Component {
  render() {
    const { label, deleteTask, completedTask, onEdit, completed, editing, time } = this.props;

    const currentTime = Date.now();

    const date = formatDistanceToNow(time, currentTime);

    let classNames = '';

    if (completed) classNames += 'completed';
    if (editing) classNames += ' editing';
    return (
      <div className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={completedTask}>
              {label}
            </span>
            <span className="created">created {date} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={deleteTask} />
        </div>
        <input type="text" className="edit" defaultValue={this.props.label} />
      </div>
    );
  }
}
