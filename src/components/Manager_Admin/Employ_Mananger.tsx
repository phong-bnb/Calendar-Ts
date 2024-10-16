import React, { useState } from "react";
import { Space, Table, Tag, Modal, Form, Input, Button } from "antd";
import type { TableProps } from "antd";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "Quan Vân Trường",
    age: 32,
    address: "Tung Của",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Trương Tam Phong",
    age: 42,
    address: "Chai na",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Lý Tiểu Long",
    age: 32,
    address: "Hàn Cuốc",
    tags: ["cool", "teacher"],
  },
];

const Employ_Manager: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
    form.setFieldsValue({
      name: record.name,
      age: record.age,
      address: record.address,
      tags: record.tags,
    });
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
      const newKey = (data.length + 1).toString(); // Tạo key mới cho nhân viên
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
        Add Employee
      </Button>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }} // Giới hạn số dòng hiển thị mỗi trang là 2
      />
      <Modal
        title={editingKey ? "Edit Employee" : "Add Employee"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: "Please input your tags!" }]}
          >
            <Input />
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
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </>
  );
};

export default Employ_Manager;
