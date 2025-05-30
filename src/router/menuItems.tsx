import { MenuProps } from "antd";
import { Link } from "react-router-dom";

import {
  LaptopOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/">Inicio</Link>,
  },
  {
    key: "4",
    icon: <LaptopOutlined />,
    label: <Link to="/clientes">Clientes</Link>,
  },
  {
    key: "sub1",
    label: "Comodatos",
    icon: <SettingOutlined />,
    children: [


      {
        key: "2",
        icon: <LaptopOutlined />,
        label: <Link to="/comodatos">Listado</Link>,
      },
      {
        key: "3",
        icon: <LaptopOutlined />,
        label: <Link to="/nuevo-comodato">Crear</Link>,
      },
 
    ],
  },

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
