import { message } from "antd";
import { clientes_json } from "../../json_examples/clientes";
import { ClienteInterfaceWithComodatos } from "../../../interfaces/ClienteInterfaceWithComodatos";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchClientes = async (): Promise<ClienteInterfaceWithComodatos[]> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/clientes`);
    // return response.data.map((item: ClienteInterface) => ({
    //   ...item
    // }));

    return clientes_json.map((item: ClienteInterfaceWithComodatos) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching instrumentos:", error);
    message.error("Error al cargar los instrumentos");
    return [];
  }
};
