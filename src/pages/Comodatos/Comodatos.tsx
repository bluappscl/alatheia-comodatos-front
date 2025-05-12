import ComodatosTable from "../../components/Comodatos/ComodatosTable";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";

import comodato_photo from "../../media/temporal/comodato_photo.png";

import { motion } from "motion/react";

const ComodatosPage = () => {
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
        <div className="md:col-span-12">
          <ComodatosTable />
        </div>
  
    </motion.div>
  );
};

export default ComodatosPage;
