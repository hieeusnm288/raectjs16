import { Tabs } from "antd";
import React from "react";
import DanhSachTK from "./DanhSachTK";
function TaiKhoan() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Tabs defaultActiveKey="1" style={{ width: "95%", margin: "0 auto" }}>
        <Tabs.TabPane tab="Tài Khoản" key="1">
          <DanhSachTK />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Phần Mềm" key="2">
          Phần Mền
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TaiKhoan;
