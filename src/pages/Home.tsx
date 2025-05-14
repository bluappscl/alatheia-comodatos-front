import { useEffect } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
// import Dashboard from "../components/Dashboard/Dashboard";
import logo from '../media/logos/alatheia-logo-dark.svg';
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
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">

        <div className="flex justify-center my-10">
        <img src={logo} alt="Dashboard" className="w-1/3" />
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl mt-4 mb-4">Bienvenid@ al portal de Comodatos</h2>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Dentro de este portal podrás gestionar tus comodatos, ver el estado de tus clientes y mucho más.
        </p>
      </div>
    </div>

      


      {/* <Dashboard /> */}
    </motion.div>
  );
};

export default Home;
