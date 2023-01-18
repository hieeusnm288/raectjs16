import { Layout, Menu, Dropdown, Space, Breadcrumb } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../../service/Appservice";
const { Header, Content, Sider } = Layout;

function TrangChu({ children }) {
  //   const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate();
  // console.log("param: ", param);
  const menudrop = (
    <Menu
      defaultSelectedKeys={["1"]}
      mode="inline"
      style={{ backgroundColor: "transparent" }}
    >
      <Menu.Item key="1">
        <NavLink className="text-black nav-link focus:font-bold" to="/">
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const [userInfo, setUserInfo] = useState({});
  const getInfoUser = async () => {
    let res = await getUser();
    // console.log("res;", res);
    setUserInfo(res);
  };
  useEffect(() => {
    getInfoUser();
  }, []);
  // console.log("userInfo: ", userInfo.name_uppercase);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        className="header"
        style={{
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" style={{ width: "10%", marginTop: "5px" }}>
          <img src="https://stg.vimc.fafu.com.vn/assets/photos/portal_logo_white.png" />
        </div>
        <Dropdown overlay={menudrop}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "white" }}>
              {userInfo.name_uppercase}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        {/* <div>
          <p style={{ color: "white", margin: "0 auto" }}>
            {userInfo.name_uppercase}
          </p>
        </div>
        <div>
          <NavLink to="/">Logout</NavLink>
        </div> */}
      </Header>
      <Layout>
        <Sider width={200} style={{ backgroundColor: "white" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ backgroundColor: "transparent" }}
          >
            <Menu.Item key="/home">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Trang chủ
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/company-work-schedule">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/company-work-schedule"
              >
                Lịch cơ quan
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Thông báo chung
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Danh bạ
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Tài Khoản
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundColor: "#e6f7ff",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default TrangChu;
