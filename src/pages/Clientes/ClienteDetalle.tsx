import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Spin,
  Typography,
  message,
  Tooltip,
  Button,
  Modal,
  Collapse,
  Tabs,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Package,
  DollarSign,
  Calendar as CalendarIcon,
  Target,
  Edit,
} from "lucide-react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axiosInstance from "../../api/axiosInstance";
import InstrumentosGestion from "./VerInstrumentosDetalle";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  Legend,
  ArcElement
);

const { Title, Text } = Typography;

/* ---------- Utilidades ---------- */

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);

const getPerformanceColor = (expected: number, realized: number) => {
  const pct = expected ? (realized / expected) * 100 : 0;
  if (pct >= 100) return "text-green-600";
  if (pct >= 75) return "text-yellow-600";
  return "text-red-600";
};

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

/* ---------- Tipos ---------- */

interface Instrumento {
  codigo: string;
  descripcion: string;
  adn: string;
  monto_esperado_mensual: number;
  monto_realizado_mensual: number;
  monto_esperado_anual: number;
  monto_realizado_anual: number;
}

interface Marca {
  comodato_id: number;
  marca: string;
  numero_instrumentos: number;
  monto_esperado_mensual: number;
  monto_realizado_mensual: number;
  monto_esperado_anual: number;
  monto_realizado_anual: number;
  promedio_objetivo_a_la_fecha: number;
  promedio_realizado_a_la_fecha: number;
  instrumentos: Instrumento[];
}

interface ClienteResumen {
  rut: string;
  nombre: string;
  direccion: string;
  codigo_comuna: string;
  region: string;
  numero_instrumentos: number;
  monto_esperado_mensual: number;
  monto_realizado_mensual: number;
  monto_esperado_anual: number;
  monto_realizado_anual: number;
  promedio_objetivo_a_la_fecha: number;
  promedio_realizado_a_la_fecha: number;
  marcas: Marca[];
}

interface APIResponse {
  cliente: ClienteResumen;
}

/* ---------- Componente principal ---------- */

const ClienteDetalle: React.FC = () => {
  const { rut } = useParams<{ rut: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ClienteResumen | null>(null);
  const [loading, setLoading] = useState(true);

  /* Estado para el modal de instrumentos */
  const [modalVisible, setModalVisible] = useState(false);
  const [comodatoId, setComodatoId] = useState<number | null>(null);

  const handleBack = () => {
    navigate("/clientes");
  };

  const openModal = (id: number) => {
    setComodatoId(id);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setComodatoId(null);
  };

  /* --- Cargar datos del cliente --- */
  useEffect(() => {
    if (!rut) return;
    setLoading(true);
    axiosInstance
      .get<APIResponse>(`/comodatos/clientes/${rut}/resumen/`)
      .then((res) => setData(res.data.cliente))
      .catch(() =>
        message.error("No se pudo cargar la información del cliente")
      )
      .finally(() => setLoading(false));
  }, [rut]);
  /* --- Datos para gráficos --- */
  const createBarData = (expectedField: keyof Marca, realizedField: keyof Marca, suffix: string) => {
    if (!data?.marcas) return {
      labels: [],
      datasets: [
        { label: `Esperado ${suffix}`, backgroundColor: "hsl(210 90% 60%)", data: [] },
        { label: `Realizado ${suffix}`, backgroundColor: "hsl(150 90% 45%)", data: [] },
      ],
    };

    return {
      labels: data.marcas.map((m) => m.marca),
      datasets: [
        {
          label: `Esperado ${suffix}`,
          backgroundColor: "hsl(210 90% 60%)",
          data: data.marcas.map((m) => m[expectedField] as number),
        },
        {
          label: `Realizado ${suffix}`,
          backgroundColor: "hsl(150 90% 45%)",
          data: data.marcas.map((m) => m[realizedField] as number),
        },
      ],
    };
  };

  const createPieData = (field: keyof Marca, suffix: string) => {

    console.log('suffix', suffix)
    if (!data?.marcas) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

    const marcasConMonto = data.marcas.filter((m) => (m[field] as number) > 0);

    if (marcasConMonto.length === 0) return {
      labels: ["Sin datos"],
      datasets: [{ data: [1], backgroundColor: ["#e0e0e0"] }],
    };

    return {
      labels: marcasConMonto.map((m) => m.marca),
      datasets: [
        {
          data: marcasConMonto.map((m) => m[field] as number),
          backgroundColor: [
            "#0088FE",
            "#00C49F",
            "#FFBB28",
            "#FF8042",
            "#845EC2",
            "#D65DB1",
          ],
        },
      ],
    };
  };

  // Datos para cada pestaña
  const barDataALaFecha = useMemo(() => 
    createBarData("promedio_objetivo_a_la_fecha", "promedio_realizado_a_la_fecha", "a la fecha"), 
    [data]
  );
  
  const pieDataALaFecha = useMemo(() => 
    createPieData("promedio_objetivo_a_la_fecha", "a la fecha"), 
    [data]
  );

  const barDataMensual = useMemo(() => 
    createBarData("monto_esperado_mensual", "monto_realizado_mensual", "mensual"), 
    [data]
  );
  
  const pieDataMensual = useMemo(() => 
    createPieData("monto_esperado_mensual", "mensual"), 
    [data]
  );

  const barDataAnual = useMemo(() => 
    createBarData("monto_esperado_anual", "monto_realizado_anual", "anual"), 
    [data]
  );
  
  const pieDataAnual = useMemo(() => 
    createPieData("monto_esperado_anual", "anual"), 
    [data]
  );

  /* --- Loading --- */
  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  if (!data) return null;

  const annualPct = data.monto_esperado_anual
    ? (data.monto_realizado_anual / data.monto_esperado_anual) * 100
    : 0;
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ---------- Botón de regreso ---------- */}
      <div className="mb-6">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="mb-4 hover:shadow-md transition-shadow"
        >
          Volver al listado de clientes
        </Button>
      </div>

      {/* ---------- Encabezado ---------- */}
      <p className="text-center text-sm">Información del Cliente</p>
      <Title level={3} className="text-center">
        {data.nombre}
      </Title>
      <p className="text-center text-sm !mb-1">{data.rut}</p>
      <p className="text-center text-xs text-gray-500 mb-6">
        {data.direccion} • {data.region}
      </p>

      {/* ---------- Resumen general ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {/* Total instrumentos */}
        <Card className="shadow">
          <div className="flex justify-between items-center">
            <Text>Total instrumentos</Text>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <Title level={3}>{data.numero_instrumentos}</Title>
          <Text type="secondary">Instrumentos activos</Text>
        </Card>

        {/* Rendimiento mensual */}
        {/* <Card className="shadow">
          <div className="flex justify-between items-center">
        <Text>Rendimiento mensual</Text>
        {monthlyPct >= 75 ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
          </div>
          <Title
        level={3}
        className={getPerformanceColor(
          data.monto_esperado_mensual,
          data.monto_realizado_mensual
        )}
          >
        {monthlyPct.toFixed(1)}%
          </Title>
          <Progress percent={monthlyPct} showInfo={false} />
        </Card> */}

        {/* Monto mensual */}
        <Card className="shadow">
          <div className="flex justify-between items-center">
            <Text>Monto mensual</Text>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <Title level={3}>
            {formatCurrency(data.monto_realizado_mensual)}
          </Title>
          <Text type="secondary">
            de {formatCurrency(data.monto_esperado_mensual)}
          </Text>
        </Card>

        {/* Rendimiento anual */}
        <Card className="shadow">
          <div className="flex justify-between items-center">
            <Text>Rendimiento anual</Text>
            <CalendarIcon className="w-4 h-4 text-purple-600" />
          </div>
          <Title
            level={3}
            className={getPerformanceColor(
              data.monto_esperado_anual,
              data.monto_realizado_anual
            )}
          >
            {annualPct.toFixed(1)}%
          </Title>
          <Text type="secondary">
            {formatCurrency(data.monto_realizado_anual)} /{" "}
            {formatCurrency(data.monto_esperado_anual)}
          </Text>
        </Card>

        {/* Promedio objetivo a la fecha */}
        <Card className="shadow">
          <div className="flex justify-between items-center">
            <Text>Promedio objetivo a la fecha</Text>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <Title level={3}>
            {formatCurrency(data.promedio_objetivo_a_la_fecha)}
          </Title>
          <Text type="secondary">Objetivo acumulado</Text>
        </Card>

        {/* Promedio realizado a la fecha */}
        <Card className="shadow">
          <div className="flex justify-between items-center">
            <Text>Promedio realizado a la fecha</Text>
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <Title
            level={3}
            className={getPerformanceColor(
              data.promedio_objetivo_a_la_fecha,
              data.promedio_realizado_a_la_fecha
            )}
          >
            {formatCurrency(data.promedio_realizado_a_la_fecha)}
          </Title>
          <Text type="secondary">Venta acumulada</Text>
        </Card>
      </div>

      {/* ---------- Detalle por marcas ---------- */}
      <Title level={3} className="!mb-4">
        Detalle por marcas
      </Title>

      {data.marcas.map((marca) => (
        <Card key={marca.marca} className="mb-6 shadow">
          <Row justify="space-between" align="middle">
            <div>
              <Title level={4} className="!mb-0">
                {marca.marca}
              </Title>
              <Text type="secondary">
                {marca.numero_instrumentos} instrumentos
              </Text>

              {/* Botón para abrir el modal */}
              <div className="flex items-center mt-2">
                <Button
                  type="link"
                  onClick={() => openModal(marca.comodato_id)}
                >
                  Ver detalle
                </Button>

                <Link
                  to={`/comodato/editar/${marca.comodato_id}`}
                  className="ml-4"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </Link>
              </div>
            </div>

            <PerformanceTag
              expected={marca.monto_esperado_mensual}
              realized={marca.monto_realizado_mensual}
            />
          </Row>

          <Divider />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div>
              <Text type="secondary">Esperado mensual</Text>
              <div className="font-semibold">
                {formatCurrency(marca.monto_esperado_mensual)}
              </div>
            </div>
            <div>
              <Text type="secondary">Realizado mensual</Text>
              <div
                className={`font-semibold ${getPerformanceColor(
                  marca.monto_esperado_mensual,
                  marca.monto_realizado_mensual
                )}`}
              >
                {formatCurrency(marca.monto_realizado_mensual)}
              </div>
            </div>
            <div>
              <Text type="secondary">Esperado anual</Text>
              <div className="font-semibold">
                {formatCurrency(marca.monto_esperado_anual)}
              </div>
            </div>
            <div>
              <Text type="secondary">Realizado anual</Text>
              <div
                className={`font-semibold ${getPerformanceColor(
                  marca.monto_esperado_anual,
                  marca.monto_realizado_anual
                )}`}
              >
                {formatCurrency(marca.monto_realizado_anual)}
              </div>
            </div>
            {/* ------ Nuevos promedios por marca ------ */}
            <div>
              <Text type="secondary">Promedio objetivo a la fecha</Text>
              <div className="font-semibold">
                {formatCurrency(marca.promedio_objetivo_a_la_fecha)}
              </div>
            </div>
            <div>
              <Text type="secondary">Promedio realizado a la fecha</Text>
              <div
                className={`font-semibold ${getPerformanceColor(
                  marca.promedio_objetivo_a_la_fecha,
                  marca.promedio_realizado_a_la_fecha
                )}`}
              >
                {formatCurrency(marca.promedio_realizado_a_la_fecha)}
              </div>
            </div>
          </div>

          <Divider />

          <Collapse className="bg-transparent border-none" ghost>
            <Collapse.Panel header="Ver instrumentos" key="1">
              {marca.instrumentos.map((inst) => (
                <Card
                  key={`${inst.codigo}-${inst.descripcion}`}
                  size="small"
                  className="mb-2 bg-slate-50"
                >
                  <Row justify="space-between" align="middle">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-slate-500" />
                      <div>
                        <Text strong>{inst.codigo}</Text>
                        <p className="text-xs text-gray-500">
                          {inst.descripcion}
                        </p>
                      </div>
                    </div>
                    <Row gutter={[24, 0]} align="middle" className="mr-4">
                      <Col className="min-w-[120px]">
                        <Text type="secondary">Mensual Esperado</Text>
                        <div className="font-semibold">
                          {formatCurrency(inst.monto_esperado_mensual)}
                        </div>
                      </Col>
                      <Col className="min-w-[120px]">
                        <Text type="secondary">Mensual Realizado</Text>
                        <div
                          className={`font-semibold ${getPerformanceColor(
                            inst.monto_esperado_mensual,
                            inst.monto_realizado_mensual
                          )}`}
                        >
                          {formatCurrency(inst.monto_realizado_mensual)}
                        </div>
                      </Col>
                      <Col className="min-w-[120px]">
                        <Text type="secondary">Anual Esperado</Text>
                        <div className="font-semibold">
                          {formatCurrency(inst.monto_esperado_anual)}
                        </div>
                      </Col>
                      <Col className="min-w-[120px]">
                        <Text type="secondary">Anual Realizado</Text>
                        <div
                          className={`font-semibold ${getPerformanceColor(
                            inst.monto_esperado_anual,
                            inst.monto_realizado_anual
                          )}`}
                        >
                          {formatCurrency(inst.monto_realizado_anual)}
                        </div>
                      </Col>
                    </Row>
                  </Row>
                  {inst.adn && (
                    <p className="text-xs text-gray-400 mt-1">
                      ADN: {inst.adn}
                    </p>
                  )}
                </Card>
              ))}
            </Collapse.Panel>
          </Collapse>
        </Card>
      ))}      {/* ---------- Gráficos con Pestañas ---------- */}
      <Title level={3} className="!mb-4">
        Análisis Gráfico
      </Title>
      
      <Card className="shadow mb-12">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "YTD",
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Card title="Comparación por marca (a la fecha)" className="shadow">
                      <Bar
                        data={barDataALaFecha}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "bottom" },
                            tooltip: {
                              callbacks: {
                                label: (ctx) => formatCurrency(ctx.raw as number),
                              },
                            },
                          },
                          scales: {
                            y: {
                              ticks: {
                                callback: (val) => `${Number(val) / 1_000_000} M`,
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Card title="Distribución por marca (objetivo a la fecha)" className="shadow">
                      <div style={{ height: "410px", position: "relative" }}>
                        <Pie
                          data={pieDataALaFecha}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: { padding: 20, usePointStyle: true },
                              },
                              tooltip: {
                                callbacks: {
                                  label: (ctx) =>
                                    ctx.label === "Sin datos"
                                      ? "No hay datos disponibles"
                                      : `${ctx.label}: ${formatCurrency(ctx.raw as number)}`,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: "2",
              label: "Mensual",
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Card title="Comparación por marca (mensual)" className="shadow">
                      <Bar
                        data={barDataMensual}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "bottom" },
                            tooltip: {
                              callbacks: {
                                label: (ctx) => formatCurrency(ctx.raw as number),
                              },
                            },
                          },
                          scales: {
                            y: {
                              ticks: {
                                callback: (val) => `${Number(val) / 1_000_000} M`,
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Card title="Distribución por marca (esperado mensual)" className="shadow">
                      <div style={{ height: "410px", position: "relative" }}>
                        <Pie
                          data={pieDataMensual}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: { padding: 20, usePointStyle: true },
                              },
                              tooltip: {
                                callbacks: {
                                  label: (ctx) =>
                                    ctx.label === "Sin datos"
                                      ? "No hay datos disponibles"
                                      : `${ctx.label}: ${formatCurrency(ctx.raw as number)}`,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: "3",
              label: "Anual",
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Card title="Comparación por marca (anual)" className="shadow">
                      <Bar
                        data={barDataAnual}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "bottom" },
                            tooltip: {
                              callbacks: {
                                label: (ctx) => formatCurrency(ctx.raw as number),
                              },
                            },
                          },
                          scales: {
                            y: {
                              ticks: {
                                callback: (val) => `${Number(val) / 1_000_000} M`,
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Card title="Distribución por marca (esperado anual)" className="shadow">
                      <div style={{ height: "410px", position: "relative" }}>
                        <Pie
                          data={pieDataAnual}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: { padding: 20, usePointStyle: true },
                              },
                              tooltip: {
                                callbacks: {
                                  label: (ctx) =>
                                    ctx.label === "Sin datos"
                                      ? "No hay datos disponibles"
                                      : `${ctx.label}: ${formatCurrency(ctx.raw as number)}`,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Card>

      {/* ---------- Modal Instrumentos ---------- */}
      <Modal
        title="Instrumentos del comodato"
        open={modalVisible}
        width={960}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
      >
        {comodatoId && <InstrumentosGestion id={comodatoId} />}
      </Modal>
    </div>
  );
};

export default ClienteDetalle;
