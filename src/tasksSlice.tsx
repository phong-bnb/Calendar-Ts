import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu cho các công việc
interface Task {
  id: number; // Thêm id vào đây
  title: string;
  content: string;
  user: {
    name: string;
    color: string;
  };
  date: string; // Ngày dưới dạng chuỗi ISO
}

// Định nghĩa kiểu cho trạng thái
interface TasksState {
  tasks: Record<string, Task[]>; // Mỗi ngày sẽ là một mảng công việc
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ date: string, task: Task }>) => {
      const { date, task } = action.payload;
      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }
      state.tasks[date].push(task);
    },
    editTask: (
      state,
      action: PayloadAction<{
        date: string,
        taskId: string, // Hoặc kiểu khác mà bạn đang sử dụng cho ID
        updatedTask: Partial<Task>, // Chỉ cần cập nhật một phần của task
      }>
    ) => {
      const { date, taskId, updatedTask } = action.payload;
      const tasks = state.tasks[date];
      const taskIndex = tasks?.findIndex((task) => task.id === Number(taskId));
      if (taskIndex !== undefined && taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ date: string, taskId: string }> // Hoặc kiểu khác mà bạn đang sử dụng cho ID
    ) => {
      const { date, taskId } = action.payload;
      state.tasks[date] = state.tasks[date]?.filter(
        (task) => task.id !== Number(taskId)
      );
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
