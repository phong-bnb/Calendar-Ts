import { configureStore, createSlice } from "@reduxjs/toolkit";

// Định nghĩa kiểu công việc
export interface Task {
  id: number; // Thêm thuộc tính id
  title: string;
  content: string;
  user: {
    name: string;
    color: string;
  };
  date: string; // Ngày dưới dạng chuỗi ISO
}

// Định nghĩa trạng thái của lịch
interface CalendarState {
  tasks: Task[];
}

// Slice để lưu trạng thái công việc theo ngày
const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    tasks: [] as Task[], // Mảng lưu công việc của từng ngày
  } as CalendarState,
  reducers: {
    setTasksForDay: (state, action) => {
      state.tasks = action.payload;
    },
    editTask: (state, action) => {
      const { date, title, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex(
        (task) => task.date === date && task.title === title
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      const { date, title } = action.payload;
      state.tasks = state.tasks.filter(
        (task) => !(task.date === date && task.title === title)
      );
    },
  },
});

export const { setTasksForDay, editTask, deleteTask } = calendarSlice.actions;

const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
