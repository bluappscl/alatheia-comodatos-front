import React from "react";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import InstrumentosTable from "../../components/Instrumentos/InstrumentosTable";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";

import { useFetchRetrieveComodato } from "../../api/hooks/comodatos/retrieve_comodatos";

import { motion } from "motion/react";
import CardTitleNumber from "../../components/ComodatoDetalle/CardTitleNumber";
import ProgresoContrato from "../../components/ComodatoDetalle/ProgresoContrato";
import DetalleCliente from "../../components/ComodatoDetalle/DetalleCliente";
import ComodatoTags from "../../components/ComodatoDetalle/ComodatoTags";

import comodato_photo from "../../media/temporal/comodato_photo.png";
import PagosBarChart from "../../components/Dashboard/Charts/PagosBarChart";
import FacturasByMonthTable from "../Clientes/FacturesTable";
import InstrumentosChart from "../../components/Dashboard/Charts/Instrumentos";

const ComodatoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { comodato, loading } = useFetchRetrieveComodato(id || "");

  if (!comodato) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="cargando..." />
      </div>
    );
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
        <div className="flex flex-row gap-4">
          <ComodatoTags
            estado={comodato.estado}
            es_renovable={comodato.es_renovable}
            renovable_automatico={comodato.renovable_automatico}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="mb-4">
              <DetalleCliente
                cliente={comodato.cliente}
                representante_nombre={comodato.nombre_cliente_representante}
                representante_rut={comodato.rut_cliente_representante}
              />
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

            <label className="font-semibold">Objetivos</label>

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
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-2">
              <ProgresoContrato
                startDate={comodato.fecha_inicio}
                endDate={comodato.fecha_fin}
              />
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
          </motion.div>
        </div>
        <hr className="my-6 text-dark-900 border" />
        <div className="flex-col w-full">
          <h2 className="text-lg font-semibold mt-6">
            Instrumentos en comodato
          </h2>
          <InstrumentosTable data={comodato.instrumentos} loading={loading} />
        </div>

        <hr className="my-6 text-dark-900 border" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 w-full bg-white rounded-lg p-4">
            <InstrumentosChart />
            <div>
              <h2 className="text-lg font-semibold mt-6 mb-2">
                Historial de Facturas
              </h2>
              <FacturasByMonthTable />
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <PagosBarChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComodatoDetalle;
