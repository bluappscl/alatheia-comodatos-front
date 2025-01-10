import React from "react";
import { useFetchClientes } from "../../api/hooks/clientes/get_clientes";
import ClientesTable from "../../components/Clientes/ClientesTable";
import { Spin } from "antd";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";

import clientes_photo from "../../media/temporal/comodato_photo.png";

import { motion } from "motion/react";

const Clientes: React.FC = () => {
  const { clientes, loadingClientes } = useFetchClientes();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Clientes"
        description="Aqui puedes ver detalles especificos de tus clientes"
        photo_path={clientes_photo}
      />
      {clientes.length > 0 ? (
        <div className="md:col-span-12">
          <ClientesTable clientes={clientes} loading={loadingClientes} />
        </div>
      ) : (
        <Spin />
      )}
    </motion.div>
  );
};

export default Clientes;
