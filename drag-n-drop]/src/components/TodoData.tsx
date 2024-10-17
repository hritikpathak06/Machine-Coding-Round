import { Grid2} from "@mui/material";
import React from "react";

const TodoData = ({ data, tasks, setTasks }: any) => {
  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    console.log("Start Drag===>>> ", e, id);
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    console.log("Drag END===>>> ", e, id);
    e.dataTransfer.clearData();
  };

  const onDropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    status: string
  ) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("text/plain");
    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent the default behavior to allow drop
    e.preventDefault();
  };

  return (
    <>
      <Grid2 display={"flex"} gap={"10px"}>
        {/* Pending Tasks Section */}
        <Grid2
          container
          bgcolor={"blue"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          marginTop={"20px"}
          width={"80%"}
        >
          {data.status === "pending" && (
            <div
              draggable
              onDragStart={(e) => handleOnDragStart(e, data.id)}
              onDragEnd={(e) => handleOnDragEnd(e, data.id)}
            >
              <h1 style={{ textAlign: "center" }}>{data.title}</h1>
            </div>
          )}
        </Grid2>

        {/* Completed Tasks Section */}
        <Grid2 minHeight={"10vh"} width={["100%", "50%"]}>
          <div
            onDragOver={onDragOverHandler} // Allow dropping by preventing default behavior
            onDrop={(e) => onDropHandler(e, "done")} // Handle the drop and move the task
          >
            {data.status === "done" && (
              <div>
                <h1>{data.title}</h1>
              </div>
            )}
          </div>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TodoData;
