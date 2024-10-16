import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Form, Input, Button } from "antd";
import type { TableProps } from "antd";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

interface DataType {
  key: string;
  name: string;
  email: string;
  password: string;
}

const AccountManager: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/user-roles");
        if (response.status === 200) {
          const formattedData = response.data.map((item: any) => ({
            key: item.id,
            name: item.name,
            email: item.email,
            password: item.pass,
          }));
          setData(formattedData);
          console.log(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
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
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      password: record.password,
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

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:1337/user-roles/${deletingKey}`);
      setData(data.filter((item) => item.key !== deletingKey));
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setConfirmDeleteVisible(false);
      setDeletingKey(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteVisible(false);
    setDeletingKey(null);
  };

  const onFinish = async (values: DataType) => {
    const emailExists = data.some((item) => item.email === values.email);

    if (emailExists) {
      Modal.error({
        title: "Error",
        content: "Email already exists!",
      });
      return;
    }

    if (editingKey) {
      try {
        const response = await axios.put(
          `http://localhost:1337/user-roles/${editingKey}`,
          {
            name: values.name,
            email: values.email,
            pass: values.password,
          }
        );
        if (response.status === 200) {
          const updatedData = data.map((item) =>
            item.key === editingKey ? { ...item, ...values } : item
          );
          setData(updatedData);
        }
      } catch (error) {
        console.error("Error updating account:", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:1337/user-roles", {
          name: values.name,
          email: values.email,
          pass: values.password,
        });
        if (response.status === 200 || response.status === 201) {
          const newData = {
            key: response.data.id,
            name: values.name,
            email: values.email,
            password: values.password,
          };
          setData([...data, newData]);
        }
      } catch (error) {
        console.error("Error adding account:", error);
      }
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
        pagination={{ pageSize: 5 }} // Số lượng tài khoản hiển thị mỗi trang là 5
      />
      <Modal
        title={editingKey ? "Edit Account" : "Add Account"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
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

export default AccountManager;
