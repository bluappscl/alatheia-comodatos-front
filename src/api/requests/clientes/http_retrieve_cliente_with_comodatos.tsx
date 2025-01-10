// import axios from "axios";
import { message } from "antd";
import { clientes_json } from "../../json_examples/clientes";
import { ClienteInterface } from "../../../interfaces/ClienteInterface";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchRetrieveClientes = async (
  id: string
): Promise<ClienteInterface | null> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
    // return response.data;

    const cliente = clientes_json.find((item) => item.id === Number(id));
    if (!cliente) throw new Error("Comodato not found");
    return cliente;
  } catch (error) {
    console.error("Error fetching cliente:", error);
    message.error("Error al cargar los cliente");
    return null;
  }
};
