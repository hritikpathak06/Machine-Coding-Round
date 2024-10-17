import React from "react";
import { TaskData } from "../data/sample_data";

interface DragDropProps {
  data: TaskData;
}

const DragDrop: React.FC<DragDropProps> = ({ data }) => {
  console.log("Data ==========>>>> ", data);
  return (
    <div>
      <h2>Todo</h2>
      {Object.keys(data).map((container) => (
        <h1>{container}</h1>
      ))}

    </div>
  );
};

export default DragDrop;
