import { useState } from "react";

const arr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "*",
  "/",
  "+",
  "-",
  "(",
  ")",
  "C", // Add "C" for clearing the input
  "=",
  ".",
];

const Calculator = () => {
  const [value, setValue] = useState("");

  const handleButtonClick = (val: string) => {
    if (val === "C") {
      // Clear the input
      setValue("");
    } else if (val === "=") {
      // Evaluate the expression
      try {
        setValue(eval(value).toString());
      } catch (error) {
        alert("Invalid Expression");
        setValue("");
      }
    } else {
      // Append the clicked value to the input
      setValue(value + val);
    }
  };

  const handleSubmit = () => {
    console.log("Final Value: ", value);
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <form action="">
        <input type="text" value={value} readOnly />
      </form>
      <div className="calculator_container">
        {arr.map((item, index) => (
          <button key={index} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Calculator;
