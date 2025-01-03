import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import InsumosExcelUpload from "../components/Insumos/InsumosExcelUpload";
import InsumosGeneralForm from "../components/Insumos/InsumosGeneralForm";

interface Insumo {
  id: number;
  codigo: string;
  producto: string;
  descripcion: string;
  presentacion: string;
  precio_neto: number;
}

const InsumoPage: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [filteredInsumos, setFilteredInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);

  const fetchInsumos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/insumos");
      setInsumos(response.data);
      setFilteredInsumos(response.data);
    } catch (error) {
      console.error("Error fetching insumos:", error);
      message.error("Error al cargar los insumos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredInsumos(
      insumos.filter(
        (item) =>
          item.codigo.toLowerCase().includes(value.toLowerCase()) ||
          item.producto.toLowerCase().includes(value.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(value.toLowerCase()) ||
          item.presentacion.toLowerCase().includes(value.toLowerCase()) ||
          item.precio_neto.toString().includes(value.toLowerCase())
      )
    );
  };


  const handleUploadSuccess = () => {
    console.log("File uploaded successfully.");
    // Refresh data or trigger other actions
  };

  const handleCreate = async (values: Insumo) => {
    try {
      if (editingInsumo) {
        await axios.put(`http://localhost:3001/insumos/${editingInsumo.id}`, values);
        message.success("Insumo editado exitosamente");
      } else {
        await axios.post("http://localhost:3001/insumos", values);
        message.success("Insumo creado exitosamente");
      }
      setIsCreateModalOpen(false);
      setEditingInsumo(null);
      fetchInsumos();
    } catch (error) {
      console.error("Error creating/editing insumo:", error);
      message.error("Error al guardar el insumo");
    }
  };

  const handleEdit = (insumo: Insumo) => {
    setEditingInsumo(insumo);
    setIsCreateModalOpen(true);
  };

  const columns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Producto", dataIndex: "producto", key: "producto" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Presentación", dataIndex: "presentacion", key: "presentacion" },
    {
      title: "Precio Neto",
      dataIndex: "precio_neto",
      key: "precio_neto",
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Acción",
      key: "accion",
      render: (_: any, record: Insumo) => (
        <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record)} >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Buscar por Código, Producto o Descripción"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-2/3"
        />
        <div className="flex gap-2">
          <Button icon={<UploadOutlined />} onClick={() => setIsUploadModalOpen(true)}>
            Subir desde Excel
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingInsumo(null);
              setIsCreateModalOpen(true);
            }}
          >
            Crear Insumo
          </Button>
        </div>
      </div>

      <Table
        dataSource={filteredInsumos}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1000 }}
      />

      {/* Create/Edit Modal */}
      <InsumosGeneralForm
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        initialValues={editingInsumo}
        isEditing={!!editingInsumo}
      />

      {/* Upload Modal */}
      <InsumosExcelUpload
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default InsumoPage;
