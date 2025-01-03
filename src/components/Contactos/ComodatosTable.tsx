import React from "react";
import { Button, Table, Typography } from "antd";
import { FilePdfOutlined, ZoomInOutlined } from "@ant-design/icons";

interface Comodato {
  id: number;
  contrato: string;
  compra_minima_mensual_dinero: number;
  compra_minima_anual_dinero: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
}

interface ComodatosTableProps {
  comodatos: Comodato[];
}

const ComodatosTable: React.FC<ComodatosTableProps> = ({ comodatos }) => {
  const columns = [
    {
      title: "Fecha de Inicio",
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
    },
    {
      title: "Fecha de Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
    },
    {
      title: "Compra Mínima Mensual (CLP)",
      dataIndex: "compra_minima_mensual_dinero",
      key: "compra_minima_mensual_dinero",
      align: "center",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Compra Mínima Anual (CLP)",
      dataIndex: "compra_minima_anual_dinero",
      key: "compra_minima_anual_dinero",
      align: "center",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: string) => (
        <Typography.Text
          className={estado === "Activo" ? "text-green-600" : "text-red-600"}
        >
          {estado}
        </Typography.Text>
      ),
    },
    {
      title: "Contrato",
      dataIndex: "contrato",
      key: "contrato",
      align:"center",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button>
            Ver Contrato <FilePdfOutlined />
          </Button>
        </a>
      ),
    },
    {
      title: "Detalle",
      dataIndex: "detalle",
      key: "detalle",
      align:"center",
      render: (url: string) => (
        <Button>
          <ZoomInOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={comodatos}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ComodatosTable;
