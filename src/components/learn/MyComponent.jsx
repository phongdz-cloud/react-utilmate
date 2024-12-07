import "./style.css";

const MyComponent = () => {
  //   const hoidanit = "eric";
  //   const hoidanit = 25;
  //   const hoidanit = true;
  //   const hoidanit = undefined;
  const hoidanit = {
    name: "hoidanit",
    age: 25,
  };
  return (
    <>
      <div>
        <h1 className="child" style={{ borderRadius: "10px" }}>
          {JSON.stringify(hoidanit)} & hoidanit
        </h1>
        <div>{console.log("ERIC")}</div>
      </div>
    </>
  );
};

export default MyComponent;
