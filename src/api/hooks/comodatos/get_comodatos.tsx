import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchComodatos } from "../../requests/comodatos/http_get_comodatos";
import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";

export const useFetchComodatos = () => {
  const [comodatos, setComodatos] = useState<ComodatoInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComodatos();
        setComodatos(data);
      } catch (err) {
        console.error("Error fetching comodatos:", err);
        message.error("Error al cargar los comodatos");
        setError("Failed to fetch comodatos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { comodatos, loading, error };
};
