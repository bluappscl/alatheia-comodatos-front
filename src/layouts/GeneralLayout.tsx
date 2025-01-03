import alatheia_logo from "../assets/alatheia-logo.svg";
import alatheia_logo_no_logo from "../assets/alatheia-logo-no-text.svg";
import React, { useState } from "react";
import { Layout, Menu, Tooltip } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { items } from "../router/menuItems";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";

import { LogoutOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

const GeneralLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // const [themeState, setThemeState] = useState("light");

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const siderWidth = collapsed ? 80 : 200;

  // Get breadcrumbs from context
  const breadCrumItems = useBreadcrumbContext((state) => state.items);
  console.log(breadCrumItems);
  // Map route paths to menu keys
  const pathToKeyMap: Record<string, string> = {
    "/": "1",
    "/clientes": "2",
    "/mypage": "3",
    "/nuevo-comodato": "4",
  };

  // Find the last breadcrumb's path and map it to a key
  const activeKey = breadCrumItems.length
    ? pathToKeyMap[breadCrumItems[breadCrumItems.length - 1]?.path ?? "/"]
    : "1"; // Default to home if no breadcrumbs

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        onBreakpoint={(broken) => setIsMobile(broken)}
        theme="light"
        width={siderWidth}
        style={{
          position: "fixed",
          height: "100vh",
          borderRight: "1px gray",
          zIndex: isMobile ? 100 : "auto",
        }}
        className="bg-blue-400"
      >
        <div className="flex flex-col items-center p-4">
          <img className="h-12 w-fit" src={alatheia_logo} alt="Logo" />
        </div>
        <hr className="my-2 mt-2.5" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="bg-blue-400"
        />
      </Sider>
      <Layout
        className="bg-blue-50"
        style={{
          marginLeft: isMobile ? 0 : siderWidth,
          transition: "margin-left 0.2s",
        }}
      >
        <div className="flex mb-4 bg-blue-400 p-6 items-center justify-between border-b-2 border-white">
          <div></div>
          <Tooltip title="Cerrar Sesion">
            <div className="flex items-center justify-center rounded-full bg-white hover:bg-gray-300 cursor-pointer">
              <LogoutOutlined
                className="text-3xl m-1.5 text-error-500"
                onClick={() => handleLogout()}
              />
            </div>
          </Tooltip>
        </div>
        {/* {collapsed && (  */}
        <Content
          className={`bg-blue-50 rounded-lg h-max`}
          style={{ paddingTop: 64 }}
        >
          <div className="-mt-12">
            <Outlet />
          </div>
        </Content>
        {/* )} */}
      </Layout>
    </Layout>
  );
};

export default GeneralLayout;
