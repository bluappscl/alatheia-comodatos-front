import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import InstrumentoGeneralForm from "../components/Instrumentos/InstrumentoGeneralForm";

interface Instrumento {
  id: number;
  codigo: string;
  producto: string;
  numero_serie: string;
  cantidad: number;
  valor_neto_uf: number;
}

const InstrumentoPage: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [filteredInstrumentos, setFilteredInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingInstrumento, setEditingInstrumento] = useState<Instrumento | null>(
    null
  );

  const fetchInstrumentos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/instrumentos");
      setInstrumentos(response.data);
      setFilteredInstrumentos(response.data);
    } catch (error) {
      console.error("Error fetching instrumentos:", error);
      message.error("Error al cargar los instrumentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstrumentos();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredInstrumentos(
      instrumentos.filter(
        (item) =>
          item.codigo.toLowerCase().includes(value.toLowerCase()) ||
          item.producto.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCreateOrEdit = async (values: Instrumento) => {
    try {
      if (editingInstrumento) {
        await axios.put(
          `http://localhost:3001/instrumentos/${editingInstrumento.id}`,
          values
        );
        message.success("Instrumento editado exitosamente");
      } else {
        await axios.post("http://localhost:3001/instrumentos", values);
        message.success("Instrumento creado exitosamente");
      }
      setIsFormModalOpen(false);
      setEditingInstrumento(null);
      fetchInstrumentos();
    } catch (error) {
      console.error("Error creating/editing instrumento:", error);
      message.error("Error al guardar el instrumento");
    }
  };

  const handleEdit = (instrumento: Instrumento) => {
    setEditingInstrumento(instrumento);
    setIsFormModalOpen(true);
  };

  const columns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Producto", dataIndex: "producto", key: "producto" },
    { title: "Número de Serie", dataIndex: "numero_serie", key: "numero_serie" },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
    {
      title: "Valor Neto UF",
      dataIndex: "valor_neto_uf",
      key: "valor_neto_uf",
      render: (value: number) => `${value.toLocaleString()} UF`,
    },
    {
      title: "Acción",
      key: "accion",
      render: (_: any, record: Instrumento) => (
        <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Buscar por Código o Producto"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-2/3"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingInstrumento(null);
            setIsFormModalOpen(true);
          }}
        >
          Crear Instrumento
        </Button>
      </div>

      <Table
        dataSource={filteredInstrumentos}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1000 }}
      />

      <InstrumentoGeneralForm
        open={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        onSubmit={handleCreateOrEdit}
        initialValues={editingInstrumento}
        isEditing={!!editingInstrumento}
      />
    </div>
  );
};

export default InstrumentoPage;
