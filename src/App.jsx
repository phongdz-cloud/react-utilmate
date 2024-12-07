import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./components/layout/ header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const [todoList, setTodos] = useState([]);

  const addNewTodo = (name) => {
    const newTodo = {
      id: generateId(),
      name,
    };
    setTodos([...todoList, newTodo]);
  };

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodos(newTodoList);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1000);
  };

  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoNew addNewTodo={addNewTodo} />

        {todoList.length === 0 ? (
          <div className="todo-image">
            <img src={reactLogo} />
          </div>
        ) : (
          <TodoData todoList={todoList} deleteTodo={deleteTodo} />
        )}
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
