import { Meta, StoryObj } from "@storybook/react-vite";
import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

const meta = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div className="p-4">{story()}</div>],
  args: {
    ...TaskStories.ActionsData,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: [
      { id: "1", title: "Task 1", state: "TASK_INBOX" },
      { id: "2", title: "Task 2", state: "TASK_INBOX" },
      { id: "3", title: "Task 3", state: "TASK_INBOX" },
      { id: "4", title: "Task 4", state: "TASK_INBOX" },
      { id: "5", title: "Task 5", state: "TASK_INBOX" },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [...Default.args.tasks, { id: "6", title: "Task 6", state: "TASK_PINNED" }],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false,
  },
};
