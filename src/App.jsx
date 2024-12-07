import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodos] = useState([
    {
      id: 1,
      name: "Learning react",
    },
    {
      id: 2,
      name: "Watching youtube",
    },
  ]);

  const hoidanit = "Eric";
  const age = 25;
  const data = {
    address: "Hanoi",
    country: "vietnam",
  };

  const addNewTodo = (name) => {
    const newTodo = {
      id: todoList.length + 1,
      name,
    };
    setTodos([...todoList, newTodo]);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData name={hoidanit} age={age} data={data} todoList={todoList} />

      <div className="todo-image">
        <img src={reactLogo} />
      </div>
    </div>
  );
};

export default App;
