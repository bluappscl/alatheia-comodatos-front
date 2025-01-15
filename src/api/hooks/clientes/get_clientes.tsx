import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchClientes } from "../../requests/clientes/http_get_clientes";
// import { ClienteInterface } from "../../../interfaces/ClienteInterface";
// import { ClienteInterfaceWithComodatos } from "../../../interfaces/ClienteInterfaceWithComodatos";
import { ClienteInterface } from "../../../interfaces/ClienteInterface";

export const useFetchClientes = () => {
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [loadingClientes, setLoadingClientes] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClientes();
        setClientes(data);
      } catch (err) {
        console.error("Error fetching clientes:", err);
        message.error("Error al cargar los clientes");
        setError("Failed to fetch clientes");
      } finally {
        setLoadingClientes(false);
      }
    };

    fetchData();
  }, []);

  return { clientes, loadingClientes, error };
};
