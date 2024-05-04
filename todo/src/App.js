import logo from "./logo.svg";
import "./App.css";
import { TodoContextProvider, useTodo } from "./Context";
import { useEffect, useState } from "react";
import TodoForm from "./Component/TodoForm";
import TodoList from "./Component/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  const updateTodo = (id, todo) => {
    setTodos((pervTodo) =>
      pervTodo.map((item) => (item.id == id ? todo : item))
    );
  };
  const deleteTodo = (id) => {
    setTodos((pervTodo) => pervTodo.filter((item) => item.id != id));
  };

  const toggleCompleted = (id) => {
    setTodos((pervTodo) =>
      pervTodo.map((iteam) =>
        iteam.id == id ? { ...iteam, complete: !iteam.complete } : iteam
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm></TodoForm>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => {
              return (
                <div key={todo.id}>
                  <TodoList todo={todo}></TodoList>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
