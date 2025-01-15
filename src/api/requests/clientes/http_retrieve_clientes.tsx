// import axios from "axios";
import { message } from "antd";
import { ClienteInterfaceWithComodatos } from "../../../interfaces/ClienteInterfaceWithComodatos";
import { retrieve_cliente } from "../../json_examples/retrieve_cliente";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchRetrieveClientes = async (
  id: string
): Promise<ClienteInterfaceWithComodatos | null> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
    // return response.data;

    const cliente = retrieve_cliente.find((item) => item.id === Number(id));
    console.log(cliente)
    if (!cliente) throw new Error("Comodato not found");
    return cliente;
  } catch (error) {
    console.error("Error fetching cliente:", error);
    message.error("Error al cargar los cliente");
    return null;
  }
};
