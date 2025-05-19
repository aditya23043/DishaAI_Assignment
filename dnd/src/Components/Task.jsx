import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task, delete_task }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-neutral-800 flex flex-row items-center justify-between  p-4 m-1 rounded shadow cursor-grab border border-neutral-700 hover:shadow-md"
    >
      <div>
        <h3 className="font-semibold text-lg mb-1 text-neutral-100">
          {task.title}
        </h3>
        <p className="text-neutral-400">{task.description}</p>
      </div>
      <div className="m-3 text-neutral-600 z-50 w-5 h-5 cursor-pointer flex justify-center items-center" onClick={() => delete_task(task.id)}>
        
      </div>
    </div>
  );
}
