import React, { useState } from "react";
import { Select, Space } from "antd";
import Calendar_Manager from "./Manager_Admin/Calendar";
import Employ_Manager from "./Manager_Admin/Employ_Mananger";

const HomePage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const Selectionsadmin = () => {
    return (
      <Space wrap className="pb-4 pl-4">
        <Select
          defaultValue="Calendars"
          style={{ width: 120 }}
          onChange={handleSelections}
          options={[
            { value: "qlynv", label: "Manager Human" },
            { value: "lich", label: "Calendars" },
            { value: "qlytk", label: "Manager Account" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Space>
    );
  };

  const handleSelections = (value: string) => {
    setSelectedValue(value);
    console.log(value); // In giá trị đã chọn ra console (có thể loại bỏ khi không cần)
  };

  return (
    <div className="mt-4 ">
      <Selectionsadmin/>
      {/* Hiển thị Calendar khi chọn "lich" */}
      {selectedValue === "lich" && <Calendar_Manager />}
      {selectedValue === "qlynv" && <Employ_Manager />}
    </div>
  );
};

export default HomePage;
