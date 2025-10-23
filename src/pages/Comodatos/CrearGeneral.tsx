import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import comodato_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "framer-motion";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import ComodatoForm from "./core/ComodatoForm"; 

export default function CrearGeneral() {
  const nav = useNavigate();

  const handleBack = useCallback(() => {
    nav("/clientes"); // Navegar a la lista de clientes
  }, [nav]);

  const handleCompleted = useCallback((rutCliente?: string) => {
    if (rutCliente) {
      nav(`/clientes/${rutCliente}`);
    } else {
      nav("/comodatos");
    }
  }, [nav]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-6"
      >
        <HeaderDescripcion
          title="Registrar Comodato"
          description="Aquí puedes crear un nuevo comodato"
          photo_path={comodato_photo}
          showBackButton={true}
          onBack={handleBack}
        />

        <div className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-sm">
          <ComodatoForm onCompleted={handleCompleted} />
        </div>
      </motion.div>
    </motion.div>
  );
}
