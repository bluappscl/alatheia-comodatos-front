import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import ContactTable, { DataType } from "../components/Contactos/ClientesTable";

const Contactos: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBreadcrumbs([{ title: "Contactos", path: "/contactos" }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/clientes");
        const transformedData: DataType[] = response.data.map(
          (cliente: any) => ({
            key: cliente.id,
            id: cliente.id,
            logo: cliente.logo,
            nombre: cliente.nombre,
            rut: cliente.rut,
            direccion: cliente.direccion,
            codigo_comuna: cliente.codigo_comuna,
            comodatos: cliente.comodatos,
          })
        );
        setData(transformedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-4">
      <ContactTable data={data} loading={loading} />
    </div>
  );
};

export default Contactos;
