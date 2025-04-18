import { InstrumentoInterface } from "./InstrumentoInterface";

export interface ComodatoInterfaceWithoutCliente {
  id: number;
  contrato: string;
  compra_minima_mensual_dinero: number;
  compra_minima_mensual_reactivo: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  nombre_cliente_representante: string;
  rut_cliente_representante: string;
  plazo_pago_facturas: number;
  tiempo_de_gracia: number;
  porcentaje_tiempo_de_gracia: number;
  es_renovable: boolean;
  renovable_automatico: boolean;
  representante_venta: { id: number; codigo: string; nombre: string };
  instrumentos: InstrumentoInterface[];
  created_at: string;
  updated_at: string;
}
