import { useEffect } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import Dashboard from "./Dashboard";

const Home: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([{ title: "Home", path: "/" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      {/* <div>Home</div> */}
      {/* <Link to="/contactos">Redireccion</Link> */}
      <Dashboard />
    </>
  );
};

export default Home;
