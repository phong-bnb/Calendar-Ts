import { Button, Form, Input } from "antd";
import React from "react";

type FieldType = {
  title: string; // Thay đổi title từ optional sang required
  content: string;
  user: string;
};

interface TaskModalProps {
  onSave: (values: FieldType) => void; // Chấp nhận onSave với kiểu values là FieldType
}

const TaskModal: React.FC<TaskModalProps> = ({ onSave }) => {
  const [form] = Form.useForm(); // Sử dụng form từ Ant Design

  const handleFinish = (values: FieldType) => {
    console.log("Success:", values);
    onSave(values); // Gọi onSave với giá trị từ form
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form} // Kết nối form với Ant Design
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Title" // Đổi từ Username sang Title
        name="title" // Cập nhật name
        rules={[{ required: true, message: "Please input your title!" }]} // Thêm quy tắc
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Content" // Đổi từ Password sang Content
        name="content" // Cập nhật name
        rules={[{ required: true, message: "Please input your content!" }]} // Thêm quy tắc
      >
        <Input.TextArea /> // Sử dụng TextArea cho nội dung
      </Form.Item>

      <Form.Item<FieldType>
        label="User" // Thêm trường User
        name="user"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskModal;
