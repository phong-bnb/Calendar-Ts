import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice để lưu trạng thái công việc theo ngày
const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    tasks: [], // Mảng lưu công việc của từng ngày
  },
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
