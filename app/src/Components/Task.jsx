import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ title, desc, index }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ index });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="card-container"
    >
      <div className="card-contents">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
