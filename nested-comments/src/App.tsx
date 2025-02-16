import FileExplorer from "./components/FileExplorer/FileExplorer";
import Nested from "./components/NestedComment/Nested";
import data from "./data/component.json";

const App = () => {
  return (
    <>
      <div>
        {/* <h1>Nested Comment System</h1> */}
        {/* <Nested
          comments={data}
          onSubmit={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onUpvote={() => {}}
          onDownVote={() => {}}
        /> */}
        <FileExplorer/>
      </div>
    </>
  );
};

export default App;
