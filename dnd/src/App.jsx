import { useState } from "react";
import Column from "./Components/Column";
import GhostTask from "./Components/GhostTask";
import "./App.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import initialTasks from "./tasks.json";

export default function TodoApp() {
  
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState(null);

  const findContainer = (id) => {
    if (id in tasks) return id;

    const container = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === id),
    );

    return container;
  };

  const getActiveTask = () => {
    const containerId = findContainer(activeId);
    if (!containerId) return null;

    return tasks[containerId].find((task) => task.id === activeId);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overId = over.id;
    const overContainer = findContainer(overId) || overId;

    if (activeContainer !== overContainer) {
      setTasks((prev) => {
        const activeIndex = prev[activeContainer].findIndex(
          (task) => task.id === active.id,
        );

        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        const activeItem = activeItems[activeIndex];

        activeItems.splice(activeIndex, 1);

        const isBelowLastItem =
          over &&
          overContainer in prev &&
          over.id !== overContainer &&
          prev[overContainer].length > 0;

        let newIndex;

        if (isBelowLastItem) {
          newIndex = prev[overContainer].findIndex(
            (task) => task.id === over.id,
          );

          if (newIndex >= 0) {
            overItems.splice(newIndex + 1, 0, activeItem);
          } else {
            overItems.push(activeItem);
          }
        } else {
          overItems.push(activeItem);
        }

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overId = over.id;

    const overContainer = findContainer(overId) || overId;

    if (activeContainer === overContainer && active.id !== over.id) {
      setTasks((prev) => {
        const activeIndex = prev[activeContainer].findIndex(
          (task) => task.id === active.id,
        );

        if (over.id === overContainer) {
          return {
            ...prev,
            [activeContainer]: arrayMove(
              prev[activeContainer],
              activeIndex,
              prev[activeContainer].length - 1,
            ),
          };
        }

        const overIndex = prev[overContainer].findIndex(
          (task) => task.id === over.id,
        );

        if (activeIndex !== overIndex) {
          return {
            ...prev,
            [activeContainer]: arrayMove(
              prev[activeContainer],
              activeIndex,
              overIndex,
            ),
          };
        }

        return prev;
      });
    }

    setActiveId(null);
  };

  const [newTask, setNewTask] = useState({ title: "", description: "" });

  function handleAddTask () {
    if (newTask.title.trim() === "") return;

    const taskId = `task-${Date.now()}`;
    const task = {
      id: taskId,
      title: newTask.title,
      description: newTask.description,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, task],
    }));

    setNewTask({ title: "", description: "" });
  };

  function deleteTask( id ) {
    console.log(id)
    const container = findContainer(id);
    if (!container) return;

    setTasks((prev) => ({
      ...prev,
      [container]: prev[container].filter((task) => task.id !== id),
    }));
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-4 text-neutral-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">TASKS APP</h1>

        <div className="mb-8 p-4 bg-neutral-800 rounded shadow border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="p-2 border rounded bg-neutral-700 border-neutral-600 text-neutral-100 placeholder-neutral-400 focus:outline-none"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="p-2 border rounded bg-neutral-700 border-neutral-600 text-neutral-100 placeholder-neutral-400 focus:outline-none"
              rows="2"
            />
            <button
              onClick={handleAddTask}
              className="bg-neutral-800 text-white font-semibold py-2 px-4 rounded border-2 border-neutral-800 hover:bg-neutral-700 hover:border-neutral-700 transition-all"
            >
              Add Task
            </button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {Object.keys(tasks).map((columnId) => (
              <Column
                key={columnId}
                id={columnId}
                title={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                tasks={tasks[columnId]}
                delete_task={deleteTask}
              />
            ))}
          </div>

          <DragOverlay style={{ pointerEvents: 'none' }}>
            {activeId ? <GhostTask task={getActiveTask()} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
