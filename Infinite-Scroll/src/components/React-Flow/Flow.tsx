import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ data }: any) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 5,
        backgroundColor: "#fafafa",
      }}
    >
      <strong>{data.label}</strong>
      <div style={{ marginTop: 5 }}>
        <button onClick={data.onClick}>Click Me</button>
      </div>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 0 },
  },
  { id: "2", data: { label: "Default Node" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Output Node" }, position: { x: 400, y: 100 } },
  {
    id: "node-1",
    type: "customNode",
    data: {
      label: "Custom Node",
      onClick: () => alert("Custom Node Clicked!"),
    },
    position: { x: 500, y: 10 },
  },
];

// Initial edges
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e1-node1", source: "1", target: "node-1", animated: true }, 
  { id: "node1-1", source: "node-1", target: "1", animated: true }, 
];

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        attributionPosition="top-right"
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
