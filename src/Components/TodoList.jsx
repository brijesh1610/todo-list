import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, settodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedtodos = JSON.parse(localStorage.getItem("todos"));
    if (storedtodos) {
      settodos(storedtodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodos = () => {
    if (inputValue.trim() !== "") {
      if (editIndex !== null) {
        const updatedtodos = [...todos];
        updatedtodos[editIndex] = inputValue;
        settodos(updatedtodos);
        setEditIndex(null);
      } else {
        settodos([...todos, inputValue]);
      }
      setInputValue("");
    }
  };

  const removeTodos = (index) => {
    const updatedtodos = todos.filter((_, i) => i !== index);
    settodos(updatedtodos);
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const editTodos = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <div>
        <input
          className="task-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={addTodos}>
          {editIndex !== null ? "Edit " : "Add "}
        </button>
      </div>
      <ul className="task-list">
        {todos.map((task, index) => (
          <li key={index} className="task-item">
            {index === editIndex ? (
              <input
                className="edit-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              task
            )}
            {index === editIndex ? (
              <button className="edit-save-button" onClick={() => addTodos()}>
                Save
              </button>
            ) : (
              <>
                <button onClick={() => editTodos(index)}>Edit</button>
                <button onClick={() => removeTodos(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
