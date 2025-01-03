import React, { useEffect, useState } from "react";
import { Card, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import VigentesChart from "../components/Dashboard/Vigente";
import PagosBarChart from "../components/Dashboard/PagosBarChart";
import ComodatosTable from "../components/Contactos/ComodatosTable";
import axios from "axios";

interface Cliente {
  id: number;
  nombre: string;
  rut: string;
  codigo_comuna: string;
  direccion: string;
  logo: string;
  comodatos: Comodato[];
}

interface Comodato {
  id: number;
  contrato: string;
  compra_minima_mensual_dinero: number;
  compra_minima_anual_dinero: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
}

const HospitalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCliente = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/clientes/${id}`
        );
        setCliente(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
        message.error("Error al cargar la información del cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  return (
    <div className="m-4 grid grid-cols-1 md:grid-cols-12 gap-6">
      {loading && <p>Cargando...</p>}
      {!loading && cliente && (
        <>
          {/* Client Details */}
          <div className="md:col-span-12 p-6 bg-white rounded-lg flex items-center gap-4">
            <img
              src={cliente.logo}
              alt={cliente.nombre}
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <Typography.Title level={3}>{cliente.nombre}</Typography.Title>
              <Typography.Text>RUT: {cliente.rut}</Typography.Text>
              <br />
              <Typography.Text>Dirección: {cliente.direccion}</Typography.Text>
            </div>
          </div>

          {/* Charts */}
          <div className="md:col-span-6 p-6 bg-white rounded-lg">
            <VigentesChart />
          </div>
          <div className="md:col-span-6 p-6 bg-white rounded-lg">
            <PagosBarChart />
          </div>

          {/* Comodatos Table */}
          <div className="md:col-span-12">
            <Card title="Comodatos Vigentes">
              <ComodatosTable comodatos={cliente.comodatos} />
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default HospitalDetails;
