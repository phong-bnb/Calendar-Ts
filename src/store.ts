import { configureStore, createSlice } from "@reduxjs/toolkit";

// Định nghĩa kiểu công việc
export interface Task {
  title: string;
  content: string;
  user: { name: string; color: string }; // Mỗi nhân viên có màu riêng
  date: string; // Ngày lưu dưới dạng chuỗi
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
  },
});

export const { setTasksForDay } = calendarSlice.actions;

const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
