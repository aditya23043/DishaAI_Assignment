import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

export default function Column({ title, tasks }) {
  return (
    <div className="flex-1">
      <h2 className="text-center">{title}</h2>
      <SortableContext items={tasks.map((task) => task.index)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task title={task.title} desc={task.desc} index={task.index} key={task.index} />
          ))}
      </SortableContext>
    </div>
  );
}
