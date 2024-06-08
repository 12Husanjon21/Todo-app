import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 123, name: "Task is done by using ChatGPT", done: false },
    { id: 321, name: "Task is done by using ChatGPT", done: false },
    { id: 777, name: "Task is done by using ChatGPT", done: false },
    { id: 911, name: "Task is done by using ChatGPT", done: false }
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addNewTask = () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: inputValue,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const task = { ...tasks[taskIndex], done: true };
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks([...completedTasks, task]);
  };

  const uncompleteTask = (id) => {
    const taskIndex = completedTasks.findIndex((task) => task.id === id);
    const task = { ...completedTasks[taskIndex], done: false };
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    setTasks([...tasks, task]);
  };

  return (
    <div className="container">
      <div className="input-wrapper">
        <input
          type="text"
          name="new-task"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={addNewTask}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="tasks-container">
        <h2>
          Tasks to do - <span className="tasks-count">{tasks.length}</span>
        </h2>
        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task.id} className="task">
              <p>{task.name}</p>
              <div className="buttons-wrapper">
                <button onClick={() => completeTask(task.id)}>
                  <span className="material-symbols-outlined">done</span>
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>
          Done - <span className="completed-tasks-count">{completedTasks.length}</span>
        </h2>
        <ul className="completed-tasks">
          {completedTasks.map((task) => (
            <li key={task.id} className="task task--completed">
              <p>{task.name}</p>
              <button onClick={() => uncompleteTask(task.id)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

