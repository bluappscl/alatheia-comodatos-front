// src/pages/VerDetalleComodato.tsx
// React 18 · TypeScript · React‑Router v6 · Ant Design v5 · Tailwind CSS

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Card,
  Tag,
  Spin,
  Button,
  Row,
  Col,
  Typography,
  Space,
  message,
  Table,
  TableColumnsType,
  Modal,
} from "antd";
import { FileText } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const { Title, Text } = Typography;

/* ─── Tipos ─────────────────────────────────────────────────────────── */
interface Comodato {
  id: number;
  created_at: string;
  modified_at: string;
  numero_comodato: string;
  codigo_bodega: string;
  fecha_fin: string | null;
  fecha_inicio: string;
  es_demo: boolean | null;
  estado: boolean;
  rut_cliente: string;
  nombre_cliente: string;
  direccion_cliente: string;
  nombre_comuna_cliente: string;
  codigo_comuna_cliente: string;
  rut_representante_alatheia: string;
  nombre_representante_alatheia: string;
  codigo_representante: string;
  rut_representante_cliente: string;
  nombre_representante_cliente: string;
  dias_plazo: number | null;
  es_automatica: boolean | null;
  es_renovable: boolean | null;
  meses_gracia: number | null;
  objetivo_cantidad: number;
  objetivo_monto: number;
  observaciones: string | null;
  porcentaje_descuento: number | null;
}

interface Instrumento {
  id: number;
  secuencia: string;
  codigo_ubicacion: string;
  valor_neto: string;
  moneda: string;
  codigo: string;
  descripcion: string;
  marca: string;
  adn: string;
  serie: string;
  created_at: string;
  modified_at: string;
}

interface InstrumentosResponse {
  instrumentos: Instrumento[];
}

/* ─── Utilidades ────────────────────────────────────────────────────── */
const formatDate = (isoDate?: string | null) =>
  isoDate ? dayjs(isoDate).format("DD/MM/YYYY") : "N/A";

/* ─── Componente ────────────────────────────────────────────────────── */
const VerDetalleComodato: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comodato, setComodato] = useState<Comodato | null>(null);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal contrato
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contractUrl, setContractUrl] = useState<string | null>(null);
  const [loadingContract, setLoadingContract] = useState(false);

  /* Peticiones */
  const fetchData = useCallback(async () => {
    try {
      /* 1️⃣  Comodato */
      const { data: comodatoData } = await axiosInstance.get<any>(
        `/comodatos/${id}`
      );
      setComodato(comodatoData.comodato);

      /* 2️⃣  Instrumentos (viene como objeto con la clave instrumentos) */
      const { data: instData } = await axiosInstance.get<InstrumentosResponse>(
        `/comodatos/${id}/instrumentos`
      );
      setInstrumentos(instData.instrumentos ?? []);
    } catch (err) {
      console.error(err);
      message.error("No se pudo cargar la información del comodato.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* Carga del documento contrato vía axios */
  const loadContract = async () => {
    setLoadingContract(true);
    try {
      // 1️⃣ Pido sólo el JSON con la URL del PDF
      const { data } = await axiosInstance.get<{ archivo: string }>(
        `/comodatos/contratos/${id}`
      );
      // 2️⃣ Esa URL la uso directamente como src del iframe
      setContractUrl(data.archivo);
    } catch (err) {
      console.error(err);
      message.error("Error al cargar el contrato.");
      setContractUrl(null);
    } finally {
      setLoadingContract(false);
    }
  };

  /* Cuando abre modal, cargar contrato */
  useEffect(() => {
    if (isModalVisible && !contractUrl) {
      loadContract();
    }
  }, [isModalVisible]);

  /* Columnas tabla instrumentos */
  const columns: TableColumnsType<Instrumento> = [
    { title: "ID", dataIndex: "id", key: "id", width: 70 },
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Serie", dataIndex: "serie", key: "serie" },
    {
      title: "Valor Neto",
      dataIndex: "valor_neto",
      key: "valor_neto",
      render: (v: string, r) =>
        `${new Intl.NumberFormat("es-CL").format(parseFloat(v))} ${r.moneda}`,
    },
    { title: "Ubicación", dataIndex: "codigo_ubicacion", key: "ubicacion" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    { title: "ADN", dataIndex: "adn", key: "adn", width: 90 },
  ];

  /* Loading */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }
  if (!comodato) return null;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-gray-100 p-2 rounded-md">
          <FileText className="w-6 h-6" />
        </span>
        <div>
          <Title level={4} className="!mb-0">
            Comodato – {comodato.numero_comodato}
          </Title>
          <Text type="secondary">Aquí puedes ver el detalle del comodato</Text>
        </div>
      </div>

      {/* Grilla superior */}
      <Row gutter={[24, 24]}>
        {/* Columna principal */}
        <Col xs={24} lg={16}>
          {/* Estado */}
          <Space className="mb-4" wrap>
            <Tag
              color={comodato.estado ? "green" : "red"}
              className="font-semibold"
            >
              {comodato.estado ? "Vigente" : "No vigente"}
            </Tag>
            <Tag color="volcano" className="font-semibold">
              No renovable
            </Tag>
          </Space>

          {/* Detalles cliente */}
          <Card className="mb-6">
            <Title level={5}>Detalles del Cliente</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Nombre
                </Text>
                <Text>{comodato.nombre_cliente}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">RUT</Text>
                <Text>{comodato.rut_cliente}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Código Comuna
                </Text>
                <Text>{comodato.codigo_comuna_cliente}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Dirección
                </Text>
                <Text>{comodato.direccion_cliente}</Text>
              </Col>
            </Row>
          </Card>

          {/* Representante Alatheia */}
          <Card className="mb-6">
            <Title level={5}>Representante de Alatheia</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Nombre
                </Text>
                <Text>{comodato.nombre_representante_alatheia}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">RUT</Text>
                <Text>{comodato.rut_representante_alatheia}</Text>
              </Col>
            </Row>
          </Card>

          {/* Representante Cliente */}
          <Card className="mb-6">
            <Title level={5}>Representante del Cliente</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Nombre
                </Text>
                <Text>{comodato.nombre_representante_cliente}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text className="font-semibold text-purple-900 block">
                  Código
                </Text>
                <Text>{comodato.codigo_representante || "N/A"}</Text>
              </Col>
            </Row>
          </Card>

          <Card className="mb-6">
            <Title level={5}>Observaciones</Title>
            <p>{comodato.observaciones || "no presenta observaciones" }</p>
          </Card>

          {/* Pagos */}
          <Card className="mb-6">
            <Title level={5}>Detalles de Pagos</Title>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <div className="bg-[#934f8c] p-4 rounded-md text-center text-white">
                  <Text className="block text-sm mb-2 text-white">
                    Plazo de Pago (días)
                  </Text>
                  <p className="font-bold text-2xl">
                    {comodato.dias_plazo ?? 30}
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="bg-[#934f8c] text-white p-4 rounded-md text-center">
                  <Text className="block text-sm mb-2 text-white">
                    Tiempo de Gracia (meses)
                  </Text>
                  <p className="font-bold text-2xl">
                    {comodato.meses_gracia ?? 2}
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="bg-[#934f8c] text-white p-4 rounded-md text-center">
                  <Text className="block text-sm mb-2 text-white">
                    % Tiempo de Gracia
                  </Text>
                  <p className="font-bold text-2xl">
                    {comodato.porcentaje_descuento ?? "10%"}
                  </p>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Objetivos */}
          <Card>
            <Title level={5}>Objetivos</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <div className="bg-[#934f8c] text-white p-4 rounded-md text-center">
                  <Text className="block text-sm mb-2 text-white">
                    Compra Mínima Mensual ($)
                  </Text>
                  <p className="font-bold text-2xl">
                    {new Intl.NumberFormat("es-CL").format(
                      comodato.objetivo_monto
                    )}
                  </p>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="bg-[#934f8c] text-white p-4 rounded-md text-center">
                  <Text className="block text-sm mb-2 text-white">
                    Compra Mínima Mensual (Reactivos)
                  </Text>
                  <p className="font-bold text-2xl">
                    {comodato.objetivo_cantidad}
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Fechas */}
          <Card className="mb-6 mt-10">
            <Title level={5}>Fechas</Title>
            <Space direction="vertical" size="middle">
              <div>
                <Text className="font-semibold block">Fecha Inicio</Text>
                <Text>{formatDate(comodato.fecha_inicio)}</Text>
              </div>
              <div>
                <Text className="font-semibold block">Fecha Fin</Text>
                <Text>{formatDate(comodato.fecha_fin)}</Text>
              </div>
            </Space>
          </Card>

          {/* Contrato */}
          <Card>
            <Row align="middle" justify="space-between">
              <Title level={5} className="!mb-0">
                Contrato
              </Title>
              <Button
                type="primary"
                size="small"
                onClick={() => setIsModalVisible(true)}
              >
                Ver Contrato
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* ── Tabla de Instrumentos (abajo de todo) ─────────────────────── */}
      <Card
        title="Instrumentos Asociados"
        className="mt-10"
        bodyStyle={{ padding: 0 }}
      >
        <Table
          dataSource={instrumentos}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>

      <Modal
        title="Contrato"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width="80%"
        style={{ top: 20 }}
        bodyStyle={{ padding: 0, height: "80vh" }}
        destroyOnClose
      >
        {loadingContract ? (
          <div className="flex justify-center items-center h-full">
            <Spin />
          </div>
        ) : contractUrl ? (
          // iframe carga directamente el PDF de S3
          <iframe
            src={contractUrl}
            title="Contrato"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        ) : (
          <div className="p-4 text-center text-red-500">
            No se encontró el contrato.
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VerDetalleComodato;
