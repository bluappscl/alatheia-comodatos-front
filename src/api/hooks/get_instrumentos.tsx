import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchInstrumentos } from "../requests/intrumentos_request";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";

const useFetchInstrumentos = () => {
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

export default useFetchInstrumentos;
