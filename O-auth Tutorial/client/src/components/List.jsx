import React, { useState } from "react";

const List = () => {
  const [checkList, setCheckList] = useState([
    {
      name: "list1",
      checked: false,
    },
    {
      name: "list2",
      checked: false,
    },
    {
      name: "list3",
      checked: false,
    },
  ]);

  const [buttonList, setButtonList] = useState([
    {
      name: "button1",
    },
    {
      name: "button2",
    },
    {
      name: "button3",
    },
  ]);

  // Handle checkbox click to toggle checked state
  const handleCheckBoxChange = (idx) => {
    const updatedCheckList = checkList.map((item, index) =>
      index === idx
        ? { ...item, checked: !item.checked }
        : { ...item }
    );
    setCheckList(updatedCheckList);
  };

  // Handle the swapping of checked items with buttonList
  const handleSwap = () => {
    const updatedCheckList = [...checkList];
    const updatedButtonList = [...buttonList];

    // Loop through checkList to check which items are checked
    updatedCheckList.forEach((item, idx) => {
      if (item.checked) {
        // Swap the item with the corresponding item in buttonList
        const temp = updatedCheckList[idx];
        updatedCheckList[idx] = updatedButtonList[idx];
        updatedButtonList[idx] = temp;
      }
    });

    // Update state after swap
    setCheckList(updatedCheckList);
    setButtonList(updatedButtonList);
  };

  return (
    <div>
      <h1>List Swapping</h1>

      <div>
        <h2>CheckBox Listing</h2>
        {checkList.map((item, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckBoxChange(idx)}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div>
        <h2>Button Listing</h2>
        {buttonList.map((item, idx) => (
          <div key={idx}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};

export default List;
