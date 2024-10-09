import React, { useState } from "react";
import { Calendar, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTasksForDay } from "../store";
import TaskModal from "./TaskModal";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.calendar.tasks) as Array<{
    title: string;
    content: string;
    user: string;
    status: string;
    assigner: string;
    date: string;
  }>;

  // State để kiểm soát modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Giả lập thêm công việc khi chọn ngày (sau này có thể thêm logic thêm/sửa/xóa)
  const handleSelectDay = (date: Date) => {
    setSelectedDay(date);
    setModalVisible(true); // Mở modal khi chọn ngày
  };

  // Handle lưu công việc
  const handleSaveTask = (newTask: {
    title: string;
    content: string;
    user: string;
  }) => {
    if (selectedDay) {
      const taskWithDate = {
        ...newTask,
        status: "open", // Mặc định trạng thái là open
        assigner: newTask.user, // Gán user từ input
        date: selectedDay.toISOString(), // Lưu ngày vào task
      };

      dispatch(setTasksForDay([...tasks, taskWithDate])); // Thêm công việc mới vào state
      resetForm(); // Reset form
    }
  };

  // Reset form và đóng modal
  const resetForm = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  // Render badge và thông tin công việc nếu ngày có công việc
  const renderCell = (date: Date) => {
    // Lọc các công việc theo ngày đã chọn
    const tasksForDate = tasks.filter((task) => {
      const taskDate = new Date(task.date); // Đảm bảo rằng task có thuộc tính date
      return taskDate.toDateString() === date.toDateString();
    });

    // Nếu có công việc cho ngày đã chọn, hiển thị thông tin
    if (tasksForDate.length > 0) {
      return (
        <div className="absolute top-0 right-0 p-1 text-sm">
          {tasksForDate.map((task, index) => (
            <div key={index} className="text-black">
              {task.assigner}: {task.title}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Lịch công việc</h1>
        <Calendar bordered renderCell={renderCell} onSelect={handleSelectDay} />
      </div>

      {/* Modal để thêm công việc */}
      <Modal
        open={modalVisible}
        onClose={resetForm}
        className="fixed inset-0 flex justify-center items-center"
      >
        <Modal.Header>
          <Modal.Title className="gap-6 flex">
            Ngày {selectedDay?.toLocaleDateString()}
          </Modal.Title>
        </Modal.Header>
        <TaskModal onSave={handleSaveTask} />
      </Modal>
    </div>
  );
};

export default HomePage;
