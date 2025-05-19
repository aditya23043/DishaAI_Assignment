export default function GhostTask ({ task })  {
  return (
    <div className="bg-neutral-800 p-4 rounded shadow cursor-grabbing border border-neutral-700 opacity-80">
      <h3 className="font-semibold text-lg mb-1 text-neutral-100">
        {task.title}
      </h3>
      <p className="text-neutral-400">{task.description}</p>
    </div>
  );
};
