import React, { useRef, useEffect, useState } from "react";

const SignatureCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("black");

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "signature.png";
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = 400;
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signature Drawing App</h1>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <br />
      <button onClick={() => setColor("red")}>red</button>
      <button onClick={() => setColor("blue")}>blue</button>
      <button onClick={() => setColor("green")}>green</button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={saveCanvas}>Save</button>
    </div>
  );
};

const SignaturePad = () => {
  return (
    <div className="App">
      <SignatureCanvas />
    </div>
  );
};

export default SignaturePad;
