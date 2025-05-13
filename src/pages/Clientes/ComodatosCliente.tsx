"use client"

import React, { useState, useEffect } from "react";
import { Table, DatePicker, Select, Card, Button, Tag, Tooltip, Spin } from "antd";
import {  ReloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { TableProps } from "antd";
import axiosInstance from "../../api/axiosInstance";

// Interfaz para los datos de comodato
interface Comodato {
  id: number;
  nombre_cliente: string;
  rut_cliente: string;
  codigo_representante_venta: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  objetivo_compra_mensual: number | null;
  compra_mensual_realizada: string;
  objetivo_cantidad_mensual: number | null;
  cantidad_mensual_realizada: string;
  es_demo: boolean;
  estado: boolean;
}

interface ComodatosClienteProps {
  /** RUT del cliente para filtrar la API */
  rut: string;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const ComodatosCliente: React.FC<ComodatosClienteProps> = ({ rut }) => {
  const [data, setData] = useState<Comodato[]>([]);
  const [filteredData, setFilteredData] = useState<Comodato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [demoFilter, setDemoFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Columnas de la tabla
  const columns: TableProps<Comodato>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, sorter: (a, b) => a.id - b.id },
    {
      title: "Cliente",
      dataIndex: "nombre_cliente",
      key: "nombre_cliente",
      sorter: (a, b) => a.nombre_cliente.localeCompare(b.nombre_cliente),
      render: (text, record) => (
        <Tooltip title={`RUT: ${record.rut_cliente}`}>
          <span className="font-medium">{text}</span>
        </Tooltip>
      ),
    },
    { title: "RUT", dataIndex: "rut_cliente", key: "rut_cliente", responsive: ["md"] },
    {
      title: "Fecha Inicio",
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
      render: (t) => dayjs(t).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.fecha_inicio).unix() - dayjs(b.fecha_inicio).unix(),
    },
    {
      title: "Fecha Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
      responsive: ["lg"],
      render: (t) => (t ? dayjs(t).format("DD/MM/YYYY") : "—"),
    },
    {
      title: "Compra Mensual",
      dataIndex: "compra_mensual_realizada",
      key: "compra_mensual_realizada",
      responsive: ["md"],
      render: (text) => `$${Number(text).toLocaleString("es-CL")}`,
      sorter: (a, b) => Number(a.compra_mensual_realizada) - Number(b.compra_mensual_realizada),
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad_mensual_realizada",
      key: "cantidad_mensual_realizada",
      responsive: ["lg"],
      render: (text) => Number(text).toFixed(2),
    },
    {
      title: "Tipo",
      dataIndex: "es_demo",
      key: "es_demo",
      render: (demo) => <Tag color={demo ? "blue" : "green"}>{demo ? "Demo" : "Regular"}</Tag>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (act) => <Tag color={act ? "success" : "error"}>{act ? "Activo" : "Inactivo"}</Tag>,
    },
  ];

  // Función para obtener datos de la API
  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get<{ comodatos: Comodato[] }>(`/comodatos/?rut_cliente=${rut}`)
      .then(({ data }) => {
        setData(data.comodatos);
        setFilteredData(data.comodatos);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Efecto inicial al montar y al cambiar rut
  useEffect(() => {
    fetchData();
  }, [rut]);

  // Aplica todos los filtros
  useEffect(() => {
    let result = [...data];
    if (searchText) {
      const s = searchText.toLowerCase();
      result = result.filter(
        (i) =>
          i.nombre_cliente.toLowerCase().includes(s) ||
          i.rut_cliente.toLowerCase().includes(s)
      );
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].startOf("day");
      const end = dateRange[1].endOf("day");
      result = result.filter((i) => {
        const d = dayjs(i.fecha_inicio);
        return d.isAfter(start) && d.isBefore(end);
      });
    }
    if (demoFilter !== "all") {
      result = result.filter((i) => i.es_demo === (demoFilter === "demo"));
    }
    if (statusFilter !== "all") {
      result = result.filter((i) => i.estado === (statusFilter === "active"));
    }
    setFilteredData(result);
  }, [searchText, dateRange, demoFilter, statusFilter, data]);

  // Resetear filtros y volver a cargar
  const onRefresh = () => {
    setSearchText("");
    setDateRange(null);
    setDemoFilter("all");
    setStatusFilter("all");
    fetchData();
  };

  return (
    <Card className="shadow-md">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* <Input
            placeholder="Buscar cliente o RUT"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full md:w-64"
            allowClear
          /> */}
          <RangePicker
            value={dateRange}
            onChange={(d) => setDateRange(d as [dayjs.Dayjs, dayjs.Dayjs])}
            className="w-full md:w-auto"
          />
          <Select value={demoFilter} onChange={setDemoFilter} className="w-full md:w-32">
            <Option value="all">Todos</Option>
            <Option value="demo">Demo</Option>
            <Option value="regular">Regular</Option>
          </Select>
          <Select value={statusFilter} onChange={setStatusFilter} className="w-full md:w-32">
            <Option value="all">Todos</Option>
            <Option value="active">Activos</Option>
            <Option value="inactive">Inactivos</Option>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button icon={<ReloadOutlined />} onClick={onRefresh} title="Recargar datos">
            Limpiar Filtros
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Total: ${t} comodatos` }}
          scroll={{ x: "max-content" }}
          size="middle"
          className="w-full"
        />
      )}
    </Card>
  );
};

export default ComodatosCliente;
