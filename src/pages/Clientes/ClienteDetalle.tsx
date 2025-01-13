import React from "react";
import { useParams } from "react-router-dom";
import { useFetchRetrieveCliente } from "../../api/hooks/clientes/retrieve_cliente";
import { Spin } from "antd";

import { motion } from "motion/react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";

import clientes_photo from "../../media/temporal/comodato_photo.png";
import PagosBarChart from "../../components/Dashboard/Charts/PagosBarChart";

import ComodatosTableSinCLiente from "../../components/Comodatos/ComodatosTableSinCLiente";
import InstrumentosChart from "../../components/Dashboard/Charts/Instrumentos";
import FacturasByMonthTable from "./FacturesTable";

const ClienteDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { cliente, loadingRetrieveCliente } = useFetchRetrieveCliente(id || "");

  console.log(cliente);
  if (loadingRetrieveCliente) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      {cliente && (
        <>
          <HeaderDescripcion
            title={cliente.nombre || ""}
            description={`Aqui puedes ver los detalles del cliente`}
            photo_path={clientes_photo}
          />
          <div className="mb-6">
            <ComodatosTableSinCLiente comodatos={cliente.comodatos || []} />
          </div>
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
        </>
      )}
    </motion.div>
  );
};

export default ClienteDetalle;
