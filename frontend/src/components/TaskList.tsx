import Task from "./Task";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { archiveTask, pinTask } from "@/lib/tasksSlice";

export default function TaskList() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const onPinTask = (id: string) => {
    dispatch(pinTask(id));
  };

  const onArchiveTask = (id: string) => {
    dispatch(archiveTask(id));
  };

  const events = {
    onPinTask,
    onArchiveTask,
  };

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
