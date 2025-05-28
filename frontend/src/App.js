import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await axios.get('https://acm-backend-4t8o.onrender.com/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (inputText) {
      const response = await axios.post('https://acm-backend-4t8o.onrender.com/todos', { text: inputText });
      setTodos([...todos, response.data]);
      setInputText('');
    }
  };

  const toggleDone = async (id, done) => {
    const response = await axios.put(`https://acm-backend-4t8o.onrender.com/todos/${id}`, { done: !done });
    setTodos(todos.map(todo =>
      todo._id === id ? response.data : todo
    ));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://acm-backend-4t8o.onrender.com/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">My Todo List</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter todo..."
            />
            <button className="btn btn-primary" onClick={addTodo}>
              Add
            </button>
          </div>

          <ul className="list-group">
            {todos.map(todo => (
              <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleDone(todo._id, todo.done)}
                    className="form-check-input me-2"
                  />
                  <span className={todo.done ? 'text-decoration-line-through ms-2' : 'ms-2'}>
                    {todo.text}
                  </span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;