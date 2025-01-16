import React from "react";
import { ClienteInterface } from "../../interfaces/ClienteInterface";
import { format } from "rut.js";

interface DetalleClienteProps {
  cliente: ClienteInterface;
  representante_nombre: string;
  representante_rut: string;
  representante_de_venta: { codigo: string; nombre: string };
}

const DetalleCliente: React.FC<DetalleClienteProps> = ({
  cliente,
  representante_nombre,
  representante_rut,
  representante_de_venta,
}) => {
  return (
    <div className="p-4 bg-white border-b-2 border-primary-300 ">
      <h2 className="text-lg font-bold mb-3">Detalles del Cliente</h2>

      {/* Cliente Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="font-semibold block  mb-1">Nombre</label>
          <p className="">{cliente.nombre}</p>
        </div>
        <div>
          <label className="font-semibold block  mb-1">RUT</label>
          <p className="">{format(cliente.rut)}</p>
        </div>
        <div>
          <label className="font-semibold block  mb-1">Código Comuna</label>
          <p className="">{cliente.codigo_comuna}</p>
        </div>
        <div>
          <label className="font-semibold block  mb-1">Dirección</label>
          <p className="">{cliente.direccion}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">
          Representante de Alatheia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block  mb-1">Nombre</label>
            <p className="">{representante_nombre}</p>
          </div>
          <div>
            <label className="font-semibold block  mb-1">RUT</label>
            <p className="">{format(representante_rut)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Representante de Venta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block  mb-1">Nombre</label>
            <p className="">{representante_de_venta.nombre}</p>
          </div>
          <div>
            <label className="font-semibold block  mb-1">Codigo</label>
            <p className="">{representante_de_venta.codigo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCliente;
