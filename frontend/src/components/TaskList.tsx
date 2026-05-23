import { TaskData } from "@/types";
import Task from "./Task";

type TaskListProps = {
  loading?: boolean;
  tasks: TaskData[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
};

export default function TaskList({
  loading = false,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (tasks.length === 0) {
    return <div>empty</div>;
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div>
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
