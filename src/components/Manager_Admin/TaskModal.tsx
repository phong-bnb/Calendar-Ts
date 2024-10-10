import { Button, Form, Input, Select } from "antd";
import React from "react";
import { users } from "./user";

const { Option } = Select;

type FieldType = {
  content: string;
  title: string;
  user: string;
};

type TaskModalProps = {
  onSave: (task: FieldType) => void;
  onClose: () => void;
};

const TaskModal: React.FC<TaskModalProps> = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskModal;
