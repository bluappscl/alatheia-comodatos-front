import React, { useState } from "react";
import { Table, Input, Button, TableColumnsType } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export interface DataType {
  key: React.Key;
  id: number;
  logo: string;
  nombre: string;
  rut: string;
  direccion: string;
  codigo_comuna: string;
  comodatos: [];
}

interface ContactTableProps {
  data: DataType[];
  loading: boolean;
}

const CustomerTables: React.FC<ContactTableProps> = ({ data, loading }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.rut.toLowerCase().includes(searchText.toLowerCase()) ||
      item.direccion.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableColumnsType<DataType> = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre", align: "center" },
    { title: "RUT", dataIndex: "rut", key: "rut", align: "center" },
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
      title: "Comodatos",
      dataIndex: "comodatos",
      key: "comodatos",
      align: "center",
      render: (_, record) => <>{record.comodatos.length}</>,
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
      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        className="bg-primary-400 rounded-xl"
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default CustomerTables;
