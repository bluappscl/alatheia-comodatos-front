import React from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import InstrumentosTable from "../components/Instrumentos/InstrumentosTable";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";

import comodato_photo from "../media/temporal/comodato_photo.png";
import { useFetchRetrieveComodato } from "../api/hooks/retrieve_comodatos";
import DateProgress from "../components/ComodatoDetalle/DateProgress";

import { motion } from "motion/react";
import CardTitleNumber from "../components/ComodatoDetalle/CardTitleNumber";
import ProgresoContrato from "../components/ComodatoDetalle/ProgresoContrato";

const ComodatoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { comodato, loading } = useFetchRetrieveComodato(id || "");

  if (!comodato) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        photo_path={comodato_photo}
        title="Comodato - XXD663D"
        description="Aqui puedes ver el detalle del comodato"
      />
      <div className="p-6 w-full h-full mx-auto bg-white rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <div
              className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full bg-success-700 mb-4`}
            >
              {comodato.estado}
            </div>

            <div className="mb-4">
              <label className="font-semibold">Representante</label>
              <Input value={comodato.nombre_cliente_representante} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">RUT Representante</label>
              <Input value={comodato.rut_cliente_representante} readOnly />
            </div>

            <label className="font-semibold">Detalles de pagos</label>
            <div className="flex flex-row gap-4 mb-4 mt-1">
              <CardTitleNumber
                title="Plazo de Pago (días)"
                content={comodato.plazo_pago_facturas.toString()}
              />
              <CardTitleNumber
                title="Tiempo de Gracia (meses)"
                content={comodato.tiempo_de_gracia.toString()}
              />
              <CardTitleNumber
                title="Porcentaje Tiempo de Gracia"
                content={`${comodato.porcentaje_tiempo_de_gracia}%`}
              />
            </div>

            <label className="font-semibold">Detalles de pagos</label>

            <div className="flex flex-row gap-4 mb-4 mt-1 h-28">
              <CardTitleNumber
                title="Compra Mínima Mensual (Dinero)"
                content={`$${comodato.compra_minima_mensual_dinero.toLocaleString()}`}
              />
              <CardTitleNumber
                title="Compra Mínima Mensual (Reactivos)"
                content={`${comodato.compra_minima_mensual_reactivo.toLocaleString()}`}
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
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ProgresoContrato
              startDate={comodato.fecha_inicio}
              endDate={comodato.fecha_fin}
            />
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
          </motion.div>
        </div>
        <hr className="my-6 border-2" />
        <div className="flex-col w-full">
          <h2 className="text-lg font-semibold mt-6">
            Instrumentos en comodato
          </h2>
          <InstrumentosTable data={comodato.instrumentos} loading={loading} />
        </div>
      </div>
    </motion.div>
  );
};

export default ComodatoDetalle;
