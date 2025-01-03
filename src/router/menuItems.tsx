import { MenuProps } from "antd";
import { Link } from "react-router-dom";

import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  
export const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      icon: <LaptopOutlined />,
      label: <Link to="/clientes">Contactos</Link>,
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      label: <Link to="/nuevo-comodato">Nuevo Comodato</Link>,
    },
    {
      key: "4",
      icon: <LaptopOutlined />,
      label: <Link to="/nuevo-comodato">Insumos</Link>,
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: <Link to="/nuevo-comodato">Instrumentos</Link>,
    },
  ];