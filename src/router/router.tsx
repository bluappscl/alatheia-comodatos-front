import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../Login";
import GeneralLayout from "../layouts/GeneralLayout";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Contactos from "../pages/Contactos";
import HospitalDetails from "../pages/HospitalPage";
import CrearComodato from "../pages/NuevoComodato";
import InsumoPage from "../pages/Insumos";
import InstrumentoPage from "../pages/Instrumentos";
import ComodatosPage from "../pages/Comodatos";
import ComodatoDetalle from "../pages/ComodatoDetalle";

const routes = createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<GeneralLayout />}>
      <Route index element={<Home />} />
      <Route path="nuevo-comodato" element={<CrearComodato />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="comodatos" element={<ComodatosPage />} />
      <Route path="clientes" element={<Contactos />} />
      <Route path="clientes/:id" element={<HospitalDetails />} />
      <Route path="insumos" element={<InsumoPage />} />
      <Route path="instrumentos" element={<InstrumentoPage />} />
      <Route path="aaa/d" element={<ComodatoDetalle />} />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
