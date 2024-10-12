import React, { useState } from "react";
import { Calendar, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasksForDay, RootState } from "../../store";
import TaskModal from "./TaskModal";
import { users } from "./user";
import "./Calendar.css";
import { Button } from "antd";
import { Task } from "../../store"; // Import kiểu Task

const Calendar_Manager: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.calendar.tasks);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Sử dụng kiểu Task ở đây

  const handleSelectDay = (date: Date) => {
    setSelectedDay(date);
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleSaveTask = (newTask: Omit<Task, "id" | "date">) => {
    if (selectedDay) {
      const selectedUser = users.find((u) => u.name === newTask.user);

      if (!selectedUser) {
        console.error("User not found:", newTask.user); // Log ra nếu không tìm thấy user
        return;
      }

      const taskWithDate = {
        ...newTask,
        user: selectedUser, // Lưu người dùng với cả name và color
        date: selectedDay.toISOString(),
      };

      if (editingTask) {
        const updatedTasks = tasks.map((task) =>
          task.title === editingTask.title && task.date === editingTask.date
            ? taskWithDate
            : task
        );
        dispatch(setTasksForDay(updatedTasks));
      } else {
        dispatch(setTasksForDay([...tasks, taskWithDate]));
      }
    }
    setModalVisible(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setSelectedDay(new Date(task.date));
    setModalVisible(true);
  };

  const handleDeleteTask = (date: string, title: string) => {
    dispatch(deleteTask({ date, title }));
  };

  const renderCell = (date: Date) => {
    const tasksForDate = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });

    return (
      <div className="relative top-0 right-0 p-1 overflow-hidden border-none">
        {tasksForDate.length > 0 && (
          <div
            className="task-list scroll-container"
            style={{
              maxHeight: "80px",
              overflowY: "auto",
            }}
          >
            {tasksForDate.map((task) => {
              const userName = task.user?.name || task.user;
              const user = users.find((u) => u.name === userName);
              return (
                <div
                  key={task.id}
                  className="text-black mb-1 flex  gap-2 w-full"
                >
                  <div className="flex justify-between  w-full">
                    <div className="flex items-center">
                      {" "}
                      <span style={{ color: user?.color }}>{user?.name}</span>:
                      <span className="truncate max-w-[80%]">
                        {" "}
                        {/* Sử dụng truncate để ẩn overflow */}
                        {task.title.length > 5
                          ? `${task.title.slice(0, 5)}...` //nếu title quá 5 kí tự thì ẩn và thêm ... đằng sau
                          : task.title}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTask(task);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.date, task.title);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const resetForm = () => {
    setModalVisible(false);
    setSelectedDay(null);
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center mt-2 pl-8"></div>

      <div className="flex-grow flex mt-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h1 className="text-2xl font-bold">Lịch công việc</h1>
          <Calendar
            bordered
            renderCell={renderCell}
            onSelect={handleSelectDay}
          />
        </div>
      </div>

      <Modal
        open={modalVisible}
        onClose={resetForm}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Header>
          <Modal.Title>Ngày {selectedDay?.toLocaleDateString()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskModal
            onSave={handleSaveTask}
            onClose={resetForm}
            editingTask={editingTask} // Truyền task đang chỉnh sửa vào modal
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar_Manager;
