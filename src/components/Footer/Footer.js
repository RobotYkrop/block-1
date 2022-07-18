import './Footer.css';
import { useContext } from 'react';

import TasksFiter from '../TasksFilter/TasksFiter';
import { Context } from '../TodoContext/Context';

const Footer = () => {
  const { totalTask, clearTask } = useContext(Context);
  return (
    <footer className="footer">
      <span className="todo-count">{totalTask} tasks left</span>
      <TasksFiter />
      <button className="clear-completed" onClick={clearTask}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
