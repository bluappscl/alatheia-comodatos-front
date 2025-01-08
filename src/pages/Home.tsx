import { useEffect } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import Dashboard from "./Dashboard";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";
import dashboard_photo from "../media/temporal/dashboard_photo.png";

const Home: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([{ title: "Home", path: "/" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      <HeaderDescripcion
        title="Home"
        description="Aqui puedes ver el reporte historico y mensual"
        photo_path={dashboard_photo}
      />
      <Dashboard />
    </>
  );
};

export default Home;
