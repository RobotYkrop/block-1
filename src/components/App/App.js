import './App.css';
import React from 'react';
import uuid from 'react-uuid';

import AppHeader from '../AppHeader/AppHeader';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

export default class App extends React.Component {
  constructor() {
    super();
    this.maxId;
    this.state = {
      items: [],
      filter: 'all',
    };
  }

  toggleProperty = (arr, id, prop) => {
    const idx = arr.findIndex((el) => el.id === id);
    const old = arr[idx];

    const newArr = { ...old, [prop]: !old[prop] };

    return [...arr.slice(0, idx), newArr, ...arr.slice(idx + 1)];
  };

  createTask = (label) => {
    return {
      label,
      id: (this.maxId = uuid()),
      time: Date.now(),
    };
  };

  addTask = (label) => {
    const newTask = this.createTask(label);
    this.setState(({ items }) => {
      const newArr = [...items, newTask];

      return {
        items: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id);

      const [...copyItems] = items;

      copyItems.splice(idx, 1);

      return {
        items: copyItems,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'editing'),
      };
    });
  };

  onChangeFilter = (filter) => {
    this.setState({ filter });
  };

  completedTask = (id) => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'completed'),
      };
    });
  };

  filterTask(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'completed':
        return items.filter((el) => el.completed);
      case 'active':
        return items.filter((el) => !el.completed);
      default:
        return items;
    }
  }

  clearTask = () => {
    const items = this.state.items.filter((i) => !i.completed);
    this.setState({ items });
  };

  render() {
    const { items, filter, time } = this.state;

    const totalTask = items.length - items.filter((el) => el.completed).length;

    const visibleItems = this.filterTask(items, filter);

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <AppHeader />
            <NewTaskForm addTask={this.addTask} />
          </header>
          <section className="main">
            <TaskList
              time={time}
              items={visibleItems}
              deleteTask={this.deleteTask}
              completedTask={this.completedTask}
              onEdit={this.onEdit}
              offEdit={this.offEdit}
              addTask={this.addTask}
            />
            <Footer
              filter={filter}
              totalTask={totalTask}
              onChangeFilter={this.onChangeFilter}
              clearTask={this.clearTask}
            />
          </section>
        </section>
      </div>
    );
  }
}
