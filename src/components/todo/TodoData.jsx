const TodoData = (props) => {
  const { todoList, deleteTodo } = props;

  return (
    <div className="todo-data">
      {todoList.map((item) => {
        return (
          <div key={item.id} className="todo-item">
            <div>{item.name}</div>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div>{JSON.stringify(todoList)}</div>
    </div>
  );
};

export default TodoData;
