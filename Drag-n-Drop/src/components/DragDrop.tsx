import React, { useState } from "react";

const DragDrop = () => {
  const [data, setData] = useState({
    Pending: ["Item1", "Item2", "Item3"],
    Completed: ["ItemA", "ItemB", "ItemC"],
  });

  const onDragStart = (e: React.DragEvent, item: string, column: string, index: number) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("column", column);
    e.dataTransfer.setData("index", index.toString()); // Store the item's index
  };

  const onDrop = (e: React.DragEvent, toColumn: string) => {
    const item = e.dataTransfer.getData("item");
    const fromColumn = e.dataTransfer.getData("column");
    const fromIndex = parseInt(e.dataTransfer.getData("index"));

    const targetIndex = parseInt(e.target.getAttribute("data-index") || "-1" as any);

    setData((prev: any) => {
      // Reorder within the same column
      if (fromColumn === toColumn) {
        const columnData = [...prev[toColumn]];
        const [removedItem] = columnData.splice(fromIndex, 1); // Remove the item from its original position
        columnData.splice(targetIndex, 0, removedItem); // Insert it at the new position
        return { ...prev, [toColumn]: columnData };
      }

      // Move between columns
      const fromData = prev[fromColumn].filter((existingItem: string) => existingItem !== item);
      const toData = [...prev[toColumn], item];
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData,
      };
    });
  };

  return (
    <>
      <h1>Drag And Drop</h1>
      <div className="container" style={{ display: "flex", gap: "1rem" }}>
        {Object.entries(data).map(([column, items]: any, index) => (
          <div
            className="column"
            key={index}
            onDrop={(e) => onDrop(e, column)}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "1px solid #000",
              padding: "1rem",
              width: "200px",
              minHeight: "200px",
            }}
          >
            <h2>{column}</h2>
            {items.map((item: string, idx: number) => (
              <div
                className="item"
                key={idx}
                data-index={idx} // Pass the item's index for reordering
                onDragStart={(e) => onDragStart(e, item, column, idx)}
                draggable
                style={{
                  margin: "0.5rem 0",
                  padding: "0.5rem",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  cursor: "grab",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DragDrop;
