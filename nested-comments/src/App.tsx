import FileExplorer from "./components/FileExplorer/FileExplorer";
import CommentCard from "./components/Nested/CommentCard";
import Nested from "./components/NestedComment/Nested";
import ProgressBar from "./components/ProgressBar/ProgressBar";
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
        {/* <FileExplorer/> */}
        {/* <CommentCard/> */}
        <ProgressBar/>
      </div>
    </>
  );
};

export default App;
