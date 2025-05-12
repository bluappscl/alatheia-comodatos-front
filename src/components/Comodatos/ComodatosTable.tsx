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

/* ────────────────────────────────────────────
   1. Interfaz ajustada (se añade es_demo)
   ──────────────────────────────────────────── */
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
  es_demo: boolean;         
}

const ComodatosTable: React.FC = () => {
  const [comodatos, setComodatos] = useState<ComodatoInterface[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  console.log('dateRange', dateRange)

  const navigate = useNavigate();

  /* ────────────────────────────────────────
     2. Carga inicial de datos
     ──────────────────────────────────────── */
  useEffect(() => {
    axiosInstance
      .get<{ comodatos: ComodatoInterface[] }>("/comodatos/")
      .then((res) => setComodatos(res.data.comodatos))
      .catch((err) => console.error("Error al obtener comodatos:", err));
  }, []);

  const handleNavigateToDetalle = (id: number) => navigate(`/comodato/${id}`);

  /* ────────────────────────────────────────
     3. Columnas de la tabla
     ──────────────────────────────────────── */
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
    },
    {
      title: "Reactivos Realizados",
      dataIndex: "cantidad_mensual_realizada",
      key: "cantidad_mensual_realizada",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      filters: [
        { text: "Vigente", value: true },
        { text: "Pendiente", value: false },
      ],
      onFilter: (value, record) => record.estado === value,
      render: (estado: boolean) => (
        <Typography.Text className={estado ? "text-green-600" : "text-red-600"}>
          {estado ? "Vigente" : "Pendiente"}
        </Typography.Text>
      ),
    },
    /* ───────────────────────────────────
       NUEVA COLUMNA → filtro Demo
       ─────────────────────────────────── */
    {
      title: "Tipo",
      dataIndex: "es_demo",
      key: "es_demo",
      align: "center",
      filters: [
        { text: "Demos", value: true },
        { text: "Comodato", value: false },
      ],
      onFilter: (value, record) => record.es_demo === value,
      render: (val: boolean) => (val ? "Demo" : "Comodato"),
    },
    {
      title: "Detalle",
      key: "detalle",
      align: "center",
      render: (_, record) => (
        <Tooltip title="Ver Detalle del Comodato">
          <Button onClick={() => handleNavigateToDetalle(record.id)}>
            <ZoomInOutlined />
          </Button>
        </Tooltip>
      ),
    },
  ];

  /* ────────────────────────────────────────
     4. Rango de fechas (si lo necesitas)
     ──────────────────────────────────────── */
  // Si más adelante quieres combinar este filtro de Demos con un rango de fechas,
  // basta con descomentar el bloque y alimentar `dataSource` con filteredData.

  /* const filteredData = comodatos.filter((c) => {
    const matchesDateRange =
      dateRange && dateRange[0] && dateRange[1]
        ? dayjs(c.fecha_fin).isBetween(dateRange[0], dateRange[1], "day", "[]")
        : true;
    return matchesDateRange;
  }); */

  return (
    <>
      <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-4">
        <div className="flex flex-row w-full gap-2 items-center">
          <RangePicker className="w-full" onChange={setDateRange} />
        </div>
      </div>

      <Table
        /* dataSource={filteredData} */  /* ← usa esto si aplicas rango de fechas */
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
