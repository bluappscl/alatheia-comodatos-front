import React, { useState } from "react";
import { Button, DatePicker, Table, Typography } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ComodatoInterfaceWithoutCliente } from "../../interfaces/ComodatoInterfaceWithoutCliente";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface ComodatosTableProps {
  comodatos: ComodatoInterfaceWithoutCliente[];
}

const ComodatosTableSinCLiente: React.FC<ComodatosTableProps> = ({ comodatos }) => {
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const navigate = useNavigate();

  const handleNavigateToDetalle = (id: number) => {
    navigate(`/comodatos/${id}`);
  };

  const columns: ColumnsType<ComodatoInterfaceWithoutCliente> = [
    {
      title: "Fecha de Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
      align: "center",
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
          className={estado === "Vigente" ? "text-green-600" : "text-red-600"}
        >
          {estado}
        </Typography.Text>
      ),
    },
    // {
    //   title: "Contrato",
    //   dataIndex: "contrato",
    //   key: "contrato",
    //   align: "center",
    //   render: (url: string) => (
    //     <a href={url} target="_blank" rel="noopener noreferrer">
    //       <Button>
    //         Ver Contrato <FilePdfOutlined />
    //       </Button>
    //     </a>
    //   ),
    // },
    {
      title: "Detalle",
      key: "detalle",
      align: "center",
      render: (_: any, record: ComodatoInterfaceWithoutCliente) => (
        <Button
          type="link"
          size="large"
          className="border rounded-full border-primary-700"
          onClick={() => handleNavigateToDetalle(record.id)}
        >
          <ZoomInOutlined />
        </Button>
      ),
    },
  ];

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    setDateRange(dates);
  };

  const filteredData = comodatos.filter((comodato) => {
    const matchesDateRange =
      dateRange && dateRange[0] && dateRange[1]
        ? dayjs(comodato.fecha_fin).isBetween(
            dateRange[0],
            dateRange[1],
            "day",
            "[]"
          )
        : true;

    return  matchesDateRange;
  });

  return (
    <>
      <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-4">
        <div className="flex flex-row w-full gap-2 items-center">
          <RangePicker className="w-full" onChange={handleDateRangeChange} />
        </div>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        className="bg-dark-700 rounded-xl"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 500 }}
      />
    </>
  );
};

export default ComodatosTableSinCLiente;
