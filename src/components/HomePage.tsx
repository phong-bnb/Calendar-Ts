// import React, { useState } from "react";
// import { Select, Space } from "antd";
// import Calendar_Manager from "./Manager_Admin/Calendar";
// import Employ_Manager from "./Manager_Admin/Employ_Mananger";
// import Account_Manager from "./Manager_Admin/Account_Manager";

// const HomePage: React.FC = () => {
//   const [selectedValue, setSelectedValue] = useState<string>("lich");

//   const Selectionsadmin = () => {
//     return (
//       <Space wrap className="pb-4 pl-4">
//         <Select
//           value={selectedValue}
//           style={{ width: 120 }}
//           onChange={handleSelections}
//           options={[
//             { value: "qlynv", label: "Manager Human" },
//             { value: "lich", label: "Calendars" },
//             { value: "qlytk", label: "Manager Account" },
//           ]}
//         />
//       </Space>
//     );
//   };

//   const handleSelections = (value: string) => {
//     setSelectedValue(value);
//   };

//   return (
//     <div className="mt-4 ">
//       <Selectionsadmin />
//       {selectedValue === "lich" && <Calendar_Manager />}
//       {selectedValue === "qlynv" && <Employ_Manager />}
//       {selectedValue === "qlytk" && <Account_Manager />}
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
import { Select, Space, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import Calendar_Manager from "./Manager_Admin/Calendar";
import Employ_Manager from "./Manager_Admin/Employ_Mananger";
import Account_Manager from "./Manager_Admin/Account_Manager";

const HomePage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("lich");
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  const Selectionsadmin = () => {
    return (
      <Space wrap className="pb-4 pl-4">
        <Select
          value={selectedValue}
          style={{ width: 120 }}
          onChange={handleSelections}
          options={[
            { value: "qlynv", label: "Manager group" },
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

  const handleLogout = () => {
    localStorage.clear(); // Xóa hết local storage
    // navigate("/"); // Điều hướng về trang đăng nhập
    window.location.reload();
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-4">
        <Selectionsadmin />
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="mt-4">
        {selectedValue === "lich" && <Calendar_Manager />}
        {selectedValue === "qlynv" && <Employ_Manager />}
        {selectedValue === "qlytk" && <Account_Manager />}
      </div>
    </div>
  );
};

export default HomePage;
