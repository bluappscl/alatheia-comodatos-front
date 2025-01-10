// import axios from "axios";
import { message } from "antd";
import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";
import { comodatos_json } from "../../json_examples/comodatos_json";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const fetchComodatos = async (): Promise<ComodatoInterface[]> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/comodatos`);
    // return response.data.map((item: ComodatoInterface) => ({
    //   ...item,
    // }));

    return comodatos_json.map((item: ComodatoInterface) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching comodatos:", error);
    message.error("Error al cargar los comodatos");
    return [];
  }
};
