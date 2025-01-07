import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";
import ContactTable, { DataType } from "../components/Contactos/ClientesTable";
import CreateClienteModal from "../components/Contactos/CreateClienteModal";
import { clientes_json } from "../api/json_examples/clientes";

const Contactos: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([{ title: "Contactos", path: "/contactos" }]);
  }, [setBreadcrumbs]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("http://localhost:3001/clientes");
      // const transformedData: DataType[] = response.data.map((cliente: any) => ({
      const transformedData: DataType[] = clientes_json.map((cliente: any) => ({
        key: cliente.id,
        id: cliente.id,
        logo: cliente.logo,
        nombre: cliente.nombre,
        rut: cliente.rut,
        direccion: cliente.direccion,
        codigo_comuna: cliente.codigo_comuna,
        comodatos: cliente.comodatos,
      }));
      setData(transformedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    fetchData(); // Refresh data after creating a new cliente
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Contactos</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Crear Cliente
        </Button>
      </div>
      <ContactTable data={data} loading={loading} />
      <CreateClienteModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Contactos;
