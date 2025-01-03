import React from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import InsumoSelector from "../NuevoComodato/InsumoSelector";

interface InstrumentoFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEditing: boolean;
}

const InstrumentoGeneralForm: React.FC<InstrumentoFormProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEditing,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={isEditing ? "Editar Instrumento" : "Crear Instrumento"}
      open={open}
      onCancel={onCancel}
      footer={null}
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
        <Form.Item label="Número de Serie" name="numero_serie">
          <Input />
        </Form.Item>
        <Form.Item
          label="Cantidad"
          name="cantidad"
          rules={[{ required: true, message: "Por favor ingrese la cantidad" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Valor Neto UF"
          name="valor_neto_uf"
          rules={[
            { required: true, message: "Por favor ingrese el valor neto en UF" },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <InsumoSelector />

        <div className="flex justify-end mt-4">
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Guardar" : "Crear"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default InstrumentoGeneralForm;
