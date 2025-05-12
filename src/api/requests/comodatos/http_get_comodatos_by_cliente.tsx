// // import axios from "axios";
// import { message } from "antd";
// import { comodatos_json } from "../../json_examples/comodatos_json";
// import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";
// // import axios from "axios";

// // const API_BASE_URL = "http://localhost:3001";

// export const fetchGetComodatosByCliente = async (
//   id: string
// ): Promise<ComodatoInterface[]> => {
//   try {
//     // const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
//     // return response.data;

//     const comodatos = comodatos_json.filter(
//       (item) => item.cliente.id === Number(id)
//     );
//     return comodatos;
//   } catch (error) {
//     console.error("Error fetching cliente:", error);
//     message.error("Error al cargar los cliente");
//     return [];
//   }
// };
