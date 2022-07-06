import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import classNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
    };
  }

  onChange = (e) => {
    this.setState(() => {
      return {
        label: e.target.value,
      };
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit();
    let data = JSON.parse(localStorage.getItem('task'));
    data = data.map((value) => {
      return {
        ...value,
        label: this.state.label,
        editing: false,
      };
    });
    localStorage.setItem('task', JSON.stringify(data));
  };

  render() {
    const { deleteTask, completedTask, onEdit, completed, editing, time } = this.props;
    const currentTime = Date.now();

    const date = formatDistanceToNow(time, currentTime);
    let classing = classNames({
      ' completed': completed,
      ' editing': editing,
    });
    let elem;
    if (!editing) {
      elem = (
        <div className="view">
          <input className="toggle" type="checkbox" onChange={completedTask} />
          <label>
            <span className="description">{this.state.label}</span>
            <span className="created">created {date} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={deleteTask} />
        </div>
      );
    } else {
      elem = (
        <form onSubmit={this.formSubmit}>
          <input type="text" className="edit" defaultValue={this.state.label} onChange={(e) => this.onChange(e)} />
        </form>
      );
    }

    return <div className={classing}>{elem}</div>;
  }
}
