import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import esES from "antd/es/locale/es_ES";
import { router } from "./router/router";

const theme = {
  token: {
    colorSuccess: "#34a448",
    colorPrimary: "#4f8ec6",
    colorInfo: "#fa8c16",
    colorWarning: "#f4d912",
    borderRadius: 8,
    sizeStep: 4,
    colorError: "#f5222d",
  },
  components: {
    Menu: {
      colorItemText: "white", // Menu item text color
      colorItemTextHover: "white", // Text color on hover
    },
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
