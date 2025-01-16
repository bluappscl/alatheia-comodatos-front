import { InstrumentoInterface } from "./InstrumentoInterface";
import { ClienteInterface } from "./ClienteInterface";

export interface ComodatoInterface {
  id: number;
  contrato: string;
  compra_minima_mensual_dinero: number;
  compra_minima_mensual_reactivo: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  cliente: ClienteInterface;
  representante_venta: { id: number; codigo: string; nombre: string };
  nombre_cliente_representante: string;
  rut_cliente_representante: string;
  plazo_pago_facturas: number;
  tiempo_de_gracia: number;
  porcentaje_tiempo_de_gracia: number;
  es_renovable: boolean;
  renovable_automatico: boolean;
  instrumentos: InstrumentoInterface[];
  created_at: string;
  updated_at: string;
}
