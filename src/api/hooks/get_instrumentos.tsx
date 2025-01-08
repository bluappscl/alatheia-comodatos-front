import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchInstrumentos } from "../requests/http_get_intrumentos";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";

export const useFetchInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInstrumentos();
        setInstrumentos(data);
      } catch (err) {
        console.error("Error fetching instrumentos:", err);
        message.error("Error al cargar los instrumentos");
        setError("Failed to fetch instrumentos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { instrumentos, loading, error };
};

