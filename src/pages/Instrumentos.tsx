import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import InstrumentoGeneralForm from "../components/Instrumentos/InstrumentoGeneralForm";
import InstrumentosTable from "../components/Instrumentos/InstrumentosTable";

interface Instrumento {
  id: number;
  codigo: string;
  producto: string;
  numero_serie: string;
  cantidad: number;
  valor_neto: number;
}

const InstrumentoPage: React.FC = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingInstrumento, setEditingInstrumento] =
    useState<Instrumento | null>(null);

  // const handleCreateOrEdit = async (values: Instrumento) => {
  //   try {
  //     if (editingInstrumento) {
  //       await axios.put(
  //         `http://localhost:3001/instrumentos/${editingInstrumento.id}`,
  //         values
  //       );
  //       message.success("Instrumento editado exitosamente");
  //     } else {
  //       await axios.post("http://localhost:3001/instrumentos", values);
  //       message.success("Instrumento creado exitosamente");
  //     }
  //     setIsFormModalOpen(false);
  //     setEditingInstrumento(null);
  //     fetchInstrumentos();
  //   } catch (error) {
  //     console.error("Error creating/editing instrumento:", error);
  //     message.error("Error al guardar el instrumento");
  //   }
  // };

  return (
    <div>
      <InstrumentosTable />

      {/* <InstrumentoGeneralForm
        open={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        onSubmit={handleCreateOrEdit}
        initialValues={editingInstrumento}
        isEditing={!!editingInstrumento}
      /> */}
    </div>
  );
};

export default InstrumentoPage;
