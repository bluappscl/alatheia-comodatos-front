// import { useEffect, useState } from "react";
// import { message } from "antd";
// import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";
// import { fetchGetComodatosByCliente } from "../../requests/comodatos/http_get_comodatos_by_cliente";

// export const useFetchGetComodatosByCliente = (id: string) => {
//   const [comodatosByCliente, setComodatosByCliente] = useState<
//     ComodatoInterface[]
//   >([]);
//   const [loadingComodatosByCliente, setLoadingComodatosByCliente] =
//     useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchGetComodatosByCliente(id);
//         setComodatosByCliente(data);
//       } catch (err) {
//         console.error("Error fetching comodatos:", err);
//         message.error("Error al cargar los comodatos");
//         setError("Failed to fetch comodatos");
//       } finally {
//         setLoadingComodatosByCliente(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { comodatosByCliente, loadingComodatosByCliente, error };
// };
