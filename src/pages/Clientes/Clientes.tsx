import React, { useEffect, useState } from "react";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import clientes_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import { Table, TableColumnsType, Input, Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

interface Cliente {
  rut: string;
  nombre: string;
  numero_instrumentos: number;
  consumo_esperado: number;
  consumo_realizado: number;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<{ clientes: Cliente[] }>("/comodatos/clientes/con-comodatos/");
        setClientes(response.data.clientes);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  const columns: TableColumnsType<Cliente> = [
    {
      title: "RUT",
      dataIndex: "rut",
      key: "rut",
      width: 120,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 200,
    },
    {
      title: "N° Instrumentos",
      dataIndex: "numero_instrumentos",
      key: "numero_instrumentos",
      width: 120,
      align: 'center',
    },
    {
      title: "Consumo Esperado",
      dataIndex: "consumo_esperado",
      key: "consumo_esperado",
      width: 150,
      align: 'right',
      render: (value: number) => value ? formatCurrency(value, 'CLP') : formatCurrency(0, 'CLP'),
    },
    {
      title: "Consumo Realizado",
      dataIndex: "consumo_realizado",
      key: "consumo_realizado",
      width: 150,
      align: 'right',
      render: (value: number) => value ? formatCurrency(value, 'CLP') : formatCurrency(0, 'CLP'),
    },
    // {
    //   title: "% Cumplimiento",
    //   key: "cumplimiento",
    //   width: 120,
    //   align: 'center',
    //   render: (_, record) => {
    //     const esperado = record.consumo_esperado || 0;
    //     const realizado = record.consumo_realizado || 0;
    //     const porcentaje = esperado === 0 ? 0 : (realizado / esperado) * 100;
    //     return (
    //       <span className={porcentaje >= 100 ? "text-green-600" : "text-red-600"}>
    //         {porcentaje.toFixed(1)}%
    //       </span>
    //     );
    //   },
    // },
    {
      title: "Detalle",
      key: "detalle",
      width: 100,
      render: (_, record) => (
        <Tooltip title="Ver detalle del cliente">
          <Button
            onClick={() => navigate(`/clientes/${record.rut}`)}
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
        loading={loading}
        columns={columns}
        dataSource={filteredClientes}
        rowKey={(record) => record.rut}
        pagination={{ pageSize: 10 }}
      />
    </motion.div>
  );
};

export default Clientes;