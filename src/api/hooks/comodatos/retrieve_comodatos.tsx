import { useEffect, useState } from "react";
import { fetchRetrieveComodatos } from "../../requests/comodatos/http_retrieve_comodatos";
import { ComodatoInterface } from "../../../interfaces/ComodatoInterface";

export const useFetchRetrieveComodato = (id: string) => {
  const [comodato, setComodato] = useState<ComodatoInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRetrieveComodatos(id);
        if (!data) throw new Error("Comodato not found");
        setComodato(data);
      } catch (err: any) {
        setError(err.message || "Error fetching comodato");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { comodato, loading, error };
};
