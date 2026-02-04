import React, { useRef, useState } from "react";

export default function Todo() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editID, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const editInput = useRef(null);

  const addTask = () => {
    if (!input.trim()) {
      alert("Write a Task to Add");
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), name: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleCompleted = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  const saveEdit = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === editID) {
        return {
          ...task,
          name: editValue,
        };
      }
      return task;
    });
    setTasks(newTasks);
    setEditId(null);
  };

  const filterdTask = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">To-Do List</h1>

      <div className="mt-10 relative">
        <input
          className="rounded-xl bg-white shadow-md w-150 py-5 pl-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Add Your Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button
          className="absolute top-3 right-5 cursor-pointer hover:bg-blue-700 bg-blue-600 rounded-lg py-2 px-4 text-white font-bold"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <div className="mt-10 shadow-md bg-white p-1 rounded-lg">
        <ul className="flex justify-center items-center gap-5 w-full">
          <li
            className={`${filter === "all" ? "bg-blue-600 text-white" : " hover:bg-slate-100"} px-15 py-2 rounded-lg hover:bg-blue-500 cursor-pointer`}
            onClick={() => setFilter("all")}
          >
            All
          </li>
          <li
            className={`${filter === "active" ? "bg-blue-600 text-white" : "hover:bg-slate-100"} px-15 py-2 rounded-lg hover:bg-blue-500 cursor-pointer`}
            onClick={() => setFilter("active")}
          >
            Active
          </li>
          <li
            className={`${filter === "completed" ? "bg-blue-600 text-white" : "hover:bg-slate-100"} px-15 py-2 rounded-lg hover:bg-blue-500 cursor-pointer`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <p>{tasks.length} Tasks</p>
      </div>

      {filterdTask.length == 0 ? (
        <div className="bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-3 w-full h-60 mt-10">
          <h2 className="font-bold text-2xl">No Tasks Yet</h2>
        </div>
      ) : (
        filterdTask.map((task) => {
          return (
            <div
              key={task.id}
              className={`${task.completed ? "bg-blue-50" : "bg-white"} shadow-md rounded-xl p-5 w-full mt-5 flex items-center justify-between`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-blue-600"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                />
                {editID === task.id ? (
                  <input
                    type="text"
                    className="rounded-xl w-85 bg-white ml-4 py-3 pl-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                    }}
                    ref={editInput}
                  />
                ) : (
                  <li
                    className={`${task.completed ? "line-through text-slate-400" : ""} pl-3 list-none`}
                  >
                    {task.name}
                  </li>
                )}
              </div>
              <div className="flex items-center gap-3">
                {editID === task.id ? (
                  <button
                    className="cursor-pointer hover:bg-blue-700 bg-blue-600 rounded-lg py-2 px-4 text-white font-bold"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="cursor-pointer hover:bg-blue-700 bg-blue-600 rounded-lg py-2 px-4 text-white font-bold"
                    onClick={() => {
                      setEditId(task.id);
                      setEditValue(task.name);
                      setTimeout(() => {
                        editInput.current.focus();
                      }, 0);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="cursor-pointer hover:bg-red-700 bg-red-600 rounded-lg py-2 px-4 text-white font-bold"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
