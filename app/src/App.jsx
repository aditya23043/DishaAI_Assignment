import { useState } from "react";
import Column from "./Components/Column";
import { closestCenter, DndContext } from "@dnd-kit/core";

const initialTasks = [
  {
    index: 1,
    title: "Gym",
    desc: "Go the gym",
    type: "todo",
  },
  {
    index: 2,
    title: "Docs",
    desc: "Complete the documentation of all the files",
    type: "ongoing",
  },
  {
    index: 3,
    title: "LinkedIn",
    desc: "Post all recent projects on LinkedIn",
    type: "done",
  },
  {
    index: 4,
    title: "SG/CW",
    desc: "Register SG and CW credits on the portal",
    type: "ongoing",
  },
];

// const list_todo = tasks.filter((item) => item.type === "todo");
// const list_ongoing = tasks.filter((item) => item.type === "ongoing");
// const list_done = tasks.filter((item) => item.type === "done");

function App() {

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <h1 className="p-5 mb-8 text-3xl text-center header">TASKS</h1>

      <div className="flex w-full">
        <DndContext collisionDetection={closestCenter}>
          <Column title="Todo Tasks" tasks={tasks.filter(t => t.type === "todo")} />
          <Column title="Ongoing Tasks" tasks={tasks.filter(t => t.type === "ongoing")} />
          <Column title="Completed Tasks" tasks={tasks.filter(t => t.type === "done")} />
        </DndContext>
      </div>
    </>
  );
}

export default App;
