import { useState } from "react";

interface ColumnType {
  column1: string[];
  column2: string[];
}
{
  columns:[]
}

const App = () => {
  const [columns, setColumns] = useState<ColumnType | any>({
    column1: ["Item1", "Item2"],
    column2: ["Item3", "Item9",],
    column3: ["Item4", "Item5", "Item6"],
  });

  console.log("Keys==>> ", Object.keys(columns));

  const onDragStart = (event: any, item: any, fromColumn: any) => {
    event.dataTransfer.setData("item", item);
    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  const onDrop = (event: any, toColumn: any) => {
    const item = event.dataTransfer.getData("item");
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;

    setColumns((prev: any) => {
      const fromData = prev[fromColumn].filter((older: any) => older !== item);
      const toData = [...prev[toColumn], item];
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData,
      };
    });
  };

  const onDragOver = (e: any) => e.preventDefault();

  return (
    <div className="container">
      {Object.keys(columns).map((column, index) => {
        return (
          <div
            className="column"
            key={index}
            onDrop={(event) => onDrop(event, column)}
            onDragOver={(event) => onDragOver(event)}
          >
            {columns[column].map((item: any) => {
              return (
                <div
                  className="item"
                  onDragStart={(event) => onDragStart(event, item, column)}
                  draggable
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
