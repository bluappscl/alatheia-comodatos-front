export interface TiempoDeGracia {
  meses: number;
  porcentaje: number;
}

export interface InstrumentoPayload {
  id?: number; // Para edición
  codigo?: string;
  descripcion?: string;
  adn?: string;
  tipo?: string;
  marca?: string;
  serie?: string;
  objetivo_monto?: number;
  codigo_bodega?: string; // Cambiado de 'bodega' a 'codigo_bodega'
  codigo_ubicacion?: number;
  valor_neto?: string; // Como decimal string
  moneda?: string;
}

export interface ComodatoPayload {
  comodato: {
    fecha_inicio?: string;
    fecha_fin?: string;
    marca: string;
    codigo_bodega?: string;
    rut_cliente: string;
    direccion_cliente?: string;
    rut_representante_cliente?: string;
    nombre_representante_cliente?: string;
    rut_representante_alatheia?: string;
    nombre_representante_alatheia?: string;
    codigo_representante?: string;
    dias_plazo?: number;
    meses_gracia?: number;
    porcentaje_descuento?: string;
    es_renovable: boolean; // Cambiar a requerido
    es_automatica: boolean; // Cambiar a requerido
    objetivo_cantidad?: number;
    objetivo_monto?: number;
    observacion?: string;
    es_demo: boolean; // Cambiar a requerido
  };
  instrumentos: InstrumentoPayload[];
}
