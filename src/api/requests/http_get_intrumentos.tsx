// // import axios from "axios";
// import { message } from "antd";
// import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
// import { instrumentos_json } from "../json_examples/instrumentos_json"; 

// // const API_BASE_URL = "http://localhost:3001";

// export const fetchInstrumentos = async (): Promise<InstrumentoInterface[]> => {
//   try {
//     // const response = await axios.get(`${API_BASE_URL}/instrumentos`);
//     // return response.data.map((item: InstrumentoInterface) => ({
//     //   ...item,
//     //   moneda: "CLP",
//     // }));
    
//     return instrumentos_json.map((item: InstrumentoInterface) => ({
//       ...item,
//       moneda: "CLP",
//     }));

//   } catch (error) {
//     console.error("Error fetching instrumentos:", error);
//     message.error("Error al cargar los instrumentos");
//     return [];
//   }
// };
