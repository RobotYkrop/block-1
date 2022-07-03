import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import classNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  render() {
    const { label, deleteTask, completedTask, onEdit, completed, editing, time } = this.props;

    // Не понимаю, что делать, не понимаю как отредактировать запись

    const onChange = (e) => {
      console.log(e.target.value);
      this.setState({
        label: e.target.value,
      });
    };

    const formSubmit = (e) => {
      e.preventDefault();
      this.setState({ label });
    };

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
            <span className="description">{label}</span>
            <span className="created">created {date} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={deleteTask} />
        </div>
      );
    } else {
      elem = (
        <form onSubmit={formSubmit}>
          <input type="text" className="edit" defaultValue={label} onChange={onChange} />
        </form>
      );
    }

    return <div className={classing}>{elem}</div>;
  }
}
