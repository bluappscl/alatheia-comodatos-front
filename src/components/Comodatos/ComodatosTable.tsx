import React, { useState, useEffect } from "react";
import { Button, DatePicker, Table, Tooltip, Typography } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formatCurrency } from "../../utils/formatCurrency";
import axiosInstance from "../../api/axiosInstance";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

// 1. Interfaz ajustada a lo que devuelve tu API
export interface ComodatoInterface {
  id: number;
  nombre_cliente: string;
  rut_cliente: string;
  codigo_representante_venta: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  objetivo_compra_mensual: string;
  compra_mensual_realizada: string;
  objetivo_cantidad_mensual: string;
  cantidad_mensual_realizada: string;
  estado: boolean;
}

const ComodatosTable: React.FC = () => {
  const [comodatos, setComodatos] = useState<ComodatoInterface[]>([]);
  // const [filteredClients, setFilteredClients] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  console.log('dateRange', dateRange)

  const navigate = useNavigate();

  // 2. Fetch de comodatos al montar el componente
  useEffect(() => {
    axiosInstance
      .get<{ comodatos: ComodatoInterface[] }>("/comodatos/")
      .then((res) => setComodatos(res.data.comodatos))
      .catch((err) => {
        console.error("Error al obtener comodatos:", err);
      });
  }, []);

  const handleNavigateToDetalle = (id: number) => {
    navigate(`/comodato/${id}`);
  };

  // 3. Columnas sin modificaciones (solo renombradas a los campos de la API)
  const columns: ColumnsType<ComodatoInterface> = [
    {
      title: "Cliente",
      dataIndex: "nombre_cliente",
      key: "nombre_cliente",
    },
    {
      title: "RUT Cliente",
      dataIndex: "rut_cliente",
      key: "rut_cliente",
      align: "center",
    },
    {
      title: "Representante de Venta",
      dataIndex: "codigo_representante_venta",
      key: "codigo_representante_venta",
      align: "center",
    },
    {
      title: "Fecha de Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
      align: "center",
      render: (date: string | null) =>
        date ? dayjs(date).format("DD/MM/YYYY") : "-",
    },
    {
      title: "Objetivo Compra $",
      dataIndex: "objetivo_compra_mensual",
      key: "objetivo_compra_mensual",
      align: "center",
      render: (value: string) => formatCurrency(Number(value), "CLP"),
    },
    {
      title: "Compra $ Realizada",
      dataIndex: "compra_mensual_realizada",
      key: "compra_mensual_realizada",
      align: "center",
      render: (value: string) => formatCurrency(Number(value), "CLP"),
    },
    {
      title: "Objetivo Reactivos",
      dataIndex: "objetivo_cantidad_mensual",
      key: "objetivo_cantidad_mensual",
      align: "center",
      render: (value: string) => value,
    },
    {
      title: "Reactivos Realizados",
      dataIndex: "cantidad_mensual_realizada",
      key: "cantidad_mensual_realizada",
      align: "center",
      render: (value: string) => value,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      filters: [
        { text: "Vigente", value: true },
        { text: "Pendiente", value: false },
      ],
      onFilter: (value, record) => record.estado === value,
      render: (estado: boolean) => (
        <Typography.Text
          className={estado ? "text-green-600" : "text-red-600"}
        >
          {estado ? "Vigente" : "Pendiente"}
        </Typography.Text>
      ),
    },
    {
      title: "Detalle",
      key: "detalle",
      align: "center",
      render: (_: any, record: ComodatoInterface) => (
        <Tooltip title="Ver Detalle del Comodato">
        <Button onClick={() => handleNavigateToDetalle(record.id)}>
          <ZoomInOutlined />
        </Button>
        </Tooltip>
      ),
    },
  ];

  // Filtrado por clientes y rango de fechas (igual al tuyo)
  // const filteredData = comodatos.filter((c) => {
  //   const matchesClient = filteredClients.length
  //     ? filteredClients.includes(c.rut_cliente)
  //     : true;

  //   const matchesDateRange =
  //     dateRange && dateRange[0] && dateRange[1]
  //       ? dayjs(c.fecha_fin).isBetween(
  //           dateRange[0],
  //           dateRange[1],
  //           "day",
  //           "[]"
  //         )
  //       : true;

  //   return matchesClient && matchesDateRange;
  // });

  return (
    <>
      <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-4">
        {/* <ClientesMultipleSelect
          clientes={clientes}
          loading={loadingClientes}
          setFilteredClients={setFilteredClients}
        /> */}

        <div className="flex flex-row w-full gap-2 items-center">
          <RangePicker className="w-full" onChange={setDateRange} />
        </div>
      </div>

      <Table
        dataSource={comodatos}
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
