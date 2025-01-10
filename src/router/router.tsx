import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import CrearComodato from "../pages/Comodatos/NuevoComodato";
import ComodatosPage from "../pages/Comodatos/Comodatos";
import ComodatoDetalle from "../pages/Comodatos/ComodatoDetalle";
import LayoutBack from "../layouts/LayoutBack";
import Login from "../pages/Login";
import ClienteDetalle from "../pages/Clientes/ClienteDetalle";
import Clientes from "../pages/Clientes/Clientes";

const routes = createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<LayoutBack />}>
      <Route index element={<Home />} />
      <Route path="nuevo-comodato" element={<CrearComodato />} />
      <Route path="comodatos" element={<ComodatosPage />} />
      <Route path="comodatos/:id" element={<ComodatoDetalle />} />
      <Route path="clientes" element={<Clientes />} />
      <Route path="clientes/:id" element={<ClienteDetalle />} />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
