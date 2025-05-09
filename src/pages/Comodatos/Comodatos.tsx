import ComodatosTable from "../../components/Comodatos/ComodatosTable";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import { useFetchComodatos } from "../../api/hooks/comodatos/get_comodatos";

import comodato_photo from "../../media/temporal/comodato_photo.png";

import { motion } from "motion/react";
import { Spin } from "antd";
const ComodatosPage = () => {
  const { comodatos } = useFetchComodatos();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Comodatos"
        description="Aqui puedes ver tus los comodatos existentes"
        photo_path={comodato_photo}
      />
      {comodatos.length > 0 ? (
        <div className="md:col-span-12">
          <ComodatosTable />
        </div>
      ) : (
        <Spin className="w-full flex justify-center items-center" />
      )}
    </motion.div>
  );
};

export default ComodatosPage;
