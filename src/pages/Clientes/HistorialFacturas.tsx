
import React, { useState, useEffect } from "react";
import { Table, Card, Badge,  Statistic, Select, Spin } from "antd";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  // Download,
  // Printer,
//   Search as SearchIcon,
  Filter as FilterIcon,
  FileText
} from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import "dayjs/locale/es";
import axiosInstance from "../../api/axiosInstance";

// Tipos de datos
interface InvoiceDetail {
  fecha: string;
  numero_factura: number;
  valor_pagado: number;
}

interface MonthlyInvoice {
  agno: number;
  mes: number;
  total_facturas: number;
  total_pagado: number;
  detalle: InvoiceDetail[];
}

interface InvoiceHistoryProps {
  historial: MonthlyInvoice[];
}

// Componente de historial
const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({ historial }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
//   const [searchText, setSearchText] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  // Ordenar por fecha
  const sortedHistorial = [...historial].sort((a, b) => {
    if (a.agno !== b.agno) return b.agno - a.agno;
    return b.mes - a.mes;
  });

  // Filtrar por año
  const filteredHistorial = yearFilter
    ? sortedHistorial.filter((item) => item.agno === yearFilter)
    : sortedHistorial;

  // Años únicos
  const uniqueYears = Array.from(new Set(historial.map((item) => item.agno))).sort((a, b) => b - a);

  const formatMonth = (m: number) => dayjs().month(m - 1).locale('es').format('MMMM');

  const detailColumns: ColumnsType<InvoiceDetail> = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.fecha).unix() - dayjs(b.fecha).unix(),
    },
    {
      title: "Número de Factura",
      dataIndex: "numero_factura",
      key: "numero_factura",
      render: (val) => (
        <span className={val < 0 ? "text-red-500" : "text-purple-900 font-medium"}>
          {Math.abs(val).toString().padStart(8, "0")}
        </span>
      ),
    },
    {
      title: "Total Pagado",
      dataIndex: "valor_pagado",
      key: "valor_pagado",
      align: "right",
      render: (val) => (
        <span className={val < 0 ? "text-red-500 font-medium" : "font-medium"}>
          {val < 0 ? "-" : ""}${Math.abs(val).toLocaleString()}
        </span>
      ),
      sorter: (a, b) => a.valor_pagado - b.valor_pagado,
    },
    // {
    //   title: "Acciones",
    //   key: "actions",
    //   width: 120,
    //   render: () => (
    //     <div className="flex space-x-2">
    //       <Tooltip title="Descargar PDF">
    //         <button className="text-gray-600 hover:text-blue-600">
    //           <Download size={18} />
    //         </button>
    //       </Tooltip>
    //       <Tooltip title="Imprimir">
    //         <button className="text-gray-600 hover:text-blue-600">
    //           <Printer size={18} />
    //         </button>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];

  const handleExpand = (key: string) =>
    setExpandedGroups((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const totalInvoices = filteredHistorial.reduce((sum, i) => sum + i.total_facturas, 0);
  const totalAmount = filteredHistorial.reduce((sum, i) => sum + i.total_pagado, 0);

  return (
    <div>
      {/* Header */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Historial de Facturas</h1>
            <p className="text-gray-500">Visualiza y gestiona todas tus facturas</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Select
              placeholder="Filtrar por año"
              allowClear
              className="w-40"
              onChange={(val) => setYearFilter(val)}
              options={uniqueYears.map((y) => ({ value: y, label: y.toString() }))}
              suffixIcon={<FilterIcon size={16} />}
            />
            {/* <div className="relative">
              <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar factura..."
                className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 border border-blue-100">
            <Statistic
              title="Total Facturas"
              value={totalInvoices}
              prefix={<FileText size={20} className="text-blue-500 mr-2" />}
            />
          </Card>
          <Card className="bg-green-50 border border-green-100">
            <Statistic
              title="Total Pagado"
              value={totalAmount}
              prefix="$"
              precision={0}
              formatter={(v) => v.toLocaleString()}
            />
          </Card>
     
        </div>
      </Card>
      {/* Detalles */}
      <div className="space-y-4">
        {filteredHistorial.map((item) => {
          const key = `${item.agno}-${item.mes}`;
          const expanded = expandedGroups.includes(key);
          return (
            <Card key={key} className="shadow-sm hover:shadow-md transition-shadow" bodyStyle={{ padding: 0 }}>
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => handleExpand(key)}
              >
                <div className="flex items-center">
                  <Calendar className="text-purple-900 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {formatMonth(item.mes)} {item.agno}
                    </h3>
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      <span>Facturas: {item.total_facturas}</span>
                      <span className="font-medium">Total: ${item.total_pagado.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge count={item.total_facturas} className="mr-3" />
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              {expanded && (
                <div className="border-t">
                  <Table
                    columns={detailColumns}
                    dataSource={item.detalle.map((d) => ({ ...d, key: `${d.fecha}-${d.numero_factura}` }))}
                    pagination={false}
                    size="middle"
                    className="invoice-detail-table"
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>

    </div>
  );
};

// Página que consume la API
const HistorialFacturas = ({ rut }: { rut: string }) => {
    const [historial, setHistorial] = useState<MonthlyInvoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!rut) return;
        setLoading(true);
        axiosInstance
            .get<{ historial: MonthlyInvoice[] }>(`/comodatos/clientes/${rut}/historial/facturas/`)
            .then(({ data }) => {
                setHistorial(data.historial);
            })
            .catch((e) => {
                console.error(e);
                setError("Error al cargar el historial");
            })
            .finally(() => setLoading(false));
    }, [rut]);

    if (loading) return <div className="flex justify-center items-center h-full"><Spin tip="Cargando..." /></div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return <InvoiceHistory historial={historial} />;
};
export default HistorialFacturas;