import React from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";
import FileUploadDrawable from "../shared/FileUploadDrawable";

interface CreateClienteModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateClienteModal: React.FC<CreateClienteModalProps> = ({
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await axios.post("http://localhost:3001/clientes", values);
      message.success("Cliente creado exitosamente");
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Error creating cliente:", error);
      message.error("Error al crear el cliente");
    }
  };

  return (
    <Modal
      title="Crear Cliente"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Crear"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Ingrese el nombre del cliente" }]}
        >
          <Input placeholder="Nombre del cliente" />
        </Form.Item>
        <Form.Item
          label="RUT"
          name="rut"
          rules={[{ required: true, message: "Ingrese el RUT del cliente" }]}
        >
          <Input placeholder="RUT del cliente" />
        </Form.Item>
        <Form.Item
          label="Código Comuna"
          name="codigo_comuna"
          rules={[{ required: true, message: "Ingrese el código de comuna" }]}
        >
          <Input placeholder="Código de comuna" />
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="direccion"
          rules={[{ required: true, message: "Ingrese la dirección" }]}
        >
          <Input placeholder="Dirección del cliente" />
        </Form.Item>
        <FileUploadDrawable />
      </Form>
    </Modal>
  );
};

export default CreateClienteModal;
