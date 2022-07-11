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
    this.state = {
      items: [],
      filter: 'all',
      timer: 0,
    };
  }

  toggleProperty = (arr, id, prop) => {
    const idx = arr.findIndex((el) => el.id === id);
    const old = arr[idx];

    const newArr = { ...old, [prop]: !old[prop] };

    return [...arr.slice(0, idx), newArr, ...arr.slice(idx + 1)];
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('task')) || [];
    this.setState({ items });
  }

  createTask = (label, minutes, seconds) => {
    return {
      label,
      id: uuid(),
      time: Date.now(),
      timing: {},
      minutes,
      seconds,
    };
  };

  addTask = (label, minutes, seconds) => {
    const newTask = this.createTask(label, minutes, seconds);
    this.setState(({ items }) => {
      const newArr = [...items, newTask];
      localStorage.setItem('task', JSON.stringify(newArr));
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
      localStorage.setItem('task', JSON.stringify(copyItems));
      return {
        items: copyItems,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id);
      const old = items[idx];
      const newArr = { ...old, editing: !old.editing };
      const arr = [...items.slice(0, idx), newArr, ...items.slice(idx + 1)];
      return {
        items: arr,
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
    localStorage.setItem('task', JSON.stringify(items));
    this.setState({ items });
  };

  render() {
    const { items, filter } = this.state;

    const totalTask = items.length - items.filter((el) => el.completed).length;

    const visibleItems = this.filterTask(items, filter);
    let emptyTask;

    if (items.length === 0) {
      emptyTask = <p className="emptyTask">Задач нет</p>;
    } else {
      emptyTask = (
        <TaskList
          items={visibleItems}
          deleteTask={this.deleteTask}
          completedTask={this.completedTask}
          addTask={this.addTask}
          onEdit={this.onEdit}
          createTask={this.createTask}
        />
      );
    }
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <AppHeader />
            <NewTaskForm addTask={this.addTask} />
          </header>
          <section className="main">
            {emptyTask}
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
