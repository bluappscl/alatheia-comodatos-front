import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

interface CreateEditModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEditing: boolean;
}

const InsumosGeneralForm: React.FC<CreateEditModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEditing,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={isEditing ? "Editar Insumo" : "Crear Insumo"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? "Guardar" : "Crear"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Código"
          name="codigo"
          rules={[{ required: true, message: "Por favor ingrese el código" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Producto"
          name="producto"
          rules={[{ required: true, message: "Por favor ingrese el producto" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[
            { required: true, message: "Por favor ingrese la descripción" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Presentación"
          name="presentacion"
          rules={[
            { required: true, message: "Por favor ingrese la presentación" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Precio Neto"
          name="precio_neto"
          rules={[
            { required: true, message: "Por favor ingrese el precio neto" },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InsumosGeneralForm;
