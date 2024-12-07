const TodoNew = (props) => {
  console.log("Check point: ", props);
  const { addNewTodo } = props;
  //   addNewTodo("eric");

  const handleClick = () => {
    alert("Click me");
  };

  const handleOnChange = (name) => {
    console.log("Change me ", name);
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(event) => handleOnChange(event.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default TodoNew;
