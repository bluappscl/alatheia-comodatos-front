import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { SelectedInstrumento } from "../../components/Instrumentos/InstrumentSelectorTable";
import ComodatoForm from "./core/ComodatoForm"; 
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import comodato_photo from "../../media/temporal/comodato_photo.png";

/* ---------- mapper instrumento ---------- */
function mapApiInstrument(i: any): SelectedInstrumento {
  return {
    id: i.id, // Mantener el ID del instrumento
    codigo: i.codigo,
    descripcion: i.descripcion,
    marca: i.marca,
    adn: i.adn,
    tipo: i.tipo ?? "",
    valor_neto: i.valor_neto ? parseFloat(i.valor_neto) : 0,
    moneda: i.moneda ?? "CLP",
    monto_objetivo: Number(i.objetivo_monto) || 0,
    serie: i.serie ?? "",
    codigo_ubicacion: Number(i.codigo_ubicacion) || 0,
    bodega: i.codigo_bodega ?? "", // Mapear desde codigo_bodega
  };
}

/* ---------- mapper comodato -------------- */
function mapApiComodato(api: any, inst: SelectedInstrumento[]) {
  const c = api.comodato;
  return {
    /* Cabecera */
    numero_comodato: c.id,
    rut_cliente: c.rut_cliente,
    marca:
      typeof c.marca === "string" && c.marca.trim() !== ""
        ? c.marca
        : inst[0]?.marca ?? "",

    /* Información del cliente */
    clienteInfo: {
      rut: c.rut_cliente,
      nombre: c.nombre_cliente,
      direccion: c.direccion_cliente,
      codigo_comuna: c.codigo_comuna_cliente,
      nombre_comuna: c.nombre_comuna_cliente,
    },

    /* Representantes */
    nombre_representante_cliente: c.nombre_representante_cliente ?? "",
    rut_representante_cliente: c.rut_representante_cliente ?? "",
    nombre_representante_alatheia: c.nombre_representante_alatheia ?? "",
    rut_representante_alatheia: c.rut_representante_alatheia ?? "",
    direccion_cliente: c.direccion_cliente ?? "",
    representanteSeleccionado: {
      codigo: c.codigo_representante ?? "",
      nombre: c.nombre_representante_alatheia ?? "",
    },

    /* Fechas */
    fechaInicio: c.fecha_inicio ? dayjs(c.fecha_inicio).toDate() : null,
    fechaFin: c.fecha_fin ? dayjs(c.fecha_fin).toDate() : null,

    /* Condiciones */
    plazo_para_pago: !!c.dias_plazo, // Convertir a boolean correctamente
    plazo_pago_facturas: c.dias_plazo ?? undefined,
    tiempoDeGracia: [c.meses_gracia ?? 0, Number(c.porcentaje_descuento) ?? 0] as [
      number,
      number
    ],

    /* Renovación / demo */
    es_renovable: !!c.es_renovable, // Asegurar que sea boolean
    se_renueva_automaticamente: !!c.es_automatica, // Asegurar que sea boolean
    es_demo: !!c.es_demo, // Asegurar que sea boolean

    /* Objetivos */
    objetivo_reactivos_check: c.objetivo_cantidad > 0,
    objetivoReactivosCantidad:
      c.objetivo_cantidad > 0 ? c.objetivo_cantidad : undefined,
    objetivo_dinero_check: c.objetivo_monto > 0,
    objetivoDineroCantidad:
      c.objetivo_monto > 0 ? c.objetivo_monto : undefined,

    /* Otros */
    observaciones: c.observacion ?? "",
  };
}

export default function EditarComodato() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState<any | null>(null);

  const handleBack = useCallback(() => {
    nav("/clientes"); // Navegar a la lista de clientes
  }, [nav]);

  const handleCompleted = useCallback((rutCliente?: string) => {
    if (rutCliente) {
      nav(`/clientes/${rutCliente}`);
    } else {
      nav("/comodatos");
    }
  }, [nav]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [comodatoRes, instrRes, contratoRes] = await Promise.all([
          axiosInstance.get(`/comodatos/${id}/`),
          axiosInstance.get(`/comodatos/${id}/instrumentos/`),
          axiosInstance.get(`/comodatos/contratos/${id}/`).catch(() => ({ data: null }))
        ]);

        const instrumentos: SelectedInstrumento[] = 
          Array.isArray(instrRes.data.instrumentos) 
            ? instrRes.data.instrumentos.map(mapApiInstrument)
            : [];

        const base = mapApiComodato(comodatoRes.data, instrumentos);
        
        console.log('Respuesta completa de contratos:', contratoRes.data); // Debug mejorado
        
        // Ajustar el mapeo del contrato según la estructura real de la API
        let contratoExistente = null;
        
        if (contratoRes.data) {
          // Si la respuesta tiene la estructura directa del contrato
          if (contratoRes.data.id && contratoRes.data.archivo) {
            contratoExistente = {
              id: contratoRes.data.id,
              nombre_archivo: contratoRes.data.nombre_archivo,
              archivo: contratoRes.data.archivo
            };
          }
          // Si la respuesta tiene un array de contratos
          else if (contratoRes.data.contratos && contratoRes.data.contratos.length > 0) {
            const contrato = contratoRes.data.contratos[0];
            contratoExistente = {
              id: contrato.id,
              nombre_archivo: contrato.nombre_archivo,
              archivo: contrato.archivo
            };
          }
        }

        console.log('Contrato existente procesado:', contratoExistente); // Debug

        setInitial({ 
          ...base, 
          instrumentos,
          contratoExistente 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error("No se pudo cargar el comodato");
      }
    }
    fetchData();
  }, [id]);
  if (!initial) {
    return (
      <div className="flex justify-center py-20">
        <Spin />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeaderDescripcion
        title={`Editar Comodato #${id}`}
        description="Modifica la información del comodato existente"
        photo_path={comodato_photo}
        showBackButton={true}
        onBack={handleBack}
      />      <div className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-sm">
        <ComodatoForm
          initialValues={initial}
          onCompleted={handleCompleted}
          isEditing={true} // Agregar este prop
        />
      </div>
    </motion.div>
  );
}
