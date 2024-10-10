import React, { useState } from "react";
import { Calendar, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasksForDay, RootState } from "../../store";
import TaskModal from "./TaskModal";
import { users } from "./user";
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
    // Omit để không cần id và date ở đây
    if (selectedDay) {
      const taskWithDate: Task = {
        ...newTask,
        date: selectedDay.toISOString(),
        id: editingTask ? editingTask.id : Date.now(), // Nếu đang chỉnh sửa, giữ lại id cũ
      };

      if (editingTask) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTask.id ? taskWithDate : task
        );
        dispatch(setTasksForDay(updatedTasks));
      } else {
        dispatch(setTasksForDay([...tasks, taskWithDate]));
      }
    }
    setModalVisible(false);
  };

  const handleEditTask = (task: Task) => {
    // Sử dụng kiểu Task
    setEditingTask(task);
    setSelectedDay(new Date(task.date));
    setModalVisible(true);
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const renderCell = (date: Date) => {
    const tasksForDate = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });

    return (
      <div className="absolute top-0 right-0 p-1">
        {tasksForDate.length > 0 &&
          tasksForDate.map((task) => {
            const user = users.find((u) => task.user.name === u.name);
            return (
              <div key={task.id} className="text-black mb-1">
                <span>{user?.name}</span>: {task.title}
                <Button
                  className="w-3"
                  onClick={() => handleEditTask(task)} // Chỉnh sửa task
                >
                  Edit
                </Button>
                <Button
                  className="w-12"
                  onClick={() => handleDeleteTask(task.id)} // Xóa task theo id
                >
                  Delete
                </Button>
              </div>
            );
          })}
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
