import React, { useState, useRef } from "react";

const ResizablePanel = () => {
  const [width, setWidth] = useState(300);
  const isResizing = useRef(false);

  const handleMouseDown = (e: any) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: any) => {
    if (!isResizing.current) return;
    setWidth((prevWidth) => Math.max(200, prevWidth + e.movementX));
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Resizable Panel */}
      <div
        // ref={panelRef}
        style={{
          width: `${width}px`,
          background: "#f4f4f4",
          padding: "20px",
          borderRight: "3px solid #ddd",
          overflow: "auto",
        }}
      >
        <h3>Resizable Panel</h3>
        <p>Drag the border to resize this panel.</p>
      </div>

      {/* Resizer */}
      <div
        style={{
          width: "8px",
          cursor: "col-resize",
          background: "#ddd",
          position: "relative",
        }}
        onMouseDown={handleMouseDown}
      ></div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Main Content</h2>
        <p>This area adjusts dynamically as the panel is resized.</p>
      </div>
    </div>
  );
};

export default ResizablePanel;
