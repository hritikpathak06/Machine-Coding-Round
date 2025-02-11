import React, { useState } from "react";

const DragDropApp = () => {
  const [elements, setElements] = useState([]); // Array to store draggable elements
  const [draggingIndex, setDraggingIndex] = useState(null); // Track the currently dragged element

  const handleAddElement = () => {
    // Add a new element to the canvas
    setElements((prev) => [
      ...prev,
      { text: "New Text", x: 50, y: 50 },
    ]);
  };

  const handleMouseDown = (index, e) => {
    // Start dragging
    setDraggingIndex(index);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null) return;

    // Update the position of the dragged element
    const updatedElements = [...elements];
    updatedElements[draggingIndex] = {
      ...updatedElements[draggingIndex],
      x: e.clientX - 50, // Adjust offset for better dragging experience
      y: e.clientY - 20,
    };
    setElements(updatedElements);
  };

  const handleMouseUp = () => {
    // Stop dragging
    setDraggingIndex(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Add New Text Button */}
      <button
        onClick={handleAddElement}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Text
      </button>

      {/* Canvas Area */}
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "2px solid black",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        {/* Render Elements */}
        {elements.map((el, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: el.y,
              left: el.x,
              padding: "5px 10px",
              backgroundColor: "lightyellow",
              border: "1px solid black",
              cursor: "grab",
              userSelect: "none",
            }}
            onMouseDown={(e) => handleMouseDown(index, e)}
          >
            {el.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropApp;
