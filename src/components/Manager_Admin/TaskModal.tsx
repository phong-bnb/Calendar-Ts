import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { users } from "./user";
import { Task } from "../../store"; // Import kiểu Task

const { Option } = Select;

type FieldType = {
  content: string;
  title: string;
  user: {
    name: string; // Thay đổi từ string sang đối tượng
    color: string;
  };
};

type TaskModalProps = {
  onSave: (task: Omit<Task, "id" | "date">) => void; // Omit để không cần id và date
  onClose: () => void;
  editingTask?:  Task | null// Sử dụng kiểu Task
};

const TaskModal: React.FC<TaskModalProps> = ({
  onSave,
  onClose,
  editingTask,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        content: editingTask.content,
        user: editingTask.user.name, // Chỉ lấy tên người dùng
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

 const onFinish = (values: FieldType) => {
   console.log("Task values submitted:", values); // Log giá trị form
   onSave(values);
   form.resetFields();
   onClose();
 };

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
          {users.map((user) => (
            <Option key={user.name} value={user.name}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: user.color,
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
          {editingTask ? "Update" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskModal;
