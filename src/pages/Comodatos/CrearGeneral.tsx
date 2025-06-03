import { useNavigate } from "react-router-dom";
import comodato_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "framer-motion";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import ComodatoForm from "./core/ComodatoForm"; // Cambiar de vuelta a mayúsculas

export default function CrearGeneral() {
  const nav = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeaderDescripcion
        title="Registrar Comodato"
        description="Aquí puedes crear un nuevo comodato"
        photo_path={comodato_photo}
      />
      <div className="p-6 max-w-5xl mx-auto bg-white rounded-md">
        <ComodatoForm onCompleted={() => nav("/comodatos")} />
      </div>
    </motion.div>
  );
}
