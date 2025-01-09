import { MenuProps } from "antd";
import { Link } from "react-router-dom";

import {
    LaptopOutlined,
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
      label: <Link to="/comodatos">Comodatos</Link>,
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      label: <Link to="/nuevo-comodato">Nuevo Comodato</Link>,
    },
    // {
    //   key: "3",
    //   icon: <LaptopOutlined />,
    //   label: <Link to="/clientes">Clientes</Link>,
    // },
    // {
    //   key: "5",
    //   icon: <LaptopOutlined />,
    //   label: <Link to="/insumos">Insumos</Link>,
    // },
    // {
    //   key: "6",
    //   icon: <LaptopOutlined />,
    //   label: <Link to="/instrumentos">Instrumentos</Link>,
    // },
  ];