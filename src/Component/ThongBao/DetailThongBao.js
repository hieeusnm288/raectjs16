import React, { useState, useEffect } from "react";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import { Button, Descriptions, PageHeader, Dropdown, Space, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";

function DetailThongBao() {
  const menudrop = (
    <Menu
      defaultSelectedKeys={["1"]}
      mode="inline"
      //   style={{ backgroundColor: "transparent" }}
    >
      <Menu.Item key="1">
        <a
          className="text-black nav-link focus:font-bold"
          to="/utility/general-notifications"
        >
          Sửa thông tin
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          className="text-black nav-link focus:font-bold"
          to="/utility/general-notifications"
        >
          Xóa
        </a>
      </Menu.Item>
    </Menu>
  );

  const stringToHTML = (str) => {
    var dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
  };

  const notifications = NotificationsStore();
  //   console.log("detail", notifications.detailThongBao);
  var { id } = useParams();
  //   console.log(id);
  //   const getDetailTB = () => {
  //     notifications.getDetail(id)
  //   };

  useEffect(() => {
    notifications.getDetail(id);
  }, []);
  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          title={notifications.detailThongBao?.subject}
          extra={[
            //   <Button
            //     key="1"
            //     style={{ border: "none", width: "40px", height: "40px" }}
            //   >
            //     <MoreOutlined style={{ margin: "0 auto", fontSize: "20px" }} />
            //   </Button>,
            <Dropdown overlay={menudrop} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreOutlined
                    style={{ margin: "0 auto", fontSize: "20px" }}
                  />
                </Space>
              </a>
            </Dropdown>,
          ]}
        >
          <Descriptions size="small" column={1} style={{ textAlign: "left" }}>
            <Descriptions.Item>
              {stringToHTML(notifications.detailThongBao?.content).textContent}
            </Descriptions.Item>
            <Descriptions.Item label="Tài liệu đính kèm">
              {notifications.detailThongBao?.attachments ? (
                <a
                  href={notifications.detailThongBao?.attachments[0]?.file_name}
                  style={{ textDecoration: "none" }}
                >
                  {notifications.detailThongBao?.attachments[0]?.file_name}
                </a>
              ) : (
                ""
              )}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    </div>
  );
}

export default DetailThongBao;
