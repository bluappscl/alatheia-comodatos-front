// src/layouts/LayoutBack.tsx
import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

import logo_blanco from "../media/logos/alatheia-logo-blanco.svg";

const { Header, Content } = Layout;

const LayoutBack: React.FC = () => {
  // Ant Design tokens que ya usabas para el fondo del contenedor
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      {/* ---------- NAVBAR / TOPBAR ---------- */}
      <Header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-[#001529] px-14 py-2">
        {/* Logo centrado */}
        <img src={logo_blanco} alt="Alatheia" className="h-8 w-auto select-none" />
      </Header>

      {/* ---------- CONTENIDO ---------- */}
      <Content className="pt-16 h-screen">
        <div
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
          className="h-full overflow-auto"
        >
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutBack;
