// import { Button, Grid2, Input } from "@mui/material";
// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import TodoData from "./TodoData";

// const Todo = () => {
// //   const [todos, setTodos] = useState<TodoProps[] | []>([]);
// const [todos,setTodos] = useState<any>([
//     {
//         id:1,
//         title:"Hello Bhai",
//         status:"pending"
//     },
//     {
//         id:2,
//         title:"Hello Ritik",
//         status:"done"
//     },
//     {
//         id:3,
//         title:"Hello Shobit",
//         status:"pending"
//     },
//     {
//         id:4,
//         title:"Hello Kartik",
//         status:"pending"
//     }
// ])
//   const [todo, setTodo] = useState<string>("");

//   //   Todo Handler
//   const addTodoHandler = async () => {
//     if (todo.trim() == "") {
//       alert("Please add some todo");
//     }
//     const newTodo: TodoProps = {
//       id: uuidv4(),
//       title: todo,
//       isCompleted: false,
//     };
//     const updateTodos = [...todos, newTodo];
//     setTodos(updateTodos);
//     // localStorage.setItem("todos", JSON.stringify(updateTodos));
//     setTodo("");
//   };

// //   useEffect(() => {
// //     const savedTodos = localStorage.getItem("todos");
// //     if (savedTodos) {
// //       setTodos(JSON.parse(savedTodos));
// //     }
// //   }, []);

//   return (
//     <>
//       <Grid2>
//         <Grid2
//           container
//           spacing={5}
//           display={"flex"}
//           alignItems={"center"}
//           justifyContent={"center"}
//           height={"10vh"}
//         >
//           <h1>Todo List</h1>
//         </Grid2>
//         <Grid2
//           height={"10vh"}
//           display={"flex"}
//           alignItems={"center"}
//           justifyContent={"center"}
//           gap={"10px"}
//         >
//           <Input
//             placeholder="Enter Your Todo"
//             value={todo}
//             onChange={(e) => setTodo(e.target.value)}
//           />
//           <Button children="Add" variant="contained" onClick={addTodoHandler} />
//         </Grid2>

//         <Grid2 display={"flex"} flexDirection={["column", "row"]} gap={"20px"}>
//           <Grid2 minHeight={"80vh"} width={["100%", "100%"]}>
//             <h1 style={{ textAlign: "center" }} className="task_heading">
//               Initial Task
//             </h1>
//             {todos.map((todo: any) => (
//               <>
//                 <TodoData data={todo} tasks={todos} setTasks={setTodos}/>
//               </>
//             ))}
//           </Grid2>

//         </Grid2>
//       </Grid2>
//     </>
//   );
// };

// export default Todo;

import { Button, Grid2 as Grid, Input } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const Todo = () => {
  const [todos, setTodos] = useState<any>([
    {
      id: 1,
      title: "Hello Bhai",
      status: "pending",
    },
    {
      id: 2,
      title: "Hello Ritik",
      status: "done",
    },
    {
      id: 3,
      title: "Hello Shobit",
      status: "pending",
    },
    {
      id: 4,
      title: "Hello Kartik",
      status: "pending",
    },
  ]);
  const [todo, setTodo] = useState<string>("");

  // Handler to add a new todo
  const addTodoHandler = () => {
    if (todo.trim() === "") {
      alert("Please add a todo");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title: todo,
      status: "pending", // New todos start as pending
    };
    const updateTodos = [...todos, newTodo];
    setTodos(updateTodos);
    setTodo("");
  };

  // Drag-and-drop handlers
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

    setTodos((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task.id.toString() === taskId ? { ...task, status } : task
      )
    );
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow dropping
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
      >
        <h1>Todo List</h1>

        <Grid
          container
          spacing={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
          style={{ marginBottom: "20px" }}
        >
          <Input
            placeholder="Enter Your Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button variant="contained" onClick={addTodoHandler}>
            Add
          </Button>
        </Grid>

        <Grid container spacing={2} display={"flex"} gap={"20px"}>
          <Grid item xs={5}>
            <h2>Pending Tasks</h2>
            <div
              onDragOver={onDragOverHandler}
              onDrop={(e) => onDropHandler(e, "pending")}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                minHeight: "200px",
              }}
            >
              {todos
                .filter((task: any) => task.status === "pending")
                .map((task: any) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleOnDragStart(e, task.id)}
                    onDragEnd={(e) => handleOnDragEnd(e, task.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      cursor: "grab",
                    }}
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </Grid>

          <Grid item xs={5}>
            <h2>In Progress Tasks</h2>
            <div
              onDragOver={onDragOverHandler}
              onDrop={(e) => onDropHandler(e, "progress")}
              style={{
                backgroundColor: "#e0ffe0",
                padding: "10px",
                minHeight: "200px",
              }}
            >
              {todos
                .filter((task: any) => task.status === "progress")
                .map((task: any) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleOnDragStart(e, task.id)}
                    onDragEnd={(e) => handleOnDragEnd(e, task.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      cursor: "grab",
                    }}
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </Grid>

          <Grid item xs={5}>
            <h2>Completed Tasks</h2>
            <div
              onDragOver={onDragOverHandler}
              onDrop={(e) => onDropHandler(e, "done")}
              style={{
                backgroundColor: "#e0ffe0",
                padding: "10px",
                minHeight: "200px",
              }}
            >
              {todos
                .filter((task: any) => task.status === "done")
                .map((task: any) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleOnDragStart(e, task.id)}
                    onDragEnd={(e) => handleOnDragEnd(e, task.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      cursor: "grab",
                    }}
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Todo;
