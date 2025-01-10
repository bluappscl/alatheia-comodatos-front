import { useEffect, useState } from "react";
import { fetchRetrieveClientes } from "../../requests/clientes/http_retrieve_clientes";
// import { ClienteInterface } from "../../../interfaces/ClienteInterface";
import { ClienteInterfaceWithComodatos } from "../../../interfaces/ClienteInterfaceWithComodatos";

export const useFetchRetrieveCliente = (id: string) => {
  const [cliente, setCliente] = useState<ClienteInterfaceWithComodatos | null>(null);
  const [loadingRetrieveCliente, setLoadingRetrieveCliente] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRetrieveClientes(id);
        if (!data) throw new Error("Cliente not found");
        setCliente(data);
      } catch (err: any) {
        setError(err.message || "Error fetching cliente");
      } finally {
        setLoadingRetrieveCliente(false);
      }
    };

    fetchData();
  }, [id]);

  return { cliente, loadingRetrieveCliente, error };
};
