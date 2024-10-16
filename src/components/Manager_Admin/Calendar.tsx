import React, { useEffect, useState } from "react";
import { Calendar, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import axios from "axios"; // Import axios để fetch API
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasksForDay, RootState } from "../../store";
import TaskModal from "./TaskModal";
// import { users } from "./user";
import "./Calendar.css";
import { Button } from "antd";
import { Task } from "../../store"; // Import kiểu Task

const Calendar_Manager: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.calendar.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Sử dụng kiểu Task ở đây
  const [users, setUser] = useState<any[]>([]);
  console.log(tasks);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get("http://localhost:1337/user-roles");
        setUser(response.data); // Lưu kết quả vào state
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, []);
  // Fetch data từ Strapi khi component được mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:1337/tasks");
        const strapiTasks = response.data.map((task: any) => ({
          id: task.id,
          title: task.title,
          user: task.user_role?.name || "Unknown", // Lấy user từ user_role
          date: task.date,
          content: task.content,
        }));
        dispatch(setTasksForDay(strapiTasks)); // Dispatch tasks lên Redux store
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  // Khi chọn một ngày trong calendar
  const handleSelectDay = (date: Date) => {
    setSelectedDay(date);
    setEditingTask(null); // Reset task để chuẩn bị thêm mới
    setModalVisible(true);
  };

  const handleSaveTask = async (newTask: Omit<Task, "id" | "date">) => {
    console.log(users);

    if (selectedDay) {
      const selectedUser = users.find((u) => u.id === newTask.user); // Sửa lại để tìm user theo ID

      if (!selectedUser) {
        console.error("User not found:", newTask.user);
        return;
      }

      const taskWithDate = {
        ...newTask,
        user: selectedUser, // Lưu người dùng với cả name và color
        date: selectedDay.toISOString(),
      };

      if (editingTask) {
        // Update task hiện có
        const updatedTasks = tasks.map((task) =>
          task.id === editingTask.id ? { ...taskWithDate, id: task.id } : task
        );

        try {
          await axios.put(`http://localhost:1337/tasks/${editingTask.id}`, {
            title: newTask.title,
            content: newTask.content,
            date: selectedDay.toISOString(),
            user_role: selectedUser.id,
          });
          dispatch(setTasksForDay(updatedTasks));
        } catch (error) {
          console.error("Error updating task:", error);
        }
      } else {
        // Thêm task mới
        try {
          const response = await axios.post("http://localhost:1337/tasks", {
            title: newTask.title,
            content: newTask.content,
            date: selectedDay.toISOString(),
            user_role: selectedUser.id,
          });

          const newTaskWithId = { ...taskWithDate, id: response.data.id };
          dispatch(setTasksForDay([...tasks, newTaskWithId]));
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    }
    setModalVisible(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setSelectedDay(new Date(task.date));
    setModalVisible(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:1337/tasks/${id}`);
      dispatch(deleteTask({ id }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
                  className="text-black mb-1 flex gap-2 w-full"
                >
                  <div className="flex justify-between  w-full">
                    <div className="flex items-center">
                      <span style={{ color: user?.color }}>{user?.name}</span>:
                      <span className="truncate max-w-[80%]">
                        {task.title.length > 5
                          ? `${task.title.slice(0, 5)}...`
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
                          handleDeleteTask(task.id);
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
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
