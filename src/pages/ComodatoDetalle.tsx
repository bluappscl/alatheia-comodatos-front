import React from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import InstrumentosTable from "../components/Instrumentos/InstrumentosTable";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";

import comodato_photo from "../media/temporal/comodato_photo.png";
import { useFetchRetrieveComodato } from "../api/hooks/retrieve_comodatos";

const ComodatoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { comodato, loading } = useFetchRetrieveComodato(id || "");

  if (!comodato) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HeaderDescripcion
        photo_path={comodato_photo}
        title="Comodato - XXD663D"
        description="Aqui puedes ver el detalle del comodato"
      />
      <div className="p-6 w-full h-full mx-auto bg-white rounded-md">
        <div
          className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full bg-success-700`}
        >
          {comodato.estado}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="flex flex-row gap-4 mb-4">
              <div className="w-full">
                <label className="font-semibold">Fecha Inicio</label>
                <Input value={comodato.fecha_inicio} readOnly />
              </div>
              <div className="w-full">
                <label className="font-semibold">Fecha Fin</label>
                <Input value={comodato.fecha_fin} readOnly />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-semibold">Representante</label>
              <Input value={comodato.nombre_cliente_representante} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">RUT Representante</label>
              <Input value={comodato.rut_cliente_representante} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Plazo de Pago (días)</label>
              <Input value={comodato.plazo_pago_facturas.toString()} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Tiempo de Gracia (meses)</label>
              <Input value={comodato.tiempo_de_gracia.toString()} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Porcentaje Tiempo de Gracia
              </label>
              <Input
                value={`${comodato.porcentaje_tiempo_de_gracia}%`}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Es Renovable</label>
              <Input value={comodato.es_renovable ? "Sí" : "No"} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Renovación Automática</label>
              <Input
                value={comodato.renovable_automatico ? "Sí" : "No"}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Compra Mínima Mensual (Dinero)
              </label>
              <Input
                value={`$${comodato.compra_minima_mensual_dinero.toLocaleString()}`}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Compra Mínima Mensual (Reactivos)
              </label>
              <Input
                value={comodato.compra_minima_mensual_reactivo.toLocaleString()}
                readOnly
              />
            </div>
          </div>

          <div className="border-2  rounded-lg bg-dark-700">
            <div className="flex flex-row p-4">
              <div className="text-lg text-white font-semibold">Contrato</div>
              <div className="ml-auto">
                <Button type="primary" size="middle" className="rounded-full">
                  Descargar
                </Button>
              </div>
            </div>
            <iframe
              src={comodato.contrato}
              className="w-full h-[600px]"
              title="Contrato PDF"
            />
          </div>
        </div>
        <hr className="my-6 border-2" />
        <div className="flex-col w-full">
          <h2 className="text-lg font-semibold mt-6">
            Instrumentos en comodato
          </h2>
          <InstrumentosTable data={comodato.instrumentos} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default ComodatoDetalle;
