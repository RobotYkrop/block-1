import './App.css';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import AppHeader from '../AppHeader/AppHeader';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';
import { Context } from '../TodoContext/Context';

const App = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilter] = useState('all');

  const toggleProperty = (arr, id, prop) => {
    const idx = arr.findIndex((el) => el.id === id);
    const old = arr[idx];

    const newArr = { ...old, [prop]: !old[prop] };

    return [...arr.slice(0, idx), newArr, ...arr.slice(idx + 1)];
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('task')) || [];
    setItems(state);
  }, []);

  const createTask = (label, minutes, seconds) => {
    return {
      label,
      id: uuid(),
      time: Date.now(),
      timing: {},
      minutes,
      seconds,
    };
  };

  const addTask = (label, minutes, seconds) => {
    const newTask = createTask(label, minutes, seconds);
    setItems((items) => {
      const newArr = [...items, newTask];
      localStorage.setItem('task', JSON.stringify(newArr));
      return {
        items: newArr,
      };
    });
  };

  const deleteTask = (id) => {
    setItems((items) => {
      const idx = items.findIndex((el) => el.id === id);

      const [...copyItems] = items;

      copyItems.splice(idx, 1);
      localStorage.setItem('task', JSON.stringify(copyItems));
      return {
        items: copyItems,
      };
    });
  };

  const onEdit = (id) => {
    setItems((items) => {
      const idx = items.findIndex((el) => el.id === id);
      const old = items[idx];
      const newArr = { ...old, editing: !old.editing };
      const arr = [...items.slice(0, idx), newArr, ...items.slice(idx + 1)];
      return {
        items: arr,
      };
    });
  };

  const onChangeFilter = (filter) => {
    setFilter(filter);
  };

  const completedTask = (id) => {
    setItems((items) => {
      return {
        items: toggleProperty(items, id, 'completed'),
      };
    });
  };

  const filterTask = (items, filter) => {
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
  };

  const clearTask = () => {
    const item = items.filter((i) => !i.completed);
    localStorage.setItem('task', JSON.stringify(items));
    setItems(item);
  };

  const totalTask = items.length - items.filter((el) => el.completed).length;

  const visibleItems = filterTask(items, filters);

  const ContextTodo = {
    deleteTask,
    completedTask,
    onEdit,
    createTask,
    addTask,
    visibleItems,
    totalTask,
    filters,
    onChangeFilter,
    clearTask,
  };

  let emptyTask;

  if (items.length === 0) {
    emptyTask = <p className="emptyTask">Задач нет</p>;
  } else {
    emptyTask = <TaskList />;
  }
  return (
    <Context.Provider value={ContextTodo}>
      <div>
        <section className="todoapp">
          <header className="header">
            <AppHeader />
            <NewTaskForm addTask={addTask} />
          </header>
          <section className="main">
            {emptyTask}
            <Footer />
          </section>
        </section>
      </div>
    </Context.Provider>
  );
};

export default App;
