import { Button } from "@material-tailwind/react";
import "./App.css";
import Todo from "./pages/Todo";

function App() {
  return (
  <div className="w-full flex flex-col  items-center bg-slate-200 h-screen pt-10">
  <Todo />
  </div>
);
}

export default App;
