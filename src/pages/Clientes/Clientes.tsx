import React, { useEffect, useState } from "react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import clientes_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import { Table, TableColumnsType, Input, Button, Tooltip, Card, Badge, Row, Col, Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusOutlined, UserOutlined, ToolOutlined, DollarOutlined, ExclamationCircleOutlined, SearchOutlined, FileTextOutlined,  MinusOutlined } from "@ant-design/icons";
import { TrendingDownIcon, TrendingUp } from "lucide-react";

interface Cliente {
  rut: string;
  nombre: string;
  numero_instrumentos: number;
  consumo_esperado: number;
  consumo_realizado: number;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<{ clientes: Cliente[] }>("/comodatos/clientes/con-comodatos/");
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
    navigate('/comodatos/crear-general');
  };

  // Calculate statistics
  const totalInstrumentos = clientes.reduce((sum, cliente) => sum + cliente.numero_instrumentos, 0);
  const totalConsumoEsperado = clientes.reduce((sum, cliente) => sum + cliente.consumo_esperado, 0);
  const clientesSinConsumo = clientes.filter(cliente => cliente.consumo_realizado === 0).length;

  // Function to get status badge
  const getStatusBadge = (consumoEsperado: number, consumoRealizado: number) => {
    if (consumoRealizado === 0) {
      return (
        <Badge color="default">
          <MinusOutlined /> Sin Consumo
        </Badge>
      );
    } else if (consumoRealizado < consumoEsperado) {
      return (
        <Badge color="warning">
          <TrendingDownIcon /> Bajo Esperado
        </Badge>
      );
    } else {
      return (
        <Badge color="success">
          <TrendingUp /> Óptimo
        </Badge>
      );
    }
  };
  const filteredClientes = clientes.filter((cliente) =>
    cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente?.rut?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableColumnsType<Cliente> = [    {
      title: "RUT",
      dataIndex: "rut",
      key: "rut",
      width: 120,
      render: (rut: string) => (
        <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>{rut}</span>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 200,
    },    {
      title: "N° Instrumentos",
      dataIndex: "numero_instrumentos",
      key: "numero_instrumentos",
      width: 120,
      align: 'center',
      render: (value: number) => (
        <Badge count={value} showZero style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: "Consumo Esperado",
      dataIndex: "consumo_esperado",
      key: "consumo_esperado",
      width: 150,
      align: 'right',
      render: (value: number) => value ? formatCurrency(value, 'CLP') : formatCurrency(0, 'CLP'),
    },    {
      title: "Consumo Realizado",
      dataIndex: "consumo_realizado",
      key: "consumo_realizado",
      width: 150,
      align: 'right',
      render: (value: number) => value ? formatCurrency(value, 'CLP') : formatCurrency(0, 'CLP'),
    },
    {
      title: "Estado",
      key: "estado",
      width: 120,
      align: 'center',
      render: (_, record) => getStatusBadge(record.consumo_esperado, record.consumo_realizado),
    },    {
      title: "Acciones",
      key: "acciones",
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Ver detalle del cliente">
          <Button
            type="link"
            size="small"
            onClick={() => handleViewDetail(record.rut)}
            className="flex items-center gap-1"
          >
            👁️ Ver Detalle
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
      ><HeaderDescripcion
        title="Portal de Comodatos"
        description="Gestiona tus clientes y sus comodatos de manera eficiente"
        photo_path={clientes_photo}
      />

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clientes"
              value={clientes.length}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Instrumentos"
              value={totalInstrumentos}
              prefix={<ToolOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Consumo Esperado"
              value={totalConsumoEsperado}
              formatter={(value) => formatCurrency(Number(value), 'CLP')}
              prefix={<DollarOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sin Consumo"
              value={clientesSinConsumo}
              prefix={<ExclamationCircleOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Barra de acciones */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4">
          {/* Primera fila: Búsqueda y botones principales */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">            <Input
              placeholder="Buscar cliente por nombre o RUT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              className="max-w-md"
            /><div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="default"
                  size="large"
                  icon={<FileTextOutlined />}
                  className="flex-1 sm:flex-none"
                >
                  Generar Reporte
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
      </Card>      <Card 
        title="Lista de Comodatos" 
        extra={<span className="text-gray-500">Gestiona y monitorea todos los comodatos activos</span>}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredClientes}
          rowKey={(record) => record.rut}
          pagination={{ 
            pageSize: 10, 
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} clientes`
          }}
          scroll={{ x: 800 }}
          rowClassName="hover:bg-gray-50 transition-colors"        />
      </Card>
      </motion.div>
    </div>
  );
};

export default Clientes;