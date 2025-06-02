import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Card,
  Row,
  Col,
  Progress,
  Tag,
  Divider,
  Spin,
  Typography,
  message,
  Tooltip,
  Button,
  Modal,
} from "antd"
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar as CalendarIcon,
  Target,
} from "lucide-react"
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import axiosInstance from "../../api/axiosInstance"
import InstrumentosGestion from "./VerInstrumentosDetalle"

Chart.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend, ArcElement)

const { Title, Text } = Typography

/* ---------- Utilidades ---------- */

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount)

const getPerformanceColor = (expected: number, realized: number) => {
  const pct = expected ? (realized / expected) * 100 : 0
  if (pct >= 100) return "text-green-600"
  if (pct >= 75) return "text-yellow-600"
  return "text-red-600"
}

const PerformanceTag: React.FC<{ expected: number; realized: number }> = ({
  expected,
  realized,
}) => {
  const pct = expected ? (realized / expected) * 100 : 0
  if (pct >= 100)
    return (
      <Tooltip title="Se logró el 100% o más de lo esperado">
        <Tag color="green">Excelente</Tag>
      </Tooltip>
    )
  if (pct >= 75)
    return (
      <Tooltip title="Se logró entre el 75% y el 99% de lo esperado">
        <Tag color="gold">Bueno</Tag>
      </Tooltip>
    )
  return (
    <Tooltip title="Se logró menos del 75% de lo esperado">
      <Tag color="red">Bajo rendimiento</Tag>
    </Tooltip>
  )
}

/* ---------- Tipos ---------- */

interface Instrumento {
  codigo: string
  monto_esperado_mensual: number
  monto_realizado_mensual: number
  monto_esperado_anual: number
  monto_realizado_anual: number
}

interface Marca {
  comodato_id: number          // ⬅️ campo usado para abrir el modal
  marca: string
  numero_instrumentos: number
  monto_esperado_mensual: number
  monto_realizado_mensual: number
  monto_esperado_anual: number
  monto_realizado_anual: number
  instrumentos: Instrumento[]
}

interface ClienteResumen {
  numero_instrumentos: number
  rut: string
  nombre: string
  monto_esperado_mensual: number
  monto_realizado_mensual: number
  monto_esperado_anual: number
  monto_realizado_anual: number
  marcas: Marca[]
}

interface APIResponse {
  cliente: ClienteResumen
}

/* ---------- Componente principal ---------- */

const ClienteDetalle: React.FC = () => {
  const { rut } = useParams<{ rut: string }>()
  const [data, setData] = useState<ClienteResumen | null>(null)
  const [loading, setLoading] = useState(true)

  /* Estado para el modal de instrumentos */
  const [modalVisible, setModalVisible] = useState(false)
  const [comodatoId, setComodatoId] = useState<number | null>(null)

  const openModal = (id: number) => {
    setComodatoId(id)
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
    setComodatoId(null)
  }

  /* --- Cargar datos del cliente --- */
  useEffect(() => {
    if (!rut) return
    setLoading(true)
    axiosInstance
      .get<APIResponse>(`/comodatos/clientes/${rut}/resumen/`)
      .then((res) => setData(res.data.cliente))
      .catch(() => message.error("No se pudo cargar la información del cliente"))
      .finally(() => setLoading(false))
  }, [rut])

  /* --- Datos para gráficos --- */
  const barData = useMemo(() => {
    if (!data?.marcas)
      return {
        labels: [],
        datasets: [
          { label: "Esperado", backgroundColor: "hsl(210 90% 60%)", data: [] },
          { label: "Realizado", backgroundColor: "hsl(150 90% 45%)", data: [] },
        ],
      }

    return {
      labels: data.marcas.map((m) => m.marca),
      datasets: [
        {
          label: "Esperado",
          backgroundColor: "hsl(210 90% 60%)",
          data: data.marcas.map((m) => m.monto_esperado_mensual),
        },
        {
          label: "Realizado",
          backgroundColor: "hsl(150 90% 45%)",
          data: data.marcas.map((m) => m.monto_realizado_mensual),
        },
      ],
    }
  }, [data])

  const pieData = useMemo(() => {
    if (!data?.marcas)
      return { labels: [], datasets: [{ data: [], backgroundColor: [] }] }

    const marcasConMonto = data.marcas.filter((m) => m.monto_esperado_mensual > 0)

    if (marcasConMonto.length === 0)
      return {
        labels: ["Sin datos"],
        datasets: [{ data: [1], backgroundColor: ["#e0e0e0"] }],
      }

    return {
      labels: marcasConMonto.map((m) => m.marca),
      datasets: [
        {
          data: marcasConMonto.map((m) => m.monto_esperado_mensual),
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
    }
  }, [data])

  /* --- Loading --- */
  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  if (!data) return null

  const monthlyPct =
    (data.monto_realizado_mensual / data.monto_esperado_mensual) * 100
  const annualPct =
    (data.monto_realizado_anual / data.monto_esperado_anual) * 100

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ---------- Encabezado ---------- */}
      <p className="text-center text-sm">Información del Cliente</p>
      <Title level={3} className="text-center">
        {data.nombre}
      </Title>
      <p className="text-center text-sm !mb-6">{data.rut}</p>

      {/* ---------- Resumen general ---------- */}
      <Row gutter={[16, 16]} className="mb-8">
        {/* Total instrumentos */}
        <Col xs={24} md={6}>
          <Card className="shadow">
            <Row justify="space-between" align="middle">
              <Text>Total instrumentos</Text>
              <Package className="w-4 h-4 text-blue-600" />
            </Row>
            <Title level={3}>{data.numero_instrumentos}</Title>
            <Text type="secondary">Instrumentos activos</Text>
          </Card>
        </Col>

        {/* Rendimiento mensual */}
        <Col xs={24} md={6}>
          <Card className="shadow">
            <Row justify="space-between" align="middle">
              <Text>Rendimiento mensual</Text>
              {monthlyPct >= 75 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </Row>
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
          </Card>
        </Col>

        {/* Monto mensual */}
        <Col xs={24} md={6}>
          <Card className="shadow">
            <Row justify="space-between" align="middle">
              <Text>Monto mensual</Text>
              <DollarSign className="w-4 h-4 text-green-600" />
            </Row>
            <Title level={3}>{formatCurrency(data.monto_realizado_mensual)}</Title>
            <Text type="secondary">
              de {formatCurrency(data.monto_esperado_mensual)}
            </Text>
          </Card>
        </Col>

        {/* Rendimiento anual */}
        <Col xs={24} md={6}>
          <Card className="shadow">
            <Row justify="space-between" align="middle">
              <Text>Rendimiento anual</Text>
              <CalendarIcon className="w-4 h-4 text-purple-600" />
            </Row>
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
        </Col>
      </Row>

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
              <Button type="link" onClick={() => openModal(marca.comodato_id)}>
                Ver detalle
              </Button>
            </div>

            <PerformanceTag
              expected={marca.monto_esperado_mensual}
              realized={marca.monto_realizado_mensual}
            />
          </Row>

          <Divider />

          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={12} md={6}>
              <Text type="secondary">Esperado mensual</Text>
              <div className="font-semibold">
                {formatCurrency(marca.monto_esperado_mensual)}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Text type="secondary">Realizado mensual</Text>
              <div
                className={`font-semibold ${getPerformanceColor(
                  marca.monto_esperado_mensual,
                  marca.monto_realizado_mensual
                )}`}
              >
                {formatCurrency(marca.monto_realizado_mensual)}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Text type="secondary">Esperado anual</Text>
              <div className="font-semibold">
                {formatCurrency(marca.monto_esperado_anual)}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Text type="secondary">Realizado anual</Text>
              <div
                className={`font-semibold ${getPerformanceColor(
                  marca.monto_esperado_anual,
                  marca.monto_realizado_anual
                )}`}
              >
                {formatCurrency(marca.monto_realizado_anual)}
              </div>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>Instrumentos</Title>
          {marca.instrumentos.map((inst) => {
            const instPct = inst.monto_esperado_mensual
              ? (inst.monto_realizado_mensual / inst.monto_esperado_mensual) *
                100
              : 0
            return (
              <Card key={inst.codigo} size="small" className="mb-2 bg-slate-50">
                <Row justify="space-between" align="middle">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-slate-500" />
                    <Text strong>{inst.codigo}</Text>
                  </div>
                  <Row gutter={[24, 0]} align="middle" className="mr-4">
                    <Col className="min-w-[100px]">
                      <Text type="secondary">Mensual</Text>
                      <div
                        className={`font-semibold ${getPerformanceColor(
                          inst.monto_esperado_mensual,
                          inst.monto_realizado_mensual
                        )}`}
                      >
                        {formatCurrency(inst.monto_realizado_mensual)}
                      </div>
                    </Col>
                    <Col className="min-w-[100px]">
                      <Text type="secondary">Anual</Text>
                      <div
                        className={`font-semibold ${getPerformanceColor(
                          inst.monto_esperado_anual,
                          inst.monto_realizado_anual
                        )}`}
                      >
                        {formatCurrency(inst.monto_realizado_anual)}
                      </div>
                    </Col>
                    <Col className="min-w-[60px]">
                      <Text type="secondary">Rend.</Text>
                      <div
                        className={`font-semibold ${getPerformanceColor(
                          inst.monto_esperado_mensual,
                          inst.monto_realizado_mensual
                        )}`}
                      >
                        {instPct.toFixed(1)}%
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Card>
            )
          })}
        </Card>
      ))}

      {/* ---------- Gráficos ---------- */}
      <Row gutter={[16, 16]} className="mb-12">
        <Col xs={24} lg={12}>
          <Card title="Comparación por marca (mensual)" className="shadow">
            <Bar
              data={barData}
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
                      callback: (val) => `${Number(val) / 1_000_000}M`,
                    },
                  },
                },
              }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Distribución por marca (esperado mensual)"
            className="shadow"
          >
            <div style={{ height: "410px", position: "relative" }}>
              <Pie
                data={pieData}
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
                            : `${ctx.label}: ${formatCurrency(
                                ctx.raw as number
                              )}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

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
  )
}

export default ClienteDetalle
