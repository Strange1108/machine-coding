import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1 className="todo-title">To-Do List</h1>

        {/* Add Task */}
        <div className="todo-input-row">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Enter a new task"
            className="todo-input"
          />
          <button onClick={handleAddTask} className="btn-primary">
            Add
          </button>
        </div>

        {/* Filter Tasks */}
        <div className="todo-filters">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`filter-btn ${filter === "incomplete" ? "active" : ""}`}
          >
            Incomplete
          </button>
        </div>

        {/* Task List */}
        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="todo-item">
              <span
                className={`todo-text ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
              <div className="todo-actions">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`btn-sm btn-toggle ${
                    task.completed ? "completed" : ""
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn-sm btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

