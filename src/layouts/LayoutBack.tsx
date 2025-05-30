// src/layouts/LayoutBack.tsx
import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import logo_blanco from "../media/logos/alatheia-logo-blanco.svg";
import { items } from "../router/menuItems";

const { Header, Content } = Layout;

const LayoutBack: React.FC = () => {
  const location = useLocation();

  // Ant Design tokens que ya usabas para el fondo del contenedor
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Resalta el item del menú según la ruta actual (opcional)
  const selectedKeys = [location.pathname];

  return (
    <Layout className="min-h-screen">
      {/* ---------- NAVBAR / TOPBAR ---------- */}
      <Header className="fixed inset-x-0 top-0 z-50 flex items-center gap-6 bg-[#001529] px-14 py-2">
        {/* Logo */}
        <img src={logo_blanco} alt="Alatheia" className="h-8 w-auto select-none" />

        {/* Menú horizontal */}
        
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          selectedKeys={selectedKeys}
          className="bg-transparent flex-1"
        />
      </Header>

      {/* ---------- CONTENIDO ---------- */}
      <Content className="pt-16">
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
