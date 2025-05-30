// src/layouts/GeneralLayout.tsx
import React from "react";
import { Layout, Menu, Tooltip } from "antd";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import alatheia_logo from "../assets/alatheia-logo.svg";
import { items } from "../router/menuItems";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";

const { Header, Content } = Layout;

const GeneralLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /*  Si las claves de tus <Menu.Item> son rutas completas
      (por ejemplo "/dashboard", "/usuarios"), esto resaltará
      automáticamente el elemento correspondiente.              */
  const selectedKeys = [location.pathname];

  const handleLogout = () => navigate("/login");

  //  Si usas el contexto de breadcrumb en otras vistas,
  //  lo conservamos para no romper dependencias.
  const breadCrumItems = useBreadcrumbContext((state) => state.items);
  console.debug("Breadcrumb:", breadCrumItems);

  return (
    <Layout className="min-h-screen">
      {/* --- TOP BAR --- */}
      <Header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-blue-400 px-4 md:px-6">
        {/* Logo + Menú */}
        <div className="flex items-center gap-4">
          <img
            src={alatheia_logo}
            alt="Alatheia"
            className="h-8 w-auto select-none"
          />

          {/* Navegación principal */}
          <Menu
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={items}
            className="bg-transparent text-white font-medium"
          />
        </div>

        {/* Botón de logout */}
        <Tooltip title="Cerrar sesión">
          <button
            onClick={handleLogout}
            className="grid h-9 w-9 place-items-center rounded-full bg-white transition-colors hover:bg-gray-200"
          >
            <LogoutOutlined className="text-error-500 text-lg" />
          </button>
        </Tooltip>
      </Header>

      {/* --- CONTENIDO --- */}
      <Content className="pt-16 bg-blue-50">
        <div className="mx-auto max-w-screen-xl px-4 py-6">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default GeneralLayout;
