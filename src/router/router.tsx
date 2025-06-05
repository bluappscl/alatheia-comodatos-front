import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import ComodatosPage from "../pages/Comodatos/Comodatos";
// import ComodatoDetalle from "../pages/Comodatos/ComodatoDetalle";
import LayoutBack from "../layouts/LayoutBack";
import Login from "../pages/Login";
import ClienteDetalle from "../pages/Clientes/ClienteDetalle";
import Clientes from "../pages/Clientes/Clientes";
import VerDetalleComodato from "../pages/Comodatos/VerDetalleComodato";
import EditarComodato from "../pages/Comodatos/EditarComodato";
import CrearGeneral from "../pages/Comodatos/CrearGeneral";

const routes = createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<LayoutBack />}>
      <Route index element={<Clientes />} />
      <Route path="home" element={<Home />} />
      <Route path="nuevo-comodato" element={<CrearGeneral />} />
      <Route path="comodatos" element={<ComodatosPage />} />
      {/* <Route path="comodatos/:id" element={<ComodatoDetalle />} /> */}
      <Route path="comodato/:id" element={<VerDetalleComodato/>} />
      <Route path="comodato/editar/:id" element={<EditarComodato/>} />
      <Route path="clientes" element={<Clientes />} />
      <Route path="clientes/:rut" element={<ClienteDetalle />} />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
