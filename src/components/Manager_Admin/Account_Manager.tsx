import React, { useState } from "react";
import { Space, Table, Modal, Form, Input, Button } from "antd";
import type { TableProps } from "antd";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

interface DataType {
  key: string;
  email: string;
  password: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    email: "luubinhngu@duonghai.com",
    password: "123123",
  },
  {
    key: "2",
    email: "ducanhngu@haiduong.vn",
    password: "123123",
  },
  {
    key: "3",
    email: "Namanngu@namdinh.vn",
    password: "123123",
  },
];

const Account_Manager: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="text-blue-700 flex items-center"
            onClick={() => handleEdit(record)}
          >
            <RiEditFill className="text-xl" /> Edit
          </a>
          <a
            className="text-red-600 flex items-center"
            onClick={() => handleDelete(record.key)}
          >
            <MdDeleteForever className="text-xl" /> Delete
          </a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: DataType) => {
    setEditingKey(record.key);
    form.setFieldsValue({ email: record.email, password: record.password });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingKey(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setDeletingKey(key);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.key !== deletingKey));
    setConfirmDeleteVisible(false);
    setDeletingKey(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteVisible(false);
    setDeletingKey(null);
  };

  const onFinish = (values: DataType) => {
    if (editingKey) {
      const updatedData = data.map((item) =>
        item.key === editingKey ? { ...item, ...values } : item
      );
      setData(updatedData);
    } else {
      const newKey = (data.length + 1).toString(); // Tạo key mới cho tài khoản
      setData([...data, { ...values, key: newKey }]);
    }
    setIsModalVisible(false);
    setEditingKey(null);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleAdd}
        className="mb-4 ml-6 font-bold"
      >
        Add Account
      </Button>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 2 }} // Giới hạn số dòng hiển thị mỗi trang là 2
      />
      <Modal
        title={editingKey ? "Edit Account" : "Add Account"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={confirmDeleteVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
      >
        <p>Are you sure you want to delete this account?</p>
      </Modal>
    </>
  );
};

export default Account_Manager;
