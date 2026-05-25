import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskData } from "../types";

export interface TasksState {
  tasks: TaskData[];
}

const defaultTasks: TaskData[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const initialState: TasksState = {
  tasks: defaultTasks,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    pinTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.state = "TASK_PINNED";
      }
    },
    archiveTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.state = "TASK_ARCHIVED";
      }
    },
  },
});

export const { pinTask, archiveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
