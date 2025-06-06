import React, { useEffect, useState } from "react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import clientes_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import {
  Table,
  TableColumnsType,
  Input,
  Button,
  Tooltip,
  Card,
  Badge,
  Statistic,
  message,
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  PlusOutlined,
  UserOutlined,
  ToolOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

// PerformanceTag component to compare expected vs realized values
const PerformanceTag: React.FC<{ expected: number; realized: number }> = ({
  expected,
  realized,
}) => {
  const pct = expected ? (realized / expected) * 100 : 0;
  if (pct >= 100)
    return (
      <Tooltip title="Se logró el 100 % o más de lo esperado">
        <Tag color="green">Excelente</Tag>
      </Tooltip>
    );
  if (pct >= 75)
    return (
      <Tooltip title="Se logró entre el 75 % y el 99 % de lo esperado">
        <Tag color="gold">Bueno</Tag>
      </Tooltip>
    );
  return (
    <Tooltip title="Se logró menos del 75 % de lo esperado">
      <Tag color="red">Bajo</Tag>
    </Tooltip>
  );
};

interface Cliente {
  rut_cliente: string;
  nombre_cliente: string;
  numero_instrumentos: number;
  promedio_objetivo_a_la_fecha: number;
  promedio_realizado_a_la_fecha: number;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<{ clientes: Cliente[] }>(
          "/comodatos/clientes/con-comodatos/"
        );
        setClientes(response.data.clientes);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleViewDetail = (rut: string) => {
    navigate(`/clientes/${rut}`);
  };

  const handleCreateComodato = () => {
    navigate("/nuevo-comodato");
  };

  const handleDownloadReport = async () => {
    setDownloadingReport(true);
    try {
      const response = await axiosInstance.get(
        "/comodatos/reportes/excel/marcas/",
        {
          responseType: "blob",
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Get current date for filename
      const currentDate = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `reporte_marcas_${currentDate}.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success("Reporte descargado exitosamente");
    } catch (error) {
      console.error("Error downloading report:", error);
      message.error(
        "Error al descargar el reporte. Por favor intenta nuevamente."
      );
    } finally {
      setDownloadingReport(false);
    }
  }; // Calculate statistics
  const totalInstrumentos = clientes.reduce(
    (sum, cliente) => sum + cliente.numero_instrumentos,
    0
  );
  const totalPromedioObjetivo = clientes.reduce(
    (sum, cliente) => sum + cliente.promedio_objetivo_a_la_fecha,
    0
  );
  const totalPromedioRealizado = clientes.reduce(
    (sum, cliente) => sum + cliente.promedio_realizado_a_la_fecha,
    0
  );
  const clientesSinConsumo = clientes.filter(
    (cliente) => cliente.promedio_realizado_a_la_fecha === 0
  ).length;

  // Function to get status badge using PerformanceTag logic
  const getStatusBadge = (objetivo: number, realizado: number) => {
    if (realizado === 0) {
      return (
        <Badge color="default">
          <small> Sin Consumo </small>
        </Badge>
      );
    }
    return <PerformanceTag expected={objetivo} realized={realizado} />;
  };
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente?.nombre_cliente
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cliente?.rut_cliente?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns: TableColumnsType<Cliente> = [
    {
      title: "RUT",
      dataIndex: "rut_cliente",
      key: "rut_cliente",
      width: 120,
      render: (rut: string) => (
        <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{rut}</span>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "nombre_cliente",
      key: "nombre_cliente",
      width: 200,
    },
    {
      title: "N° Instrumentos",
      dataIndex: "numero_instrumentos",
      key: "numero_instrumentos",
      width: 120,
      align: "center",
    },
    {
      title: "Objetivo YTD",
      dataIndex: "promedio_objetivo_a_la_fecha",
      key: "promedio_objetivo_a_la_fecha",
      width: 150,
      align: "right",
      render: (value: number) =>
        value ? formatCurrency(value, "CLP") : formatCurrency(0, "CLP"),
    },
    {
      title: "Venta YTD",
      dataIndex: "promedio_realizado_a_la_fecha",
      key: "promedio_realizado_a_la_fecha",
      width: 150,
      align: "right",
      render: (value: number) =>
        value ? formatCurrency(value, "CLP") : formatCurrency(0, "CLP"),
    },
    {
      title: "Estado",
      key: "estado",
      width: 120,
      align: "center",
      render: (_, record) =>
        getStatusBadge(
          record.promedio_objetivo_a_la_fecha,
          record.promedio_realizado_a_la_fecha
        ),
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Tooltip title="Ver detalle del cliente">
          <Button
            type="primary"
            size="small"
            onClick={() => handleViewDetail(record.rut_cliente)}
            className="flex items-center gap-1"
          >
            Ver Detalle
          </Button>
        </Tooltip>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-6 space-y-6"
      >
        <HeaderDescripcion
          title="Portal de Comodatos"
          description="Gestiona tus clientes y sus comodatos de manera eficiente"
          photo_path={clientes_photo}
        />{" "}
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <Card>
            <Statistic
              title="Total Clientes"
              value={clientes.length}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Total Instrumentos"
              value={totalInstrumentos}
              prefix={<ToolOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Objetivo YTD"
              value={totalPromedioObjetivo}
              formatter={(value) => formatCurrency(Number(value), "CLP")}
              prefix={<DollarOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Venta YTD"
              value={totalPromedioRealizado}
              formatter={(value) => formatCurrency(Number(value), "CLP")}
              prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Sin Consumo"
              value={clientesSinConsumo}
              prefix={
                <ExclamationCircleOutlined style={{ color: "#f5222d" }} />
              }
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </div>
        {/* Barra de acciones */}
        <Card className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Primera fila: Búsqueda y botones principales */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Input
                placeholder="Buscar cliente por nombre o RUT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                className="max-w-md"
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="default"
                  size="large"
                  icon={<FileTextOutlined />}
                  onClick={handleDownloadReport}
                  loading={downloadingReport}
                  className="flex-1 sm:flex-none"
                >
                  {downloadingReport
                    ? "Generando..."
                    : "Generar Reporte Marcas"}
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={handleCreateComodato}
                  className="flex-1 sm:flex-none"
                >
                  Crear Comodato General
                </Button>
              </div>
            </div>
          </div>
        </Card>{" "}
        <Card
          title="Lista de Comodatos"
          extra={
            <span className="text-gray-500">
              Gestiona y monitorea todos los comodatos activos
            </span>
          }
        >
          <Table
            loading={loading}
            columns={columns}
            dataSource={filteredClientes}
            rowKey={(record) => record.rut_cliente}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredClientes.length,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ["10", "20", "50", "100", "200"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} de ${total} clientes`,
              onChange: (page, size) => {
                setCurrentPage(page);
                if (size !== pageSize) {
                  setPageSize(size);
                  setCurrentPage(1); // Reset to first page when changing page size
                }
              },
              onShowSizeChange: (size) => {
                setPageSize(size);
                setCurrentPage(1); // Reset to first page when changing page size
              },
            }}
            scroll={{ x: 800 }}
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default Clientes;
