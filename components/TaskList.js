// components/TaskList.js
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";

export default function TaskList() {
  const { tasks, toggleTask } = useTasks();
  const { lang } = useA11y();

  const t = {
    en: { mark: "Mark complete", unmark: "Mark incomplete" },
    fr: { mark: "Marquer comme terminé", unmark: "Marquer comme incomplet" }
  }[lang];

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.title}</span>

          <button
            aria-label={task.completed ? t.unmark : t.mark}
            onClick={() => toggleTask(task.id)}
            className="btn"
          >
            {task.completed ? "✔" : "○"}
          </button>
        </li>
      ))}
    </ul>
  );
}
