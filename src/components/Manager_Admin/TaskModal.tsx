import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios để fetch API
import { Task } from "../../store"; // Import kiểu Task

const { Option } = Select;

type FieldType = {
  content: string;
  title: string;
  user: string; // Đổi user thành kiểu string để lưu user ID
};

type TaskModalProps = {
  onSave: (task: Omit<Task, "id" | "date">) => void; // Omit để không cần id và date
  onClose: () => void;
  editingTask?: Task | null; // Sử dụng kiểu Task
};

const TaskModal: React.FC<TaskModalProps> = ({
  onSave,
  onClose,
  editingTask,
}) => {
  const [form] = Form.useForm();
  const [userRoles, setUserRoles] = useState<any[]>([]); // State để lưu danh sách user roles

  // Fetch danh sách user roles từ API
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get("http://localhost:1337/user-roles");
        setUserRoles(response.data); // Lưu kết quả vào state
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, []);

  // Gán giá trị mặc định cho form nếu đang chỉnh sửa task
  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        content: editingTask.content,
        user: editingTask.user, // Đặt người dùng đang chỉnh sửa
      });
    } else {
      form.resetFields(); // Xóa giá trị form khi không có task chỉnh sửa
    }
  }, [editingTask, form]);

  // Xử lý khi submit form
  const onFinish = (values: FieldType) => {
    onSave(values); // Gọi onSave để lưu task (cho dù là thêm mới hay cập nhật)
    form.resetFields();
    onClose();
  };
  console.log(userRoles);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input the content!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="User"
        name="user"
        rules={[{ required: true, message: "Please select a user!" }]}
      >
        <Select placeholder="Select a user">
          {userRoles.map((user: any) => (
            <Option key={user.id} value={user.id}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: user.color || "gray", // Nếu không có màu, đặt màu mặc định là gray
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
                {user.name}
              </span>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {editingTask ? "Update" : "Submit"}{" "}
          {/* Hiển thị nút Submit khi thêm mới */}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskModal;
