import { useState } from "react";
import data from "../../data/file.json";

const List = ({ fileData, addFolder, deleteFileFolder, addFile }: any) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (name: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="file-explorer">
      {fileData?.map((node: any) => (
        <div key={node.id}>
          <div style={{ marginTop: "10px" }}>
            {node.children && (
              <span className="icon" onClick={() => handleExpand(node.name)}>
                +
              </span>
            )}
            <span className={`${node.isFolder ? "folder" : "file"}`}>
              {node.name}
            </span>
            {node.isFolder && (
              <span>
                <img
                  className="folder-icon"
                  src="https://cdn-icons-png.flaticon.com/512/4447/4447248.png"
                  alt=""
                  onClick={() => addFile(node.id)}
                />
              </span>
            )}
            {node.isFolder && (
              <span>
                <img
                  className="folder-icon"
                  src="https://png.pngtree.com/png-vector/20190217/ourmid/pngtree-vector-folder-icon-png-image_555493.jpg"
                  alt=""
                  onClick={() => addFolder(node.id)}
                />
              </span>
            )}
            <span>
              <img
                className="folder-icon"
                src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png"
                alt=""
                onClick={() => deleteFileFolder(node.id)}
              />
            </span>
            {isExpanded[node.name] && node.children && (
              <List
                fileData={node.children}
                addFolder={addFolder}
                deleteFileFolder={deleteFileFolder}
                addFile={addFile}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const FileExplorer = () => {
  const [fileData, setFileData] = useState<any[]>(data);

  //   ADD Folder
  const addFolder = (parentId: string) => {
    const name = prompt("Enter the name of folder");

    const updateTree = (nodes: any[]): any[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: `${Date.now()}`,
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setFileData((prev) => updateTree(prev));
  };

  //   Delete Folder/File
  const deleteFileFolder = (nodeId: any) => {
    console.log("delete Id===>> ", nodeId);

    const updated_data = (nodes: any[]): any[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: node.children ? updated_data(node.children) : node.children,
        }));
    };

    setFileData((prev) => updated_data(prev));
  };

  //   ADD File
  const addFile = (parentId: string) => {
    const name = prompt("Enter the file name")?.trim();
    if (!name) return;

    const updated_data = (nodes: any[]): any[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now().toString(),
                name: name,
                isFolder: false,
              },
            ],
          };
        }

        if (node.children) {
          return { ...node, children: updated_data(node.children) };
        }

        return node;
      });
    };

    setFileData((prev: any) => updated_data(prev));
  };

  const addMainFolder = () => {
    const name = prompt("Enter The Folder Name: ")?.trim();
    if (!name) return;

    setFileData((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: name,
        isFolder: true,
        children: [],
      },
    ]);
  };

  const addMainFile = () => {
    const name = prompt("Enter The File Name: ")?.trim();
    if (!name) return;

    setFileData((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: name,
        isFolder: false,
      },
    ]);
  };

  return (
    <>
      <h1>Nested File Explorer</h1>
      <div>
        <span>
          <img
            className="folder-icon"
            src="https://cdn-icons-png.flaticon.com/512/4447/4447248.png"
            alt=""
            onClick={addMainFile}
          />
        </span>
        <span>
          <img
            className="folder-icon"
            src="https://png.pngtree.com/png-vector/20190217/ourmid/pngtree-vector-folder-icon-png-image_555493.jpg"
            alt=""
            onClick={addMainFolder}
          />
        </span>
      </div>
      <List
        fileData={fileData}
        addFolder={addFolder}
        deleteFileFolder={deleteFileFolder}
        addFile={addFile}
      />
    </>
  );
};

export default FileExplorer;
