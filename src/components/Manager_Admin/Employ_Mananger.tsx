import React from "react";
import { Space, Table, Tag } from "antd";
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

const Employ_Manager: React.FC = () => (
  <Table<DataType> columns={columns} dataSource={data} />
);

export default Employ_Manager;
