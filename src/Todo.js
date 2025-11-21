import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Todo.css";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index]);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex] = editText;
    setTasks(updated);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        <AnimatePresence>
          {tasks.map((t, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="list-item"
            >
              {editingIndex === index ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="save" onClick={saveEdit}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{t}</span>
                  <div>
                    <button className="edit" onClick={() => startEdit(index)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => deleteTask(index)}>
                      X
                    </button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
