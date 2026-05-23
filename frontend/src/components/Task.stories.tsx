import Task from "./Task";
import { Meta, StoryObj } from "@storybook/react-vite";

export const ActionsData = {
  onArchiveTask: () => {},
  onPinTask: () => {},
};

const meta = {
  component: Task,
  title: "Task",
  args: {
    ...ActionsData,
  },
  excludeStories: /.*Data$/,
  tags: ["autodocs"],
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      state: "TASK_INBOX",
      title: "Task 1",
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: "TASK_PINNED",
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: "TASK_ARCHIVED",
    },
  },
};
