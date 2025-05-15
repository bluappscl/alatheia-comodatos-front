import { useEffect, useState } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
// import Dashboard from "../components/Dashboard/Dashboard";
import logo from '../media/logos/alatheia-logo-dark.svg';
import { motion } from "motion/react";
import { useUserDataStore } from "../stores/UserData.store";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

interface UserInfo {
  role?: string;
  name?: string;
  email?: string;
  cod_representante?: string;
}

const Home: React.FC = () => {

  
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  console.log('userInfo', userInfo)

  useEffect(() => {
    setBreadcrumbs([{ title: "Home", path: "/" }]);
  }, [setBreadcrumbs]);

    const { token, setToken, setUserInfo: setStoreUserInfo, clearStorage } = useUserDataStore();
  const location = useLocation();


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");

    if (tokenParam) {
      // Si viene por URL, lo guardo (o actualizo)
      setToken(tokenParam);
      console.log("Token captured:", tokenParam);
    } else if (!token) {
      // SIEMPRE compruebo si ya había un token en el store;
      // sólo limpio si no lo hay en ningún sitio
      clearStorage();
      console.log("Storage cleared on component mount (no token present anywhere)");
    }
  }, [location.search, token, setToken, clearStorage]);


    useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
 
        try {
          const response = await axiosInstance.get("/usuarios/users/info/");
          setUserInfo(response.data);
          setStoreUserInfo(response.data);
          
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    };

    fetchUserInfo();
  }, [token, setStoreUserInfo]);



  
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

    </motion.div>
  );
};

export default Home;
