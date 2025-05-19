import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Column({ id, title, tasks, delete_task }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col w-full md:w-1/3 p-2">
      <h2 className="text-xl font-bold mb-4 text-center bg-neutral-800 text-neutral-100 py-2 rounded">
        {title}
      </h2>
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 h-full min-h-64 p-2 rounded bg-neutral-900"
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <Task key={task.id} task={task} delete_task={delete_task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center text-neutral-500 border-2 border-dashed border-neutral-700 p-8 rounded">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
