import React, { useState } from "react";
import { Button, DatePicker, Table, Typography } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import { ComodatoInterface } from "../../interfaces/ComodatoInterface";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useFetchClientes } from "../../api/hooks/clientes/get_clientes";
import ClientesMultipleSelect from "../Clientes/ClientesMultipleSelect";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formatCurrency } from "../../utils/formatCurrency";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface ComodatosTableProps {
  comodatos: ComodatoInterface[];
}

const ComodatosTable: React.FC<ComodatosTableProps> = ({ comodatos }) => {
  const [filteredClients, setFilteredClients] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const { clientes, loadingClientes } = useFetchClientes();
  const navigate = useNavigate();

  const handleNavigateToDetalle = (id: number) => {
    navigate(`/comodatos/${id}`);
  };

  const columns: ColumnsType<ComodatoInterface> = [
    {
      title: "Cliente",
      dataIndex: ["cliente", "nombre"],
      key: "cliente.nombre",
    },
    {
      title: "Representante de Venta",
      dataIndex: ["representante_venta", "codigo"],
      key: "representante_venta.codigo",
      align: "center"
    },
    {
      title: "Fecha de Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
      align: "center",
      render:(date: string) => `${dayjs(date).format("DD/MM/YYYY")}`
    },
    {
      title: "Objetivo de Compra Mensual",
      dataIndex: "compra_minima_mensual_dinero",
      key: "compra_minima_mensual_dinero",
      align: "center",
      render: (value: number) => `${formatCurrency(value, 'CLP')}`,
    },
    {
      title: "Compra Mensual Realizada",
      dataIndex: "compra_minima_mensual_dinero",
      key: "compra_minima_mensual_dinero",
      align: "center",
      render: (value: number) => `${formatCurrency(value, 'CLP')}`,
    },
    {
      title: "Objetivo de Compra Reactivos",
      dataIndex: "compra_minima_mensual_reactivo",
      key: "compra_minima_mensual_reactivo",
      align: "center",
      render: (value: number) => `${formatCurrency(value, 'CLP')}`,
    },
    {
      title: "Compra de Reactivos Realizada",
      dataIndex: "compra_minima_mensual_reactivo",
      key: "compra_minima_mensual_reactivo",
      align: "center",
      render: (value: number) => `${formatCurrency(value, 'CLP')}`,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      filters: [
        { text: "Vigente", value: "Vigente" },
        { text: "Pendiente", value: "Pendiente" },
      ],
      onFilter: (value, record) => record.estado.indexOf(value as string) === 0,
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
      render: (_: any, record: ComodatoInterface) => (
        <Button
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
    const matchesClient = filteredClients.length
      ? filteredClients.includes(comodato.cliente.id.toString())
      : true;

    const matchesDateRange =
      dateRange && dateRange[0] && dateRange[1]
        ? dayjs(comodato.fecha_fin).isBetween(
            dateRange[0],
            dateRange[1],
            "day",
            "[]"
          )
        : true;

    return matchesClient && matchesDateRange;
  });

  return (
    <>
      <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-4">
        <ClientesMultipleSelect
          clientes={clientes}
          loading={loadingClientes}
          setFilteredClients={setFilteredClients}
        />

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

export default ComodatosTable;
