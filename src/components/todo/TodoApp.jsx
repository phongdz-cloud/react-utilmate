import { useState } from "react";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import reactLogo from "../../assets/react.svg";

const TodoApp = () => {
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
  );
};

export default TodoApp;
