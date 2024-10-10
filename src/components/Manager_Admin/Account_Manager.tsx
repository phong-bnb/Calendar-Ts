import React from "react";
import { Space, Table} from "antd";
import type { TableProps } from "antd";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

interface DataType {
  key: string;
  email: string;
  password: string;
}

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
    render: () => (
      <Space size="middle">
        <a className="text-blue-700 flex items-center">
          {" "}
          <RiEditFill className="text-xl" />
          Edit
        </a>
        <a className="text-red-600 flex  items-center">
          <MdDeleteForever className="text-xl" />
          Delete
        </a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    email: "luubinhngu2duonghai.com",
    password: "123123",
  },
  {
    key: "1",
    email: "ducanhngu@haiduong.vn",
    password: "123123",
  },
  {
    key: "1",
    email: "Namanngu@namdinh.vn",
    password: "123123",
  },
];

const Account_Manager: React.FC = () => (
  <Table<DataType> columns={columns} dataSource={data} />
);

export default Account_Manager;
