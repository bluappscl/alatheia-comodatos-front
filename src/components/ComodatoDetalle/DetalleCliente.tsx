import React from "react";
import { ClienteInterface } from "../../interfaces/ClienteInterface";

interface DetalleClienteProps {
  cliente: ClienteInterface;
  representante_nombre: string;
  representante_rut: string;
}

const DetalleCliente: React.FC<DetalleClienteProps> = ({
  cliente,
  representante_nombre,
  representante_rut,
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
          <p className="">{cliente.rut}</p>
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
        <h3 className="font-semibold text-lg mb-2">Representante</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block  mb-1">Nombre</label>
            <p className="">{representante_nombre}</p>
          </div>
          <div>
            <label className="font-semibold block  mb-1">RUT</label>
            <p className="">{representante_rut}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCliente;
