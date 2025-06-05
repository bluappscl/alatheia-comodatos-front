import { useEffect, useState } from "react";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import logo from '../media/logos/alatheia-logo-dark.svg';
import { motion } from "motion/react";
import { useUserDataStore } from "../stores/UserData.store";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Card } from "antd";
import { UserOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";

interface UserInfo {
  role?: string;
  name?: string;
  email?: string;
  cod_representante?: string;
}

const Home: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  console.log('userInfo', userInfo)

  useEffect(() => {
    setBreadcrumbs([{ title: "Home", path: "/home" }]);
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
        
        {/* Botones de navegación */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/")}>
            <div className="text-center p-4">
              <UserOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clientes</h3>
              <p className="text-gray-600">Gestiona y visualiza información de tus clientes</p>
            </div>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/comodatos")}>
            <div className="text-center p-4">
              <FileTextOutlined className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comodatos</h3>
              <p className="text-gray-600">Ve todos los comodatos existentes</p>
            </div>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/nuevo-comodato")}>
            <div className="text-center p-4">
              <PlusOutlined className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nuevo Comodato</h3>
              <p className="text-gray-600">Crea un nuevo comodato general</p>
            </div>
          </Card>
        </div>
      </div>
    </div>

    </motion.div>
  );
};

export default Home;
