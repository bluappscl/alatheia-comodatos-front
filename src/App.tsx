import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import esES from "antd/es/locale/es_ES";
import { router } from "./router/router";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const theme = {
  token: {
    colorPrimary: "#934f8c",
    colorInfo: "#934f8c",
    colorSuccess: "#2c9942",
    colorWarning: "#ffd600",
    colorError: "#d63641",
    colorLink: "#c180b6",
  },
};

const customTables = {
  ...esES,
  Pagination: {
    ...esES.Pagination,
    items_per_page: "por página",
    jump_to: "Ir a",
    jump_to_confirm: "confirmar",
    page: "",
    prev_page: "Página anterior",
    next_page: "Página siguiente",
    prev_5: "Anteriores 5 páginas",
    next_5: "Siguientes 5 páginas",
    prev_3: "Anteriores 3 páginas",
    next_3: "Siguientes 3 páginas",
    page_size: "Tamaño de página",
    showSizeChanger: "Cambiar tamaño",
  },
};

function App() {
  return (
    <>
      <ConfigProvider theme={theme} locale={customTables}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
