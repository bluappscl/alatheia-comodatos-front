import React from "react";
import { Button, Table, Typography } from "antd";
import { FilePdfOutlined, ZoomInOutlined } from "@ant-design/icons";
import { ComodatoInterface } from "../../interfaces/Comodato";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

interface ComodatosTableProps {
  comodatos: ComodatoInterface[];
}

const ComodatosTable: React.FC<ComodatosTableProps> = ({ comodatos }) => {
  const navigate = useNavigate();

  const handleNavigateToDetalle = (id: number) => {
    navigate(`/comodatos/${id}`);
  };

  const columns: ColumnsType<ComodatoInterface> = [
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
      title: "Compra Mínima Reactivos",
      dataIndex: "compra_minima_mensual_reactivo",
      key: "compra_minima_mensual_reactivo",
      align: "center",
      render: (value: number) => `${value.toLocaleString()}`,
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
      align: "center",
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
      key: "detalle",
      align: "center",
      render: (_: any, record: ComodatoInterface) => (
        <Button onClick={() => handleNavigateToDetalle(record.id)}>
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
      className="bg-blue-400 rounded-xl"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ComodatosTable;
