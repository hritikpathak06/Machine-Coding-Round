import React, { useState } from "react";
import "../styles/DragDrop.css";

interface ColumnTypes {
  Pending: string[];
  Completed: string[];
}

const DragDrop = () => {
  const [columns, setColumns] = useState<ColumnTypes | any>({
    Pending: ["Item1", "Item2", "Item3"],
    Completed: ["ItemA", "ItemB", "ItemC"],
  });

  console.log("Columns", Object.entries(columns));

  const handleDragStart = (
    e: React.DragEvent,
    data: string,
    fromColumn: string
  ) => {
    // console.log(e,item,fromCol);
    e.dataTransfer.setData("item", data);
    e.dataTransfer.setData("fromCol", fromColumn);
  };

  const handleDragEnd = (e: React.DragEvent, toColumn: string) => {
    const item = e.dataTransfer.getData("item");
    const fromCol = e.dataTransfer.getData("fromCol");
    if (fromCol === toColumn) return;

    setColumns((prev: any) => {
      const updatedSoruce = prev[fromCol as keyof ColumnTypes].filter(
        (i: any) => item !== i
      );

      const updatedTarget = [...prev[toColumn], item];

      return {
        ...prev,
        [fromCol]: updatedSoruce,
        [toColumn]: updatedTarget,
      };
    });
  };

  return (
    <>
      <div className="drag_drop">
        {Object.entries(columns).map(([column, state], idx: number) => {
          return (
            <div
              className="drag_container"
              key={idx}
              onDrop={(e) => handleDragEnd(e, column)}
              onDragOver={(e) => e.preventDefault()}
            >
              <h1>{column}</h1>

              {state.map((data: string, index: number) => {
                return (
                  <>
                    <div
                      className=" drag_content "
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, data, column)}
                    >
                      {data}
                    </div>
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DragDrop;
