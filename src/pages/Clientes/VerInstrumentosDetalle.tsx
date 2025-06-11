"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Card,
  Statistic,
  Input,
  Table,
  Tag,
  Modal,
  message,
} from "antd"
import {  Search } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"


type Instrumento = {
  id: number
  valor_neto: number | null
  objetivo_monto: number
  moneda: string | null
  codigo: string
  descripcion: string
  marca: string
  adn: string | null
  serie: string
  codigo_bodega: string
  created_at: string
  modified_at: string
  codigo_ubicacion: string | null
}

interface Props {
  /** ID del comodato que provee el padre */
  id: number | string
}

export default function InstrumentosGestion({ id }: Props) {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInstrumento, setSelectedInstrumento] = useState<Instrumento | null>(null)

  /* ---------------- Obtener datos desde la API ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axiosInstance.get(`/comodatos/${id}/instrumentos/`)
        setInstrumentos(data.instrumentos ?? [])
      } catch (err) {
        message.error("No se pudo obtener la lista de instrumentos")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])



  const filteredInstrumentos = useMemo(() => {
    return instrumentos.filter((inst) => {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        inst.descripcion.toLowerCase().includes(term) ||
        inst.codigo.toLowerCase().includes(term) ||
        inst.serie.toLowerCase().includes(term)

      return matchesSearch 
    })
  }, [instrumentos, searchTerm])

  const formatCurrency = (amount?: number | null) =>
    amount
      ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount)
      : "N/A"

  const formatDate = (date: string) => new Date(date).toLocaleDateString("es-CL")
  /* ---------------- Columnas de la tabla ---------------- */
  const columns = [
    { 
      title: "Serie", 
      dataIndex: "serie", 
      ellipsis: true,
      render: (v: string | null) => v ?? "No disponible" 
    },
    { 
      title: "Código", 
      dataIndex: "codigo", 
      ellipsis: true,
      render: (v: string | null) => <Tag>{v ?? "No disponible"}</Tag> 
    },
    { 
      title: "Marca", 
      dataIndex: "marca", 
      ellipsis: true,
      render: (v: string | null) => <Tag color="blue">{v ?? "No disponible"}</Tag> 
    },
    { 
      title: "ADN", 
      dataIndex: "adn", 
      ellipsis: true,
      render: (v: string | null) => v ?? "No disponible" 
    },
    { 
      title: "Bodega", 
      dataIndex: "codigo_bodega", 
      ellipsis: true,
      render: (v: string | null) => <Tag color="purple">{v ?? "No disponible"}</Tag> 
    },
    { 
      title: "Nombre Bodega", 
      dataIndex: "nombre_bodega", 
      ellipsis: true,
      render: (v: string | null) => <Tag color="purple">{v ?? "No disponible"}</Tag> 
    },
    { 
      title: "Nombre Ubicación", 
      dataIndex: "nombre_ubicacion", 
      ellipsis: true,
      render: (v: string | null) => v ?? "No disponible" 
    },
    { 
      title: "Descripción", 
      dataIndex: "descripcion", 
      ellipsis: true,
      render: (v: string | null) => v ?? "No disponible" 
    },
    { 
      title: "Objetivo Monto", 
      dataIndex: "objetivo_monto", 
      ellipsis: true,
      render: (v: number | null) => v !== null ? <span className={v > 0 ? "text-green-600 font-semibold" : "text-muted-foreground"}>{formatCurrency(v)}</span> : "No disponible" 
    },
    { 
      title: "Moneda", 
      dataIndex: "moneda", 
      ellipsis: true,
      render: (v: string | null) => v ?? "No disponible" 
    },
  ]

  /* ---------------- Render ---------------- */
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Instrumentos</h1>
            <p className="text-muted-foreground mt-2">
            Visualiza los instrumentos de la marca {instrumentos[0]?.marca || 'No disponible'} en detalle
            </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <Statistic title="Total Instrumentos" value={instrumentos.length} loading={loading} />
        </Card>
        <Card>
          <Statistic
            title="Valor Total Objetivo"
            value={instrumentos.reduce((sum, i) => sum + (i.objetivo_monto || 0), 0)}
            formatter={(v) => formatCurrency(Number(v))}
            loading={loading}
          />
        </Card>
     
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            prefix={<Search className="text-muted-foreground" size={16} />}
            placeholder="Buscar por descripción, código o serie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
      </Card>      {/* Tabla */}
      <div style={{ overflowX: "auto" }}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredInstrumentos}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="bg-white rounded-lg shadow-sm"
          tableLayout="auto"
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Modal de detalle */}
      <Modal
        title="Detalles del Instrumento"
        open={!!selectedInstrumento}
        footer={null}
        onCancel={() => setSelectedInstrumento(null)}
        width={700}
      >
        {selectedInstrumento && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">ID</label>
              <p>{selectedInstrumento.id}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Código</label>
              <p>{selectedInstrumento.codigo}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-muted-foreground">Descripción</label>
              <p>{selectedInstrumento.descripcion}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Marca</label>
              <p>{selectedInstrumento.marca}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Serie</label>
              <p>{selectedInstrumento.serie}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Valor Neto</label>
              <p>{selectedInstrumento.valor_neto ?? "N/A"}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Objetivo Monto</label>
              <p>{formatCurrency(selectedInstrumento.objetivo_monto)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Código Bodega</label>
              <p>{selectedInstrumento.codigo_bodega}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Código Ubicación</label>
              <p>{selectedInstrumento.codigo_ubicacion ?? "N/A"}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Creado</label>
              <p>{formatDate(selectedInstrumento.created_at)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Modificado</label>
              <p>{formatDate(selectedInstrumento.modified_at)}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
