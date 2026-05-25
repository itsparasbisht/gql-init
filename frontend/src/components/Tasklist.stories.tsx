import { Meta, StoryObj } from "@storybook/react-vite";
import TaskList from "./TaskList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { TasksState } from "@/lib/tasksSlice";

// A super-simple mock of the state of the store
const MockState: TasksState = {
  tasks: [
    { id: "1", title: "Task 1", state: "TASK_INBOX" },
    { id: "2", title: "Task 2", state: "TASK_INBOX" },
    { id: "3", title: "Task 3", state: "TASK_INBOX" },
    { id: "4", title: "Task 4", state: "TASK_INBOX" },
    { id: "5", title: "Task 5", state: "TASK_INBOX" },
  ],
};

// A super-simple mock of a redux store
const Mockstore = ({
  tasksState,
  children,
}: {
  tasksState: TasksState;
  children: React.ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        tasks: tasksReducer,
      },
      preloadedState: {
        tasks: tasksState,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div className="p-4">{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockState$/,
} satisfies Meta<typeof TaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(story) => <Mockstore tasksState={MockState}>{story()}</Mockstore>],
};

export const WithPinnedTasks: Story = {
  decorators: [
    (story) => (
      <Mockstore
        tasksState={{
          ...MockState,
          tasks: [...MockState.tasks, { id: "6", title: "Task 6", state: "TASK_PINNED" }],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        tasksState={{
          ...MockState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
