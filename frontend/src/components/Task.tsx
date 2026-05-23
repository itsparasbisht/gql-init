import { TaskData } from "@/types";
import { Pin } from "lucide-react";

type TaskProps = {
  task: TaskData;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }: TaskProps) {
  return (
    <div className="mb-1">
      <label htmlFor={`archiveTask-${id}`} aria-label={`archiveTask-${id}`}>
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
          onClick={() => onArchiveTask(id)}
        />
      </label>
      <label htmlFor={`title-${id}`} aria-label={title}>
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
          className="bottom-1 bg-gray-200 rounded-sm px-2 py-1 ml-2"
        />
      </label>
      {state !== "TASK_ARCHIVED" && (
        <button
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <Pin
            size={20}
            className={`${state === "TASK_PINNED" ? "text-red-500" : "text-gray-300"}`}
            fill={state === "TASK_PINNED" ? "currentColor" : "none"}
          />
        </button>
      )}
    </div>
  );
}
