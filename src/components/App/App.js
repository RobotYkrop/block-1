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

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('task')) || [];
    setItems(state);
  }, []);

  const createTask = (label, minutes, seconds) => {
    return {
      label,
      id: uuid(),
      time: Date.now(),
      minutes,
      seconds,
      completed: false,
    };
  };

  const addTask = (label, minutes, seconds) => {
    const newTask = createTask(label, minutes, seconds);
    const newArr = [...items, newTask];
    localStorage.setItem('task', JSON.stringify(newArr));
    setItems(newArr);
  };

  const deleteTask = (id) => {
    const idx = items.findIndex((el) => el.id === id);
    const [...copyItems] = items;
    copyItems.splice(idx, 1);
    localStorage.setItem('task', JSON.stringify(copyItems));
    setItems(copyItems);
  };

  const onChangeFilter = (filter) => {
    setFilter(filter);
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
    localStorage.setItem('task', JSON.stringify(item));
    setItems(item);
  };

  const completeTodo = (id) => {
    let updatedTodos = items.map((todo) => {
      localStorage.getItem('task', JSON.stringify(todo));
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem('task', JSON.stringify([todo]));
      return todo;
    });
    setItems(updatedTodos);
  };

  const totalTask = items.length - items.filter((el) => el.completed).length;

  const visibleItems = filterTask(items, filters);

  const onEdit = (id) => {
    setItems((items) => {
      const idx = items.findIndex((el) => el.id === id);
      const old = items[idx];
      const newArr = { ...old, editing: !old.editing };
      return [...items.slice(0, idx), newArr, ...items.slice(idx + 1)];
    });
  };

  const ContextTodo = {
    deleteTask,
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
    emptyTask = <TaskList completeTodo={completeTodo} onEdit={onEdit} />;
  }
  return (
    <Context.Provider value={ContextTodo}>
      <div>
        <section className="todoapp">
          <header className="header">
            <AppHeader />
            <NewTaskForm />
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
