import { Button, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";

type FieldType = {
  content?: string;
  title?: string;
  user?: string;
};

const { Option } = Select;

const TaskModal: React.FC<{ onSave: (task: FieldType) => void }> = ({
  onSave,
}) => {
  const [employees, setEmployees] = useState<string[]>([]); // State để lưu danh sách nhân viên

  // Giả lập fetch danh sách nhân viên (có thể thay thế bằng API)
  useEffect(() => {
    // Giả lập danh sách nhân viên
    const employeeList = [
      "Đức Anh",
      "Lưu Bính",
      "Nam An",
      "Phạm Sơn",
    ];
    setEmployees(employeeList);
  }, []);

  const handleFinish = (values: FieldType) => {
    onSave(values); // Gọi hàm onSave với các giá trị form
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleFinish} // Sử dụng handleFinish
      onFinishFailed={handleFinishFailed} // Hàm xử lý lỗi
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Nhân Viên"
        name="user"
        rules={[{ required: true, message: "Vui lòng chọn nhân viên!" }]}
      >
        <Select placeholder="Chọn nhân viên">
          {employees.map((employee, index) => (
            <Option key={index} value={employee}>
              {employee}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Công Việc"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập công việc!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskModal;
