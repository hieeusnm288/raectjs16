import React, { useState, useEffect } from "react";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import { Button, Descriptions, PageHeader, Dropdown, Space, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

function ListThongBao() {
  const [page, setPage] = useState(0);
  const notifications = NotificationsStore();
  const [idDetail, setIdDetail] = useState();
  //   const [fileId, setFileId] = useState();

  const stringToHTML = (str) => {
    var dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
  };

  const navigate = useNavigate();
  const pageDetailNoti = () => {
    // const id = notifications.lstThongBao?.map((data) => data.id);
    navigate(`/utility/general-notifications/view/${idDetail}`);
    // console.log("data detail id: ", id);
  };

  const menudrop = (
    <Menu
      //   defaultSelectedKeys={["1"]}
      mode="inline"
      //   style={{ backgroundColor: "transparent" }}
    >
      <Menu.Item key="1">
        <a
          className="text-black nav-link focus:font-bold"
          onClick={pageDetailNoti}
          style={{ border: "none", width: "100%" }}
        >
          Xem chi tiết
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          className="text-black nav-link focus:font-bold"
          //   onClick={pageDetailNoti}
          style={{ border: "none" }}
        >
          Sửa
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a
          className="text-black nav-link focus:font-bold"
          //   onClick={pageDetailNoti}
          style={{ border: "none" }}
        >
          Xóa
        </a>
      </Menu.Item>
    </Menu>
  );

  const getFile = (fileId, file_name) => {
    notifications.getFile(fileId);
    const url_download = notifications.getFile(fileId);
    const downloadFile = (url) => {
      const fileName = file_name;
      const eTag = document.createElement("a");
      eTag.href = url;
      eTag.setAttribute("download", fileName);
      document.body.appendChild(eTag);
      eTag.click();
      eTag.remove();
    };
    if (fileId) {
      downloadFile(url_download);
    }
  };

  useEffect(() => {
    notifications.getListThongBao(page);
  }, []);
  //   console.log(notifications.lstThongBao);
  return (
    <div className="d-flex w-100 flex-wrap">
      {notifications.lstThongBao?.map((noti, index) => (
        <div
          className="site-page-header-ghost-wrapper mx-3 mt-3"
          style={{ width: "48%" }}
        >
          <PageHeader
            ghost={false}
            title={noti.subject}
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
                      onClick={() => setIdDetail(noti.id)}
                    />
                  </Space>
                </a>
              </Dropdown>,
            ]}
          >
            <Descriptions size="small" column={1} style={{ textAlign: "left" }}>
              <Descriptions.Item>
                {stringToHTML(noti.content).textContent}
              </Descriptions.Item>
              <Descriptions.Item label="Tài liệu đính kèm">
                {noti.attachments ? (
                  <a
                    // href={noti.attachments[0]?.file_name}
                    onClick={() =>
                      getFile(
                        noti.attachments[0]?.file_id,
                        noti.attachments[0]?.file_name
                      )
                    }
                    style={{ textDecoration: "none" }}
                  >
                    {noti.attachments[0]?.file_name}
                  </a>
                ) : (
                  ""
                )}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      ))}
    </div>
  );
}

export default ListThongBao;
