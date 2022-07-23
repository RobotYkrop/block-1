import './Footer.css';
import PropTypes from 'prop-types';

import TasksFiter from '../TasksFilter/TasksFiter';

const Footer = ({ totalTask, filter, onChangeFilter, clearTask }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{totalTask} tasks left</span>
      <TasksFiter filter={filter} onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={() => clearTask()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  totalTask: 0,
};

Footer.propTypes = {
  totalTask: PropTypes.number,
};

export default Footer;
