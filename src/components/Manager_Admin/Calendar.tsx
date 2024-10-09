import React, { useState } from "react";
import { Calendar, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import { useSelector, useDispatch } from "react-redux";
import { RootState, setTasksForDay } from "../../store";
import TaskModal from "../TaskModal";

const Calendar_Manager: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.calendar.tasks);

  // Danh sách nhân viên
  const users = [
    { name: "John", color: "red" },
    { name: "Jane", color: "blue" },
    { name: "Doe", color: "green" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSelectDay = (date: Date) => {
    setSelectedDay(date);
    setModalVisible(true);
  };

  const handleSaveTask = (newTask: {
    title: string;
    content: string;
    user: string;
  }) => {
    if (selectedDay) {
      const taskWithDate = {
        ...newTask,
        date: selectedDay.toISOString(),
      };
      dispatch(setTasksForDay([...tasks, taskWithDate]));
    }
    setModalVisible(false); // Đóng modal sau khi lưu
  };

  const resetForm = () => {
    setModalVisible(false);
    setSelectedDay(null);
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
            const user = users.find((u) => u.name === task.user);
            return (
              <div key={task.title} className="text-black">
                <span style={{ color: user?.color }}>{user?.name}</span>:{" "}
                {task.title}
              </div>
            );
          })}
      </div>
    );
  };

//   const renderTask = (task: { title: string; user: string; date: string }) => {
//     const user = users.find((u) => u.name === task.user);
//     return (
//       <div key={task.title}>
//         <span style={{ color: user?.color }}>{user?.name}</span>: {task.title}
//       </div>
//     );
//   };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center mt-2 pl-8"></div>

      <div className="flex-grow flex   mt-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h1 className="text-2xl font-bold">Lịch công việc</h1>
          <Calendar
            bordered
            renderCell={renderCell}
            onSelect={handleSelectDay}
          />

          {/* {selectedDay && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">
                Công việc cho ngày {selectedDay.toLocaleDateString()}:
              </h2>
              {tasks
                .filter(
                  (task) =>
                    new Date(task.date).toDateString() ===
                    selectedDay.toDateString()
                )
                .map(renderTask)}
            </div>
          )} */}
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
          <TaskModal onSave={handleSaveTask} onClose={resetForm} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar_Manager;
