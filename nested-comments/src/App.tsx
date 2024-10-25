import NestedComponents from "./components/NestedComponents";
import commentsData from "./data/component.json";

const App = () => {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComponents 
      comments={commentsData}
      onSubmit = {() => {}}
      onEdit = {() => {}}
      onDelete = {() => {}}
      />
    </div>
  );
};

export default App;
