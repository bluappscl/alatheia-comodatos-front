import React, { useState } from "react";

import { Layout, Menu, MenuProps, theme } from "antd";
import { Outlet } from "react-router-dom";
import logo_blanco from "../assets/alatheia-logo.svg"
import { items } from "../router/menuItems";

const { Content, Sider } = Layout;

const LayoutBack: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="my-5 mx-4">
          <img src={logo_blanco} />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content>
          <div
            className="h-full overflow-auto"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="p-10">
              <Outlet />
            </div>
            {/* <img src={footerimg} /> */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutBack;
