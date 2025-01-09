import { useEffect } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import Dashboard from "./Dashboard";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";
import dashboard_photo from "../media/temporal/dashboard_photo.png";

import { motion } from "motion/react";

const Home: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);

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
      <Dashboard />
    </motion.div>
  );
};

export default Home;
