import React, { useState } from "react";
import { Table, Input, Button, TableColumnsType } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ClienteInterface } from "../../interfaces/ClienteInterface";
import { format } from "rut.js";

interface ContactTableProps {
  clientes: ClienteInterface[];
  loading: boolean;
}

const ClientesTable: React.FC<ContactTableProps> = ({ clientes, loading }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const filteredData = clientes.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.rut.toLowerCase().includes(searchText.toLowerCase()) ||
      item.direccion.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableColumnsType<ClienteInterface> = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    {
      title: "RUT",
      dataIndex: "rut",
      key: "rut",
      align: "center",
      render: (rut: string) => `${format(rut)}`,
    },
    {
      title: "Direccion",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Codigo Comuna",
      dataIndex: "codigo_comuna",
      align: "center",
      key: "codigo_comuna",
    },
    {
      title: "Detalle",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Button
          onClick={() => {
            navigate(`/clientes/${record.id}`);
          }}
        >
          <ZoomInOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search by Name, RUT, or Address"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: "100%" }}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        className="bg-dark-700 rounded-xl"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 500 }}
      />
    </div>
  );
};

export default ClientesTable;
