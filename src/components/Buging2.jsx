import React, { useState } from "react";

function Buging2() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please Enter Valid Syntax");
      return;
    }

    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
          Todo App
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter your todo..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition">
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl shadow-sm"
            >
              <span className="text-gray-700">{todo}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No todos yet...</p>
        )}
      </div>
    </div>
  );
}

export default Buging2;
