import React from "react";
import { useParams } from "react-router-dom";
import { useFetchRetrieveCliente } from "../../api/hooks/clientes/retrieve_cliente";
import { Spin } from "antd";

import { motion } from "motion/react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";

import clientes_photo from "../../media/temporal/comodato_photo.png";
import PagosBarChart from "../../components/Dashboard/Charts/PagosBarChart";
import ComodatosTable from "../../components/Comodatos/ComodatosTable";
import ComodatosTableSinCLiente from "../../components/Comodatos/ComodatosTableSinCLiente";

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
    >
      {cliente && (
        <>
          <HeaderDescripcion
            title={cliente.nombre || ""}
            description={`Aqui puedes ver los detalles del cliente`}
            photo_path={clientes_photo}
          />
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <PagosBarChart />
            </div>
            <div className="w-1/2"></div>
          </div>
          <ComodatosTableSinCLiente comodatos={cliente.comodatos || []} />
        </>
      )}
    </motion.div>
  );
};

export default ClienteDetalle;
