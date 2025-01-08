import { message } from "antd";
import { clientes_json } from "../json_examples/clientes";
import { ClienteInterface } from "../../interfaces/ClienteInterface";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchClientes = async (): Promise<ClienteInterface[]> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/clientes`);
    // return response.data.map((item: ClienteInterface) => ({
    //   ...item
    // }));

    return clientes_json.map((item: ClienteInterface) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching instrumentos:", error);
    message.error("Error al cargar los instrumentos");
    return [];
  }
};
