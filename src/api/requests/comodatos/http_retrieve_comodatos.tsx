// import axios from "axios";
import { message } from "antd";
import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";
import { comodatos_json } from "../../json_examples/comodatos_json";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchRetrieveComodatos = async (
  id: string
): Promise<ComodatoInterface | null> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/comodatos/${id}`);
    // return response.data;

    const comodato = comodatos_json.find((item) => item.id === Number(id));
    if (!comodato) throw new Error("Comodato not found");
    return comodato;
  } catch (error) {
    console.error("Error fetching comodatos:", error);
    message.error("Error al cargar los comodatos");
    return null;
  }
};
