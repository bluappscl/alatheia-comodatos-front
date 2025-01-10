import { ComodatoInterfaceWithoutCliente } from "./ComodatoInterfaceWithoutCliente";

export interface ClienteInterfaceWithComodatos {
  id: number;
  nombre: string;
  rut: string;
  codigo_comuna: string;
  direccion: string;
  logo?: string;
  comodatos: ComodatoInterfaceWithoutCliente[];
}
