import React, { useState } from "react";
import { Select, Space } from "antd";
import Calendar_Manager from "./Manager_Admin/Calendar";
import Employ_Manager from "./Manager_Admin/Employ_Mananger";
import Account_Manager from "./Manager_Admin/Account_Manager";

const HomePage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("lich");

  const Selectionsadmin = () => {
    return (
      <Space wrap className="pb-4 pl-4">
        <Select
          value={selectedValue}
          style={{ width: 120 }}
          onChange={handleSelections}
          options={[
            { value: "qlynv", label: "Manager Human" },
            { value: "lich", label: "Calendars" },
            { value: "qlytk", label: "Manager Account" },
          ]}
        />
      </Space>
    );
  };

  const handleSelections = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="mt-4 ">
      <Selectionsadmin />
      {selectedValue === "lich" && <Calendar_Manager />}
      {selectedValue === "qlynv" && <Employ_Manager />}
      {selectedValue === "qlytk" && <Account_Manager />}
    </div>
  );
};

export default HomePage;
