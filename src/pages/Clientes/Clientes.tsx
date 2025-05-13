import React, { useEffect, useState } from "react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import clientes_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import { Table, TableColumnsType, Input, Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

interface Cliente {
  rut: string;
  nombre: string;
  direccion: string;
  nombre_comuna: string;
  codigo_comuna: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axiosInstance.get<{ clientes: Cliente[] }>("/comodatos/clientes/con-comodatos/");
        setClientes(response.data.clientes);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableColumnsType<Cliente> = [
    {
      title: "RUT",
      dataIndex: "rut",
      key: "rut",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Comuna",
      dataIndex: "nombre_comuna",
      key: "nombre_comuna",
    },
    {
      title: "Código Comuna",
      dataIndex: "codigo_comuna",
      key: "codigo_comuna",
    },
    {
      title: "Detalle",
      key: "detalle",
      render: (_, record) => (
        <Tooltip title="Ver detalle del cliente">
          <Button
            onClick={() => {
              navigate(`/clientes/${record.rut}`);
            }}
          >
            Ver Detalle
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Clientes"
        description="Aqui puedes ver detalles especificos de tus clientes"
        photo_path={clientes_photo}
      />

      <Input
        placeholder="Buscar cliente por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        columns={columns}
        dataSource={filteredClientes}
        rowKey={(record) => record.rut}
        pagination={{ pageSize: 10 }}
      />
    </motion.div>
  );
};

export default Clientes;