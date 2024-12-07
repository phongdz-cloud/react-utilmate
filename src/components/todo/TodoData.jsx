const TodoData = (props) => {
  const { name, todoList } = props;
  return (
    <div className="todo-data">
      <div>My name is {name}</div>
      <div>Learning React</div>
      <div>Watching Youtube</div>
      <div>{JSON.stringify(todoList)}</div>
    </div>
  );
};

export default TodoData;
