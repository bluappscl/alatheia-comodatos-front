import { useEffect, useState } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import Dashboard from "../components/Dashboard/Dashboard";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";
import dashboard_photo from "../media/temporal/dashboard_photo.png";

import { motion } from "motion/react";
import { useFetchClientes } from "../api/hooks/clientes/get_clientes";

import ClientesSelect from "../components/Clientes/ClientesSelect";

const Home: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);
  const [_, setFilteredClient] = useState<string>("");

  const { clientes, loadingClientes } = useFetchClientes();

  useEffect(() => {
    setBreadcrumbs([{ title: "Home", path: "/" }]);
  }, [setBreadcrumbs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeaderDescripcion
        title="Home"
        description="Aqui puedes ver el reporte historico y mensual"
        photo_path={dashboard_photo}
      />
      <div className="lg:w-1/2">
        <ClientesSelect
          clientes={clientes}
          loading={loadingClientes}
          setFilteredClients={setFilteredClient}
        />
      </div>
      <Dashboard />
    </motion.div>
  );
};

export default Home;
