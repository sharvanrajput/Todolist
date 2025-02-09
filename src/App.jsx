import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks && savedTasks.length > 0) setTasks(savedTasks);
  }, []);

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const addTask = () => {
    if (input.trim() === "") return;
    const newTasks = [...tasks, { text: input, completed: false }];
    setTasks(newTasks);
    updateLocalStorage(newTasks);
    setInput("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const delTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    delTask(index); // Deletes from state and updates local storage
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="todo-container">
        <h2>To-Do List</h2>
        <div className="todo-input">
          <input
            type="text"
            value={input}
            onChange={inputChange}
            placeholder="Add a new task..."
          />
          <button className="btn btn-success" onClick={addTask}>
            Save
          </button>
        </div>
        <ul id="taskList">
          {tasks.map((item, index) => (
            <li key={index}>
              <span>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  className="me-3"
                />
                <span className={item.completed ? "text-decoration-line-through" : ""}>
                  {item.text}
                </span>
              </span>
              <span>
                <button className="btn btn-danger" onClick={() => delTask(index)}>
                  del
                </button>
                <button className="btn btn-warning" onClick={() => editTask(index)}>
                  edit
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
